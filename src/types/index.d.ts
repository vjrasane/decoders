export {
    DecodeResult,
    Decoder,
    DecoderType,
    Predicate,
    Scalar,
    define,
} from './_decoder';
export { Result } from './result';
export { JSONValue, JSONObject, JSONArray } from './core/json';

export { compose, predicate, prep, transform } from './core/composition';

export {
    always,
    constant,
    hardcoded,
    mixed,
    null_,
    undefined_,
    unknown,
} from './core/constants';
export { array, nonEmptyArray, poja, set } from './core/array';
export { boolean, numericBoolean, truthy } from './core/boolean';
export { date, iso8601 } from './core/date';
export { describe } from './core/describe';
export { dict, exact, inexact, mapping, object, pojo } from './core/object';
export { either, oneOf } from './core/either';
export {
    email,
    httpsUrl,
    nonEmptyString,
    regex,
    string,
    url,
    uuid,
    uuidv1,
    uuidv4,
} from './core/string';
export { fail, never } from './core/never';
export { instanceOf } from './core/instanceOf';
export { integer, number, positiveInteger, positiveNumber } from './core/number';
export { json, jsonObject, jsonArray } from './core/json';
export { lazy } from './core/lazy';
export { maybe, nullable, optional } from './core/optional';
export { taggedUnion } from './core/dispatch';
export { tuple } from './core/tuple';
