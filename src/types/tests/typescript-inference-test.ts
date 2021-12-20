import {
    array,
    boolean,
    compose,
    constant,
    date,
    Decoder,
    describe,
    dict,
    dispatch,
    either,
    either3,
    either4,
    either5,
    either6,
    either7,
    either8,
    either9,
    email,
    exact,
    fail,
    guard,
    hardcoded,
    httpsUrl,
    inexact,
    instanceOf,
    integer,
    iso8601,
    json,
    jsonArray,
    jsonObject,
    lazy,
    map,
    mapping,
    maybe,
    mixed,
    nonEmptyArray,
    nonEmptyString,
    nullable,
    null_,
    number,
    numericBoolean,
    object,
    oneOf,
    optional,
    poja,
    pojo,
    positiveInteger,
    positiveNumber,
    predicate,
    regex,
    string,
    truthy,
    tuple1,
    tuple2,
    tuple3,
    tuple4,
    tuple5,
    tuple6,
    undefined_,
    unknown,
    url,
} from 'decoders';
import { formatInline, formatShort } from 'decoders/format';
import { ok, unwrap } from 'decoders/result';

constant('foo'); // $ExpectType Decoder<"foo", unknown>
hardcoded('foo'); // $ExpectType Decoder<"foo", unknown>

null_; // $ExpectType Decoder<null, unknown>
undefined_; // $ExpectType Decoder<undefined, unknown>
mixed; // $ExpectType Decoder<unknown, unknown>
unknown; // $ExpectType Decoder<unknown, unknown>

integer; // $ExpectType Decoder<number, unknown>
number; // $ExpectType Decoder<number, unknown>
positiveInteger; // $ExpectType Decoder<number, unknown>
positiveNumber; // $ExpectType Decoder<number, unknown>

string; // $ExpectType Decoder<string, unknown>
nonEmptyString; // $ExpectType Decoder<string, unknown>
email; // $ExpectType Decoder<string, unknown>
regex(/foo/, 'Must be foo'); // $ExpectType Decoder<string, unknown>
url; // $ExpectType Decoder<URL, unknown>
httpsUrl; // $ExpectType Decoder<URL, unknown>

array(string); // $ExpectType Decoder<string[], unknown>
array(number); // $ExpectType Decoder<number[], unknown>
array(array(number)); // $ExpectType Decoder<number[][], unknown>
poja; // $ExpectType Decoder<unknown[], unknown>
nonEmptyArray(string); // $ExpectType Decoder<[string, ...string[]], unknown>
nonEmptyArray(number); // $ExpectType Decoder<[number, ...number[]], unknown>

tuple1(string); // $ExpectType Decoder<[string], unknown>
tuple2(string, number); // $ExpectType Decoder<[string, number], unknown>
tuple3(string, string, number); // $ExpectType Decoder<[string, string, number], unknown>
tuple4(string, string, number, string); // $ExpectType Decoder<[string, string, number, string], unknown>
tuple5(string, string, number, string, number); // $ExpectType Decoder<[string, string, number, string, number], unknown>
tuple6(string, string, number, string, number, string); // $ExpectType Decoder<[string, string, number, string, number, string], unknown>

// $ExpectType { name: string; tags: string[]; }
guard(
    object({
        name: string,
        tags: array(string),
    }),
)('dummy');

// Style argument
guard(string, formatInline);
guard(string, formatShort);

// $ExpectType Decoder<number, unknown>
map(string, parseFloat);

// $ExpectType Decoder<number, unknown>
compose(string, (value: string) => ok(value.length));

// $ExpectType Decoder<string, unknown>
predicate(string, (s) => s.startsWith('x'), 'Must start with x');

// $ExpectType Decoder<string, unknown>
predicate(unknown, (foo): foo is string => typeof foo === 'string', 'Is string');

// $ExpectType Decoder<"a" | "b", unknown>
predicate(
    string,
    (foo: string): foo is 'a' | 'b' => foo === 'a' || foo === 'b',
    'Is a or b',
);

array(string); // $ExpectType Decoder<string[], unknown>
array(number); // $ExpectType Decoder<number[], unknown>
array(array(number)); // $ExpectType Decoder<number[][], unknown>
poja; // $ExpectType Decoder<unknown[], unknown>

guard(boolean)('dummy'); // $ExpectType boolean
guard(truthy)('dummy'); // $ExpectType boolean
guard(numericBoolean)('dummy'); // $ExpectType boolean

optional(string); // $ExpectType Decoder<string | undefined, unknown>
optional(optional(string)); // $ExpectType Decoder<string | undefined, unknown>

nullable(string); // $ExpectType Decoder<string | null, unknown>
nullable(nullable(string)); // $ExpectType Decoder<string | null, unknown>

maybe(string); // $ExpectType Decoder<string | null | undefined, unknown>
maybe(maybe(string)); // $ExpectType Decoder<string | null | undefined, unknown>

// $ExpectType Decoder<{ bar: { qux: string; }; foo?: string | undefined; }, unknown>
object({
    foo: optional(string),
    bar: object({ qux: string }),
});

// $ExpectType Decoder<{ bar: { qux: string; }; foo?: string | undefined; }, unknown>
exact({
    foo: optional(string),
    bar: object({ qux: string }),
});

// $ExpectType Decoder<{ id: string; } & { [extra: string]: unknown; }, unknown>
inexact({ id: string });

// $ExpectType Decoder<{ [key: string]: unknown; }, unknown>
pojo;

// $ExpectType Decoder<Map<string, number>, unknown>
mapping(number);

// $ExpectType Decoder<{ [key: string]: number; }, unknown>
dict(number);

// $ExpectType Decoder<string, unknown>
lazy(() => string);

// $ExpectType Decoder<number, unknown>
lazy(() => number);

// $ExpectType JSONValue
unwrap(json('hi'));

// $ExpectType JSONObject
unwrap(jsonObject({}));

// $ExpectType JSONArray
unwrap(jsonArray([]));

// $ExpectType Decoder<Error, unknown>
instanceOf(Error);

// $ ExpectType Decoder<TypeError, unknown>
instanceOf(TypeError);

// $ExpectType Decoder<RegExp, unknown>
instanceOf(RegExp);

// $ExpectType Decoder<Promise<string>, unknown>
instanceOf<Promise<string>>(Promise);

// $ExpectError
instanceOf<Promise<string>>(Set);

// $ExpectType Decoder<Date, unknown>
date;

// $ExpectType Date
const d = guard(iso8601)('dummy');
d.getFullYear();

// $ExpectType Decoder<never, unknown>
fail('I will never return');

either(string, number); // $ExpectType Decoder<string | number, unknown>
either3(string, string, number); // $ExpectType Decoder<string | number, unknown>
either4(string, boolean, number, array(number)); // $ExpectType Decoder<string | number | boolean | number[], unknown>
either5(string, string, string, string, string); // $ExpectType Decoder<string, unknown>
either6(string, string, string, string, string, string); // $ExpectType Decoder<string, unknown>
either7(string, string, string, string, string, string, string); // $ExpectType Decoder<string, unknown>
either8(string, string, string, string, string, string, string, string); // $ExpectType Decoder<string, unknown>
either9(string, string, string, string, string, string, string, string, string); // $ExpectType Decoder<string, unknown>

// $ExpectType Decoder<"foo" | "bar" | "qux", unknown>
oneOf(['foo', 'bar', 'qux']);

interface Rect {
    _type: 'rect';
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Circle {
    _type: 'circle';
    cx: number;
    cy: number;
    radius: number;
}

type Shape = Rect | Circle;

const rect: Decoder<Rect> = object({
    _type: constant('rect' as const),
    x: number,
    y: number,
    width: number,
    height: number,
});

const circle: Decoder<Circle> = object({
    _type: constant('circle' as const),
    cx: number,
    cy: number,
    radius: number,
});

// $ExpectType Decoder<$Values<{ rect: Rect; circle: Circle; }>, unknown>
const shape = dispatch('_type', { rect, circle });

// $ExpectType Decoder<string, unknown>
describe(string, 'xxx');
// $ExpectType Decoder<number, unknown>
describe(number, 'xxx');
