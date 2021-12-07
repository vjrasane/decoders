// @flow strict
/* eslint-disable no-restricted-syntax */

import { array } from '../array';
import { errValue, isErr, okValue } from '../../result';
import { INPUTS } from './fixtures';
import { lazy } from '../lazy';
import { number } from '../number';
import { object } from '../object';
import { optional } from '../optional';
import { string } from '../string';
import type { Decoder } from '../../_types';

describe('lazy', () => {
    it('lazy(() => string) is same as string', () => {
        const eagerDecoder = string;
        const lazyDecoder = lazy(() => string);
        for (const input of INPUTS) {
            const eagerResult = eagerDecoder(input);
            const lazyResult = lazyDecoder(input);
            expect(okValue(eagerResult)).toEqual(okValue(lazyResult));
            expect(errValue(eagerResult)).toEqual(errValue(lazyResult));
        }
    });

    it('build self-referential types with lazy()', () => {
        type StringList = {|
            curr: string,
            next?: StringList,
        |};

        const llist: Decoder<StringList> = object({
            curr: string,
            next: optional(lazy(() => llist)),
        });

        expect(isErr(llist(123))).toBe(true);
        expect(isErr(llist('string'))).toBe(true);
        expect(isErr(llist({ curr: 123 }))).toBe(true);
        expect(isErr(llist({ curr: 'string', next: true }))).toBe(true);

        const v1 = { curr: 'i am a string' };
        const v2 = { curr: 'i am a string', next: { curr: 'another' } };
        expect(okValue(llist(v1))).toEqual(v1);
        expect(okValue(llist(v2))).toEqual(v2);
    });

    it('build self-referential types with variables', () => {
        type Tree<T> = {|
            node: T,
            children: Array<Tree<T>>,
        |};

        function tree<T>(decoder: Decoder<T>): Decoder<Tree<T>> {
            return object({
                node: decoder,
                children: array(lazy(() => tree(decoder))),
            });
        }

        const stringTree = tree(string);

        expect(isErr(stringTree(123))).toBe(true);
        expect(isErr(stringTree('string'))).toBe(true);
        expect(isErr(stringTree({ node: 123 }))).toBe(true);
        expect(isErr(stringTree({ node: 'string', children: false }))).toBe(true);

        const s1 = { node: 'string', children: [] };
        const s2 = { node: 'string', children: [{ node: 'another', children: [] }] };
        expect(okValue(stringTree(s1))).toEqual(s1);
        expect(okValue(stringTree(s2))).toEqual(s2);

        const n1 = { node: 123, children: [] };
        const n2 = { node: 123, children: [{ node: 456, children: [] }] };
        expect(okValue(tree(number)(n1))).toEqual(n1);
        expect(okValue(tree(number)(n2))).toEqual(n2);
    });
});
