
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model Domain
 * 
 */
export type Domain = $Result.DefaultSelection<Prisma.$DomainPayload>
/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model Link
 * 
 */
export type Link = $Result.DefaultSelection<Prisma.$LinkPayload>
/**
 * Model QrCode
 * 
 */
export type QrCode = $Result.DefaultSelection<Prisma.$QrCodePayload>
/**
 * Model ClicksAnalytics
 * 
 */
export type ClicksAnalytics = $Result.DefaultSelection<Prisma.$ClicksAnalyticsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Status: {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
  DELETED: 'DELETED'
};

export type Status = (typeof Status)[keyof typeof Status]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.domain`: Exposes CRUD operations for the **Domain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Domains
    * const domains = await prisma.domain.findMany()
    * ```
    */
  get domain(): Prisma.DomainDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.link`: Exposes CRUD operations for the **Link** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Links
    * const links = await prisma.link.findMany()
    * ```
    */
  get link(): Prisma.LinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.qrCode`: Exposes CRUD operations for the **QrCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QrCodes
    * const qrCodes = await prisma.qrCode.findMany()
    * ```
    */
  get qrCode(): Prisma.QrCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clicksAnalytics`: Exposes CRUD operations for the **ClicksAnalytics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClicksAnalytics
    * const clicksAnalytics = await prisma.clicksAnalytics.findMany()
    * ```
    */
  get clicksAnalytics(): Prisma.ClicksAnalyticsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Organization: 'Organization',
    Domain: 'Domain',
    Plan: 'Plan',
    Link: 'Link',
    QrCode: 'QrCode',
    ClicksAnalytics: 'ClicksAnalytics'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "organization" | "domain" | "plan" | "link" | "qrCode" | "clicksAnalytics"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrganizationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      Domain: {
        payload: Prisma.$DomainPayload<ExtArgs>
        fields: Prisma.DomainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DomainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DomainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findFirst: {
            args: Prisma.DomainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DomainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          findMany: {
            args: Prisma.DomainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          create: {
            args: Prisma.DomainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          createMany: {
            args: Prisma.DomainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DomainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          delete: {
            args: Prisma.DomainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          update: {
            args: Prisma.DomainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          deleteMany: {
            args: Prisma.DomainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DomainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DomainUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>[]
          }
          upsert: {
            args: Prisma.DomainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DomainPayload>
          }
          aggregate: {
            args: Prisma.DomainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDomain>
          }
          groupBy: {
            args: Prisma.DomainGroupByArgs<ExtArgs>
            result: $Utils.Optional<DomainGroupByOutputType>[]
          }
          count: {
            args: Prisma.DomainCountArgs<ExtArgs>
            result: $Utils.Optional<DomainCountAggregateOutputType> | number
          }
        }
      }
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      Link: {
        payload: Prisma.$LinkPayload<ExtArgs>
        fields: Prisma.LinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          findFirst: {
            args: Prisma.LinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          findMany: {
            args: Prisma.LinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          create: {
            args: Prisma.LinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          createMany: {
            args: Prisma.LinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          delete: {
            args: Prisma.LinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          update: {
            args: Prisma.LinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          deleteMany: {
            args: Prisma.LinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>[]
          }
          upsert: {
            args: Prisma.LinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkPayload>
          }
          aggregate: {
            args: Prisma.LinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLink>
          }
          groupBy: {
            args: Prisma.LinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<LinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.LinkCountArgs<ExtArgs>
            result: $Utils.Optional<LinkCountAggregateOutputType> | number
          }
        }
      }
      QrCode: {
        payload: Prisma.$QrCodePayload<ExtArgs>
        fields: Prisma.QrCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QrCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QrCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          findFirst: {
            args: Prisma.QrCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QrCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          findMany: {
            args: Prisma.QrCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>[]
          }
          create: {
            args: Prisma.QrCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          createMany: {
            args: Prisma.QrCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QrCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>[]
          }
          delete: {
            args: Prisma.QrCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          update: {
            args: Prisma.QrCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          deleteMany: {
            args: Prisma.QrCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QrCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QrCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>[]
          }
          upsert: {
            args: Prisma.QrCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QrCodePayload>
          }
          aggregate: {
            args: Prisma.QrCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQrCode>
          }
          groupBy: {
            args: Prisma.QrCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<QrCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.QrCodeCountArgs<ExtArgs>
            result: $Utils.Optional<QrCodeCountAggregateOutputType> | number
          }
        }
      }
      ClicksAnalytics: {
        payload: Prisma.$ClicksAnalyticsPayload<ExtArgs>
        fields: Prisma.ClicksAnalyticsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClicksAnalyticsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClicksAnalyticsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload>
          }
          findFirst: {
            args: Prisma.ClicksAnalyticsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClicksAnalyticsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload>
          }
          findMany: {
            args: Prisma.ClicksAnalyticsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload>[]
          }
          create: {
            args: Prisma.ClicksAnalyticsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload>
          }
          createMany: {
            args: Prisma.ClicksAnalyticsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClicksAnalyticsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload>[]
          }
          delete: {
            args: Prisma.ClicksAnalyticsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload>
          }
          update: {
            args: Prisma.ClicksAnalyticsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload>
          }
          deleteMany: {
            args: Prisma.ClicksAnalyticsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClicksAnalyticsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClicksAnalyticsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload>[]
          }
          upsert: {
            args: Prisma.ClicksAnalyticsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClicksAnalyticsPayload>
          }
          aggregate: {
            args: Prisma.ClicksAnalyticsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClicksAnalytics>
          }
          groupBy: {
            args: Prisma.ClicksAnalyticsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClicksAnalyticsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClicksAnalyticsCountArgs<ExtArgs>
            result: $Utils.Optional<ClicksAnalyticsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    organization?: OrganizationOmit
    domain?: DomainOmit
    plan?: PlanOmit
    link?: LinkOmit
    qrCode?: QrCodeOmit
    clicksAnalytics?: ClicksAnalyticsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    ownedOrganizations: number
    links: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ownedOrganizations?: boolean | UserCountOutputTypeCountOwnedOrganizationsArgs
    links?: boolean | UserCountOutputTypeCountLinksArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedOrganizationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    users: number
    domains: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | OrganizationCountOutputTypeCountUsersArgs
    domains?: boolean | OrganizationCountOutputTypeCountDomainsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountDomainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainWhereInput
  }


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    users: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | PlanCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type LinkCountOutputType
   */

  export type LinkCountOutputType = {
    qrCodes: number
    clicksAnalytics: number
  }

  export type LinkCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    qrCodes?: boolean | LinkCountOutputTypeCountQrCodesArgs
    clicksAnalytics?: boolean | LinkCountOutputTypeCountClicksAnalyticsArgs
  }

  // Custom InputTypes
  /**
   * LinkCountOutputType without action
   */
  export type LinkCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkCountOutputType
     */
    select?: LinkCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LinkCountOutputType without action
   */
  export type LinkCountOutputTypeCountQrCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QrCodeWhereInput
  }

  /**
   * LinkCountOutputType without action
   */
  export type LinkCountOutputTypeCountClicksAnalyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClicksAnalyticsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    planId: string | null
    plan: string | null
    organizationId: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    role: $Enums.Role | null
    planId: string | null
    plan: string | null
    organizationId: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    role: number
    planId: number
    plan: number
    organizationId: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    role?: true
    planId?: true
    plan?: true
    organizationId?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    role?: true
    planId?: true
    plan?: true
    organizationId?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    role?: true
    planId?: true
    plan?: true
    organizationId?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    role: $Enums.Role
    planId: string
    plan: string
    organizationId: string | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    planId?: boolean
    plan?: boolean
    organizationId?: boolean
    createdAt?: boolean
    planTier?: boolean | PlanDefaultArgs<ExtArgs>
    organization?: boolean | User$organizationArgs<ExtArgs>
    ownedOrganizations?: boolean | User$ownedOrganizationsArgs<ExtArgs>
    links?: boolean | User$linksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    planId?: boolean
    plan?: boolean
    organizationId?: boolean
    createdAt?: boolean
    planTier?: boolean | PlanDefaultArgs<ExtArgs>
    organization?: boolean | User$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    role?: boolean
    planId?: boolean
    plan?: boolean
    organizationId?: boolean
    createdAt?: boolean
    planTier?: boolean | PlanDefaultArgs<ExtArgs>
    organization?: boolean | User$organizationArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    role?: boolean
    planId?: boolean
    plan?: boolean
    organizationId?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "role" | "planId" | "plan" | "organizationId" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    planTier?: boolean | PlanDefaultArgs<ExtArgs>
    organization?: boolean | User$organizationArgs<ExtArgs>
    ownedOrganizations?: boolean | User$ownedOrganizationsArgs<ExtArgs>
    links?: boolean | User$linksArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    planTier?: boolean | PlanDefaultArgs<ExtArgs>
    organization?: boolean | User$organizationArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    planTier?: boolean | PlanDefaultArgs<ExtArgs>
    organization?: boolean | User$organizationArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      planTier: Prisma.$PlanPayload<ExtArgs>
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      ownedOrganizations: Prisma.$OrganizationPayload<ExtArgs>[]
      links: Prisma.$LinkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      role: $Enums.Role
      planId: string
      plan: string
      organizationId: string | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    planTier<T extends PlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlanDefaultArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organization<T extends User$organizationArgs<ExtArgs> = {}>(args?: Subset<T, User$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    ownedOrganizations<T extends User$ownedOrganizationsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedOrganizationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    links<T extends User$linksArgs<ExtArgs> = {}>(args?: Subset<T, User$linksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly planId: FieldRef<"User", 'String'>
    readonly plan: FieldRef<"User", 'String'>
    readonly organizationId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.organization
   */
  export type User$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * User.ownedOrganizations
   */
  export type User$ownedOrganizationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    cursor?: OrganizationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * User.links
   */
  export type User$linksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    where?: LinkWhereInput
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    cursor?: LinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    status: $Enums.Status | null
    ownerId: string | null
    createdAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    status: $Enums.Status | null
    ownerId: string | null
    createdAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    status: number
    ownerId: number
    createdAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    status?: true
    ownerId?: true
    createdAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    status?: true
    ownerId?: true
    createdAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    status?: true
    ownerId?: true
    createdAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    status: $Enums.Status
    ownerId: string
    createdAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    ownerId?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    users?: boolean | Organization$usersArgs<ExtArgs>
    domains?: boolean | Organization$domainsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    ownerId?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    ownerId?: boolean
    createdAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    status?: boolean
    ownerId?: boolean
    createdAt?: boolean
  }

  export type OrganizationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "status" | "ownerId" | "createdAt", ExtArgs["result"]["organization"]>
  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    users?: boolean | Organization$usersArgs<ExtArgs>
    domains?: boolean | Organization$domainsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      users: Prisma.$UserPayload<ExtArgs>[]
      domains: Prisma.$DomainPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      status: $Enums.Status
      ownerId: string
      createdAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations and returns the data updated in the database.
     * @param {OrganizationUpdateManyAndReturnArgs} args - Arguments to update many Organizations.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends Organization$usersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    domains<T extends Organization$domainsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$domainsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly status: FieldRef<"Organization", 'Status'>
    readonly ownerId: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
  }

  /**
   * Organization updateManyAndReturn
   */
  export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
    /**
     * Limit how many Organizations to delete.
     */
    limit?: number
  }

  /**
   * Organization.users
   */
  export type Organization$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Organization.domains
   */
  export type Organization$domainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    where?: DomainWhereInput
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    cursor?: DomainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Organization
     */
    omit?: OrganizationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model Domain
   */

  export type AggregateDomain = {
    _count: DomainCountAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  export type DomainMinAggregateOutputType = {
    id: string | null
    hostname: string | null
    organizationId: string | null
    verified: boolean | null
    createdAt: Date | null
  }

  export type DomainMaxAggregateOutputType = {
    id: string | null
    hostname: string | null
    organizationId: string | null
    verified: boolean | null
    createdAt: Date | null
  }

  export type DomainCountAggregateOutputType = {
    id: number
    hostname: number
    organizationId: number
    verified: number
    createdAt: number
    _all: number
  }


  export type DomainMinAggregateInputType = {
    id?: true
    hostname?: true
    organizationId?: true
    verified?: true
    createdAt?: true
  }

  export type DomainMaxAggregateInputType = {
    id?: true
    hostname?: true
    organizationId?: true
    verified?: true
    createdAt?: true
  }

  export type DomainCountAggregateInputType = {
    id?: true
    hostname?: true
    organizationId?: true
    verified?: true
    createdAt?: true
    _all?: true
  }

  export type DomainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domain to aggregate.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Domains
    **/
    _count?: true | DomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DomainMaxAggregateInputType
  }

  export type GetDomainAggregateType<T extends DomainAggregateArgs> = {
        [P in keyof T & keyof AggregateDomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDomain[P]>
      : GetScalarType<T[P], AggregateDomain[P]>
  }




  export type DomainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DomainWhereInput
    orderBy?: DomainOrderByWithAggregationInput | DomainOrderByWithAggregationInput[]
    by: DomainScalarFieldEnum[] | DomainScalarFieldEnum
    having?: DomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DomainCountAggregateInputType | true
    _min?: DomainMinAggregateInputType
    _max?: DomainMaxAggregateInputType
  }

  export type DomainGroupByOutputType = {
    id: string
    hostname: string
    organizationId: string
    verified: boolean
    createdAt: Date
    _count: DomainCountAggregateOutputType | null
    _min: DomainMinAggregateOutputType | null
    _max: DomainMaxAggregateOutputType | null
  }

  type GetDomainGroupByPayload<T extends DomainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DomainGroupByOutputType[P]>
            : GetScalarType<T[P], DomainGroupByOutputType[P]>
        }
      >
    >


  export type DomainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostname?: boolean
    organizationId?: boolean
    verified?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostname?: boolean
    organizationId?: boolean
    verified?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hostname?: boolean
    organizationId?: boolean
    verified?: boolean
    createdAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["domain"]>

  export type DomainSelectScalar = {
    id?: boolean
    hostname?: boolean
    organizationId?: boolean
    verified?: boolean
    createdAt?: boolean
  }

  export type DomainOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hostname" | "organizationId" | "verified" | "createdAt", ExtArgs["result"]["domain"]>
  export type DomainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type DomainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type DomainIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $DomainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Domain"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hostname: string
      organizationId: string
      verified: boolean
      createdAt: Date
    }, ExtArgs["result"]["domain"]>
    composites: {}
  }

  type DomainGetPayload<S extends boolean | null | undefined | DomainDefaultArgs> = $Result.GetResult<Prisma.$DomainPayload, S>

  type DomainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DomainFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DomainCountAggregateInputType | true
    }

  export interface DomainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Domain'], meta: { name: 'Domain' } }
    /**
     * Find zero or one Domain that matches the filter.
     * @param {DomainFindUniqueArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DomainFindUniqueArgs>(args: SelectSubset<T, DomainFindUniqueArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Domain that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DomainFindUniqueOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DomainFindUniqueOrThrowArgs>(args: SelectSubset<T, DomainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Domain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DomainFindFirstArgs>(args?: SelectSubset<T, DomainFindFirstArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Domain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindFirstOrThrowArgs} args - Arguments to find a Domain
     * @example
     * // Get one Domain
     * const domain = await prisma.domain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DomainFindFirstOrThrowArgs>(args?: SelectSubset<T, DomainFindFirstOrThrowArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Domains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Domains
     * const domains = await prisma.domain.findMany()
     * 
     * // Get first 10 Domains
     * const domains = await prisma.domain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const domainWithIdOnly = await prisma.domain.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DomainFindManyArgs>(args?: SelectSubset<T, DomainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Domain.
     * @param {DomainCreateArgs} args - Arguments to create a Domain.
     * @example
     * // Create one Domain
     * const Domain = await prisma.domain.create({
     *   data: {
     *     // ... data to create a Domain
     *   }
     * })
     * 
     */
    create<T extends DomainCreateArgs>(args: SelectSubset<T, DomainCreateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Domains.
     * @param {DomainCreateManyArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DomainCreateManyArgs>(args?: SelectSubset<T, DomainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Domains and returns the data saved in the database.
     * @param {DomainCreateManyAndReturnArgs} args - Arguments to create many Domains.
     * @example
     * // Create many Domains
     * const domain = await prisma.domain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Domains and only return the `id`
     * const domainWithIdOnly = await prisma.domain.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DomainCreateManyAndReturnArgs>(args?: SelectSubset<T, DomainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Domain.
     * @param {DomainDeleteArgs} args - Arguments to delete one Domain.
     * @example
     * // Delete one Domain
     * const Domain = await prisma.domain.delete({
     *   where: {
     *     // ... filter to delete one Domain
     *   }
     * })
     * 
     */
    delete<T extends DomainDeleteArgs>(args: SelectSubset<T, DomainDeleteArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Domain.
     * @param {DomainUpdateArgs} args - Arguments to update one Domain.
     * @example
     * // Update one Domain
     * const domain = await prisma.domain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DomainUpdateArgs>(args: SelectSubset<T, DomainUpdateArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Domains.
     * @param {DomainDeleteManyArgs} args - Arguments to filter Domains to delete.
     * @example
     * // Delete a few Domains
     * const { count } = await prisma.domain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DomainDeleteManyArgs>(args?: SelectSubset<T, DomainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Domains
     * const domain = await prisma.domain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DomainUpdateManyArgs>(args: SelectSubset<T, DomainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Domains and returns the data updated in the database.
     * @param {DomainUpdateManyAndReturnArgs} args - Arguments to update many Domains.
     * @example
     * // Update many Domains
     * const domain = await prisma.domain.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Domains and only return the `id`
     * const domainWithIdOnly = await prisma.domain.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DomainUpdateManyAndReturnArgs>(args: SelectSubset<T, DomainUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Domain.
     * @param {DomainUpsertArgs} args - Arguments to update or create a Domain.
     * @example
     * // Update or create a Domain
     * const domain = await prisma.domain.upsert({
     *   create: {
     *     // ... data to create a Domain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Domain we want to update
     *   }
     * })
     */
    upsert<T extends DomainUpsertArgs>(args: SelectSubset<T, DomainUpsertArgs<ExtArgs>>): Prisma__DomainClient<$Result.GetResult<Prisma.$DomainPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Domains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainCountArgs} args - Arguments to filter Domains to count.
     * @example
     * // Count the number of Domains
     * const count = await prisma.domain.count({
     *   where: {
     *     // ... the filter for the Domains we want to count
     *   }
     * })
    **/
    count<T extends DomainCountArgs>(
      args?: Subset<T, DomainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DomainAggregateArgs>(args: Subset<T, DomainAggregateArgs>): Prisma.PrismaPromise<GetDomainAggregateType<T>>

    /**
     * Group by Domain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DomainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DomainGroupByArgs['orderBy'] }
        : { orderBy?: DomainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDomainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Domain model
   */
  readonly fields: DomainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Domain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DomainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Domain model
   */
  interface DomainFieldRefs {
    readonly id: FieldRef<"Domain", 'String'>
    readonly hostname: FieldRef<"Domain", 'String'>
    readonly organizationId: FieldRef<"Domain", 'String'>
    readonly verified: FieldRef<"Domain", 'Boolean'>
    readonly createdAt: FieldRef<"Domain", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Domain findUnique
   */
  export type DomainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findUniqueOrThrow
   */
  export type DomainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain findFirst
   */
  export type DomainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findFirstOrThrow
   */
  export type DomainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domain to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain findMany
   */
  export type DomainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter, which Domains to fetch.
     */
    where?: DomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Domains to fetch.
     */
    orderBy?: DomainOrderByWithRelationInput | DomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Domains.
     */
    cursor?: DomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Domains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Domains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Domains.
     */
    distinct?: DomainScalarFieldEnum | DomainScalarFieldEnum[]
  }

  /**
   * Domain create
   */
  export type DomainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to create a Domain.
     */
    data: XOR<DomainCreateInput, DomainUncheckedCreateInput>
  }

  /**
   * Domain createMany
   */
  export type DomainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Domain createManyAndReturn
   */
  export type DomainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * The data used to create many Domains.
     */
    data: DomainCreateManyInput | DomainCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Domain update
   */
  export type DomainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The data needed to update a Domain.
     */
    data: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
    /**
     * Choose, which Domain to update.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain updateMany
   */
  export type DomainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Domains.
     */
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyInput>
    /**
     * Filter which Domains to update
     */
    where?: DomainWhereInput
    /**
     * Limit how many Domains to update.
     */
    limit?: number
  }

  /**
   * Domain updateManyAndReturn
   */
  export type DomainUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * The data used to update Domains.
     */
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyInput>
    /**
     * Filter which Domains to update
     */
    where?: DomainWhereInput
    /**
     * Limit how many Domains to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Domain upsert
   */
  export type DomainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * The filter to search for the Domain to update in case it exists.
     */
    where: DomainWhereUniqueInput
    /**
     * In case the Domain found by the `where` argument doesn't exist, create a new Domain with this data.
     */
    create: XOR<DomainCreateInput, DomainUncheckedCreateInput>
    /**
     * In case the Domain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DomainUpdateInput, DomainUncheckedUpdateInput>
  }

  /**
   * Domain delete
   */
  export type DomainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
    /**
     * Filter which Domain to delete.
     */
    where: DomainWhereUniqueInput
  }

  /**
   * Domain deleteMany
   */
  export type DomainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Domains to delete
     */
    where?: DomainWhereInput
    /**
     * Limit how many Domains to delete.
     */
    limit?: number
  }

  /**
   * Domain without action
   */
  export type DomainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Domain
     */
    select?: DomainSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Domain
     */
    omit?: DomainOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DomainInclude<ExtArgs> | null
  }


  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    monthlyLinks: number | null
    monthlyQrCodes: number | null
    maxOrganizations: number | null
    price: number | null
  }

  export type PlanSumAggregateOutputType = {
    monthlyLinks: number | null
    monthlyQrCodes: number | null
    maxOrganizations: number | null
    price: number | null
  }

  export type PlanMinAggregateOutputType = {
    id: string | null
    tierName: string | null
    publicName: string | null
    monthlyLinks: number | null
    monthlyQrCodes: number | null
    maxOrganizations: number | null
    price: number | null
    createdAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    id: string | null
    tierName: string | null
    publicName: string | null
    monthlyLinks: number | null
    monthlyQrCodes: number | null
    maxOrganizations: number | null
    price: number | null
    createdAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    tierName: number
    publicName: number
    monthlyLinks: number
    monthlyQrCodes: number
    maxOrganizations: number
    price: number
    createdAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    monthlyLinks?: true
    monthlyQrCodes?: true
    maxOrganizations?: true
    price?: true
  }

  export type PlanSumAggregateInputType = {
    monthlyLinks?: true
    monthlyQrCodes?: true
    maxOrganizations?: true
    price?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    tierName?: true
    publicName?: true
    monthlyLinks?: true
    monthlyQrCodes?: true
    maxOrganizations?: true
    price?: true
    createdAt?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    tierName?: true
    publicName?: true
    monthlyLinks?: true
    monthlyQrCodes?: true
    maxOrganizations?: true
    price?: true
    createdAt?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    tierName?: true
    publicName?: true
    monthlyLinks?: true
    monthlyQrCodes?: true
    maxOrganizations?: true
    price?: true
    createdAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: string
    tierName: string
    publicName: string
    monthlyLinks: number
    monthlyQrCodes: number
    maxOrganizations: number
    price: number
    createdAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tierName?: boolean
    publicName?: boolean
    monthlyLinks?: boolean
    monthlyQrCodes?: boolean
    maxOrganizations?: boolean
    price?: boolean
    createdAt?: boolean
    users?: boolean | Plan$usersArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tierName?: boolean
    publicName?: boolean
    monthlyLinks?: boolean
    monthlyQrCodes?: boolean
    maxOrganizations?: boolean
    price?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tierName?: boolean
    publicName?: boolean
    monthlyLinks?: boolean
    monthlyQrCodes?: boolean
    maxOrganizations?: boolean
    price?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    tierName?: boolean
    publicName?: boolean
    monthlyLinks?: boolean
    monthlyQrCodes?: boolean
    maxOrganizations?: boolean
    price?: boolean
    createdAt?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tierName" | "publicName" | "monthlyLinks" | "monthlyQrCodes" | "maxOrganizations" | "price" | "createdAt", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Plan$usersArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tierName: string
      publicName: string
      monthlyLinks: number
      monthlyQrCodes: number
      maxOrganizations: number
      price: number
      createdAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Plan$usersArgs<ExtArgs> = {}>(args?: Subset<T, Plan$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'String'>
    readonly tierName: FieldRef<"Plan", 'String'>
    readonly publicName: FieldRef<"Plan", 'String'>
    readonly monthlyLinks: FieldRef<"Plan", 'Int'>
    readonly monthlyQrCodes: FieldRef<"Plan", 'Int'>
    readonly maxOrganizations: FieldRef<"Plan", 'Int'>
    readonly price: FieldRef<"Plan", 'Float'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.users
   */
  export type Plan$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model Link
   */

  export type AggregateLink = {
    _count: LinkCountAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  export type LinkMinAggregateOutputType = {
    id: string | null
    userId: string | null
    originalUrl: string | null
    domain: string | null
    shortSlug: string | null
    title: string | null
    status: $Enums.Status | null
    createdAt: Date | null
  }

  export type LinkMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    originalUrl: string | null
    domain: string | null
    shortSlug: string | null
    title: string | null
    status: $Enums.Status | null
    createdAt: Date | null
  }

  export type LinkCountAggregateOutputType = {
    id: number
    userId: number
    originalUrl: number
    domain: number
    shortSlug: number
    title: number
    tags: number
    status: number
    createdAt: number
    _all: number
  }


  export type LinkMinAggregateInputType = {
    id?: true
    userId?: true
    originalUrl?: true
    domain?: true
    shortSlug?: true
    title?: true
    status?: true
    createdAt?: true
  }

  export type LinkMaxAggregateInputType = {
    id?: true
    userId?: true
    originalUrl?: true
    domain?: true
    shortSlug?: true
    title?: true
    status?: true
    createdAt?: true
  }

  export type LinkCountAggregateInputType = {
    id?: true
    userId?: true
    originalUrl?: true
    domain?: true
    shortSlug?: true
    title?: true
    tags?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type LinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Link to aggregate.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Links
    **/
    _count?: true | LinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinkMaxAggregateInputType
  }

  export type GetLinkAggregateType<T extends LinkAggregateArgs> = {
        [P in keyof T & keyof AggregateLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLink[P]>
      : GetScalarType<T[P], AggregateLink[P]>
  }




  export type LinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkWhereInput
    orderBy?: LinkOrderByWithAggregationInput | LinkOrderByWithAggregationInput[]
    by: LinkScalarFieldEnum[] | LinkScalarFieldEnum
    having?: LinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinkCountAggregateInputType | true
    _min?: LinkMinAggregateInputType
    _max?: LinkMaxAggregateInputType
  }

  export type LinkGroupByOutputType = {
    id: string
    userId: string
    originalUrl: string
    domain: string
    shortSlug: string
    title: string | null
    tags: string[]
    status: $Enums.Status
    createdAt: Date
    _count: LinkCountAggregateOutputType | null
    _min: LinkMinAggregateOutputType | null
    _max: LinkMaxAggregateOutputType | null
  }

  type GetLinkGroupByPayload<T extends LinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinkGroupByOutputType[P]>
            : GetScalarType<T[P], LinkGroupByOutputType[P]>
        }
      >
    >


  export type LinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originalUrl?: boolean
    domain?: boolean
    shortSlug?: boolean
    title?: boolean
    tags?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    qrCodes?: boolean | Link$qrCodesArgs<ExtArgs>
    clicksAnalytics?: boolean | Link$clicksAnalyticsArgs<ExtArgs>
    _count?: boolean | LinkCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["link"]>

  export type LinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originalUrl?: boolean
    domain?: boolean
    shortSlug?: boolean
    title?: boolean
    tags?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["link"]>

  export type LinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    originalUrl?: boolean
    domain?: boolean
    shortSlug?: boolean
    title?: boolean
    tags?: boolean
    status?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["link"]>

  export type LinkSelectScalar = {
    id?: boolean
    userId?: boolean
    originalUrl?: boolean
    domain?: boolean
    shortSlug?: boolean
    title?: boolean
    tags?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type LinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "originalUrl" | "domain" | "shortSlug" | "title" | "tags" | "status" | "createdAt", ExtArgs["result"]["link"]>
  export type LinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    qrCodes?: boolean | Link$qrCodesArgs<ExtArgs>
    clicksAnalytics?: boolean | Link$clicksAnalyticsArgs<ExtArgs>
    _count?: boolean | LinkCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Link"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      qrCodes: Prisma.$QrCodePayload<ExtArgs>[]
      clicksAnalytics: Prisma.$ClicksAnalyticsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      originalUrl: string
      domain: string
      shortSlug: string
      title: string | null
      tags: string[]
      status: $Enums.Status
      createdAt: Date
    }, ExtArgs["result"]["link"]>
    composites: {}
  }

  type LinkGetPayload<S extends boolean | null | undefined | LinkDefaultArgs> = $Result.GetResult<Prisma.$LinkPayload, S>

  type LinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LinkCountAggregateInputType | true
    }

  export interface LinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Link'], meta: { name: 'Link' } }
    /**
     * Find zero or one Link that matches the filter.
     * @param {LinkFindUniqueArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LinkFindUniqueArgs>(args: SelectSubset<T, LinkFindUniqueArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Link that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LinkFindUniqueOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LinkFindUniqueOrThrowArgs>(args: SelectSubset<T, LinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Link that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LinkFindFirstArgs>(args?: SelectSubset<T, LinkFindFirstArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Link that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindFirstOrThrowArgs} args - Arguments to find a Link
     * @example
     * // Get one Link
     * const link = await prisma.link.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LinkFindFirstOrThrowArgs>(args?: SelectSubset<T, LinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Links that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Links
     * const links = await prisma.link.findMany()
     * 
     * // Get first 10 Links
     * const links = await prisma.link.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const linkWithIdOnly = await prisma.link.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LinkFindManyArgs>(args?: SelectSubset<T, LinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Link.
     * @param {LinkCreateArgs} args - Arguments to create a Link.
     * @example
     * // Create one Link
     * const Link = await prisma.link.create({
     *   data: {
     *     // ... data to create a Link
     *   }
     * })
     * 
     */
    create<T extends LinkCreateArgs>(args: SelectSubset<T, LinkCreateArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Links.
     * @param {LinkCreateManyArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const link = await prisma.link.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LinkCreateManyArgs>(args?: SelectSubset<T, LinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Links and returns the data saved in the database.
     * @param {LinkCreateManyAndReturnArgs} args - Arguments to create many Links.
     * @example
     * // Create many Links
     * const link = await prisma.link.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Links and only return the `id`
     * const linkWithIdOnly = await prisma.link.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LinkCreateManyAndReturnArgs>(args?: SelectSubset<T, LinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Link.
     * @param {LinkDeleteArgs} args - Arguments to delete one Link.
     * @example
     * // Delete one Link
     * const Link = await prisma.link.delete({
     *   where: {
     *     // ... filter to delete one Link
     *   }
     * })
     * 
     */
    delete<T extends LinkDeleteArgs>(args: SelectSubset<T, LinkDeleteArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Link.
     * @param {LinkUpdateArgs} args - Arguments to update one Link.
     * @example
     * // Update one Link
     * const link = await prisma.link.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LinkUpdateArgs>(args: SelectSubset<T, LinkUpdateArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Links.
     * @param {LinkDeleteManyArgs} args - Arguments to filter Links to delete.
     * @example
     * // Delete a few Links
     * const { count } = await prisma.link.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LinkDeleteManyArgs>(args?: SelectSubset<T, LinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LinkUpdateManyArgs>(args: SelectSubset<T, LinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Links and returns the data updated in the database.
     * @param {LinkUpdateManyAndReturnArgs} args - Arguments to update many Links.
     * @example
     * // Update many Links
     * const link = await prisma.link.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Links and only return the `id`
     * const linkWithIdOnly = await prisma.link.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LinkUpdateManyAndReturnArgs>(args: SelectSubset<T, LinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Link.
     * @param {LinkUpsertArgs} args - Arguments to update or create a Link.
     * @example
     * // Update or create a Link
     * const link = await prisma.link.upsert({
     *   create: {
     *     // ... data to create a Link
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Link we want to update
     *   }
     * })
     */
    upsert<T extends LinkUpsertArgs>(args: SelectSubset<T, LinkUpsertArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Links.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkCountArgs} args - Arguments to filter Links to count.
     * @example
     * // Count the number of Links
     * const count = await prisma.link.count({
     *   where: {
     *     // ... the filter for the Links we want to count
     *   }
     * })
    **/
    count<T extends LinkCountArgs>(
      args?: Subset<T, LinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LinkAggregateArgs>(args: Subset<T, LinkAggregateArgs>): Prisma.PrismaPromise<GetLinkAggregateType<T>>

    /**
     * Group by Link.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LinkGroupByArgs['orderBy'] }
        : { orderBy?: LinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Link model
   */
  readonly fields: LinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Link.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    qrCodes<T extends Link$qrCodesArgs<ExtArgs> = {}>(args?: Subset<T, Link$qrCodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    clicksAnalytics<T extends Link$clicksAnalyticsArgs<ExtArgs> = {}>(args?: Subset<T, Link$clicksAnalyticsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Link model
   */
  interface LinkFieldRefs {
    readonly id: FieldRef<"Link", 'String'>
    readonly userId: FieldRef<"Link", 'String'>
    readonly originalUrl: FieldRef<"Link", 'String'>
    readonly domain: FieldRef<"Link", 'String'>
    readonly shortSlug: FieldRef<"Link", 'String'>
    readonly title: FieldRef<"Link", 'String'>
    readonly tags: FieldRef<"Link", 'String[]'>
    readonly status: FieldRef<"Link", 'Status'>
    readonly createdAt: FieldRef<"Link", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Link findUnique
   */
  export type LinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link findUniqueOrThrow
   */
  export type LinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link findFirst
   */
  export type LinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     */
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link findFirstOrThrow
   */
  export type LinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Link to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     */
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link findMany
   */
  export type LinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter, which Links to fetch.
     */
    where?: LinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Links to fetch.
     */
    orderBy?: LinkOrderByWithRelationInput | LinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Links.
     */
    cursor?: LinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Links from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Links.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Links.
     */
    distinct?: LinkScalarFieldEnum | LinkScalarFieldEnum[]
  }

  /**
   * Link create
   */
  export type LinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * The data needed to create a Link.
     */
    data: XOR<LinkCreateInput, LinkUncheckedCreateInput>
  }

  /**
   * Link createMany
   */
  export type LinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Links.
     */
    data: LinkCreateManyInput | LinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Link createManyAndReturn
   */
  export type LinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data used to create many Links.
     */
    data: LinkCreateManyInput | LinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Link update
   */
  export type LinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * The data needed to update a Link.
     */
    data: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
    /**
     * Choose, which Link to update.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link updateMany
   */
  export type LinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Links.
     */
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    /**
     * Filter which Links to update
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to update.
     */
    limit?: number
  }

  /**
   * Link updateManyAndReturn
   */
  export type LinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * The data used to update Links.
     */
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyInput>
    /**
     * Filter which Links to update
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Link upsert
   */
  export type LinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * The filter to search for the Link to update in case it exists.
     */
    where: LinkWhereUniqueInput
    /**
     * In case the Link found by the `where` argument doesn't exist, create a new Link with this data.
     */
    create: XOR<LinkCreateInput, LinkUncheckedCreateInput>
    /**
     * In case the Link was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LinkUpdateInput, LinkUncheckedUpdateInput>
  }

  /**
   * Link delete
   */
  export type LinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
    /**
     * Filter which Link to delete.
     */
    where: LinkWhereUniqueInput
  }

  /**
   * Link deleteMany
   */
  export type LinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Links to delete
     */
    where?: LinkWhereInput
    /**
     * Limit how many Links to delete.
     */
    limit?: number
  }

  /**
   * Link.qrCodes
   */
  export type Link$qrCodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    where?: QrCodeWhereInput
    orderBy?: QrCodeOrderByWithRelationInput | QrCodeOrderByWithRelationInput[]
    cursor?: QrCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QrCodeScalarFieldEnum | QrCodeScalarFieldEnum[]
  }

  /**
   * Link.clicksAnalytics
   */
  export type Link$clicksAnalyticsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    where?: ClicksAnalyticsWhereInput
    orderBy?: ClicksAnalyticsOrderByWithRelationInput | ClicksAnalyticsOrderByWithRelationInput[]
    cursor?: ClicksAnalyticsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClicksAnalyticsScalarFieldEnum | ClicksAnalyticsScalarFieldEnum[]
  }

  /**
   * Link without action
   */
  export type LinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Link
     */
    select?: LinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Link
     */
    omit?: LinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkInclude<ExtArgs> | null
  }


  /**
   * Model QrCode
   */

  export type AggregateQrCode = {
    _count: QrCodeCountAggregateOutputType | null
    _min: QrCodeMinAggregateOutputType | null
    _max: QrCodeMaxAggregateOutputType | null
  }

  export type QrCodeMinAggregateOutputType = {
    id: string | null
    linkId: string | null
    imageUrl: string | null
  }

  export type QrCodeMaxAggregateOutputType = {
    id: string | null
    linkId: string | null
    imageUrl: string | null
  }

  export type QrCodeCountAggregateOutputType = {
    id: number
    linkId: number
    designConfig: number
    imageUrl: number
    _all: number
  }


  export type QrCodeMinAggregateInputType = {
    id?: true
    linkId?: true
    imageUrl?: true
  }

  export type QrCodeMaxAggregateInputType = {
    id?: true
    linkId?: true
    imageUrl?: true
  }

  export type QrCodeCountAggregateInputType = {
    id?: true
    linkId?: true
    designConfig?: true
    imageUrl?: true
    _all?: true
  }

  export type QrCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QrCode to aggregate.
     */
    where?: QrCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QrCodes to fetch.
     */
    orderBy?: QrCodeOrderByWithRelationInput | QrCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QrCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QrCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QrCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QrCodes
    **/
    _count?: true | QrCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QrCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QrCodeMaxAggregateInputType
  }

  export type GetQrCodeAggregateType<T extends QrCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateQrCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQrCode[P]>
      : GetScalarType<T[P], AggregateQrCode[P]>
  }




  export type QrCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QrCodeWhereInput
    orderBy?: QrCodeOrderByWithAggregationInput | QrCodeOrderByWithAggregationInput[]
    by: QrCodeScalarFieldEnum[] | QrCodeScalarFieldEnum
    having?: QrCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QrCodeCountAggregateInputType | true
    _min?: QrCodeMinAggregateInputType
    _max?: QrCodeMaxAggregateInputType
  }

  export type QrCodeGroupByOutputType = {
    id: string
    linkId: string
    designConfig: JsonValue
    imageUrl: string
    _count: QrCodeCountAggregateOutputType | null
    _min: QrCodeMinAggregateOutputType | null
    _max: QrCodeMaxAggregateOutputType | null
  }

  type GetQrCodeGroupByPayload<T extends QrCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QrCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QrCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QrCodeGroupByOutputType[P]>
            : GetScalarType<T[P], QrCodeGroupByOutputType[P]>
        }
      >
    >


  export type QrCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    linkId?: boolean
    designConfig?: boolean
    imageUrl?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qrCode"]>

  export type QrCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    linkId?: boolean
    designConfig?: boolean
    imageUrl?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qrCode"]>

  export type QrCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    linkId?: boolean
    designConfig?: boolean
    imageUrl?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["qrCode"]>

  export type QrCodeSelectScalar = {
    id?: boolean
    linkId?: boolean
    designConfig?: boolean
    imageUrl?: boolean
  }

  export type QrCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "linkId" | "designConfig" | "imageUrl", ExtArgs["result"]["qrCode"]>
  export type QrCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type QrCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type QrCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }

  export type $QrCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QrCode"
    objects: {
      link: Prisma.$LinkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      linkId: string
      designConfig: Prisma.JsonValue
      imageUrl: string
    }, ExtArgs["result"]["qrCode"]>
    composites: {}
  }

  type QrCodeGetPayload<S extends boolean | null | undefined | QrCodeDefaultArgs> = $Result.GetResult<Prisma.$QrCodePayload, S>

  type QrCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QrCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QrCodeCountAggregateInputType | true
    }

  export interface QrCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QrCode'], meta: { name: 'QrCode' } }
    /**
     * Find zero or one QrCode that matches the filter.
     * @param {QrCodeFindUniqueArgs} args - Arguments to find a QrCode
     * @example
     * // Get one QrCode
     * const qrCode = await prisma.qrCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QrCodeFindUniqueArgs>(args: SelectSubset<T, QrCodeFindUniqueArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QrCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QrCodeFindUniqueOrThrowArgs} args - Arguments to find a QrCode
     * @example
     * // Get one QrCode
     * const qrCode = await prisma.qrCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QrCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, QrCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QrCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeFindFirstArgs} args - Arguments to find a QrCode
     * @example
     * // Get one QrCode
     * const qrCode = await prisma.qrCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QrCodeFindFirstArgs>(args?: SelectSubset<T, QrCodeFindFirstArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QrCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeFindFirstOrThrowArgs} args - Arguments to find a QrCode
     * @example
     * // Get one QrCode
     * const qrCode = await prisma.qrCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QrCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, QrCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QrCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QrCodes
     * const qrCodes = await prisma.qrCode.findMany()
     * 
     * // Get first 10 QrCodes
     * const qrCodes = await prisma.qrCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qrCodeWithIdOnly = await prisma.qrCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QrCodeFindManyArgs>(args?: SelectSubset<T, QrCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QrCode.
     * @param {QrCodeCreateArgs} args - Arguments to create a QrCode.
     * @example
     * // Create one QrCode
     * const QrCode = await prisma.qrCode.create({
     *   data: {
     *     // ... data to create a QrCode
     *   }
     * })
     * 
     */
    create<T extends QrCodeCreateArgs>(args: SelectSubset<T, QrCodeCreateArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QrCodes.
     * @param {QrCodeCreateManyArgs} args - Arguments to create many QrCodes.
     * @example
     * // Create many QrCodes
     * const qrCode = await prisma.qrCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QrCodeCreateManyArgs>(args?: SelectSubset<T, QrCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QrCodes and returns the data saved in the database.
     * @param {QrCodeCreateManyAndReturnArgs} args - Arguments to create many QrCodes.
     * @example
     * // Create many QrCodes
     * const qrCode = await prisma.qrCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QrCodes and only return the `id`
     * const qrCodeWithIdOnly = await prisma.qrCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QrCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, QrCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QrCode.
     * @param {QrCodeDeleteArgs} args - Arguments to delete one QrCode.
     * @example
     * // Delete one QrCode
     * const QrCode = await prisma.qrCode.delete({
     *   where: {
     *     // ... filter to delete one QrCode
     *   }
     * })
     * 
     */
    delete<T extends QrCodeDeleteArgs>(args: SelectSubset<T, QrCodeDeleteArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QrCode.
     * @param {QrCodeUpdateArgs} args - Arguments to update one QrCode.
     * @example
     * // Update one QrCode
     * const qrCode = await prisma.qrCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QrCodeUpdateArgs>(args: SelectSubset<T, QrCodeUpdateArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QrCodes.
     * @param {QrCodeDeleteManyArgs} args - Arguments to filter QrCodes to delete.
     * @example
     * // Delete a few QrCodes
     * const { count } = await prisma.qrCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QrCodeDeleteManyArgs>(args?: SelectSubset<T, QrCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QrCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QrCodes
     * const qrCode = await prisma.qrCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QrCodeUpdateManyArgs>(args: SelectSubset<T, QrCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QrCodes and returns the data updated in the database.
     * @param {QrCodeUpdateManyAndReturnArgs} args - Arguments to update many QrCodes.
     * @example
     * // Update many QrCodes
     * const qrCode = await prisma.qrCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QrCodes and only return the `id`
     * const qrCodeWithIdOnly = await prisma.qrCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QrCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, QrCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QrCode.
     * @param {QrCodeUpsertArgs} args - Arguments to update or create a QrCode.
     * @example
     * // Update or create a QrCode
     * const qrCode = await prisma.qrCode.upsert({
     *   create: {
     *     // ... data to create a QrCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QrCode we want to update
     *   }
     * })
     */
    upsert<T extends QrCodeUpsertArgs>(args: SelectSubset<T, QrCodeUpsertArgs<ExtArgs>>): Prisma__QrCodeClient<$Result.GetResult<Prisma.$QrCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QrCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeCountArgs} args - Arguments to filter QrCodes to count.
     * @example
     * // Count the number of QrCodes
     * const count = await prisma.qrCode.count({
     *   where: {
     *     // ... the filter for the QrCodes we want to count
     *   }
     * })
    **/
    count<T extends QrCodeCountArgs>(
      args?: Subset<T, QrCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QrCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QrCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QrCodeAggregateArgs>(args: Subset<T, QrCodeAggregateArgs>): Prisma.PrismaPromise<GetQrCodeAggregateType<T>>

    /**
     * Group by QrCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QrCodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QrCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QrCodeGroupByArgs['orderBy'] }
        : { orderBy?: QrCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QrCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQrCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QrCode model
   */
  readonly fields: QrCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QrCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QrCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    link<T extends LinkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LinkDefaultArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QrCode model
   */
  interface QrCodeFieldRefs {
    readonly id: FieldRef<"QrCode", 'String'>
    readonly linkId: FieldRef<"QrCode", 'String'>
    readonly designConfig: FieldRef<"QrCode", 'Json'>
    readonly imageUrl: FieldRef<"QrCode", 'String'>
  }
    

  // Custom InputTypes
  /**
   * QrCode findUnique
   */
  export type QrCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCode to fetch.
     */
    where: QrCodeWhereUniqueInput
  }

  /**
   * QrCode findUniqueOrThrow
   */
  export type QrCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCode to fetch.
     */
    where: QrCodeWhereUniqueInput
  }

  /**
   * QrCode findFirst
   */
  export type QrCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCode to fetch.
     */
    where?: QrCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QrCodes to fetch.
     */
    orderBy?: QrCodeOrderByWithRelationInput | QrCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QrCodes.
     */
    cursor?: QrCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QrCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QrCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QrCodes.
     */
    distinct?: QrCodeScalarFieldEnum | QrCodeScalarFieldEnum[]
  }

  /**
   * QrCode findFirstOrThrow
   */
  export type QrCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCode to fetch.
     */
    where?: QrCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QrCodes to fetch.
     */
    orderBy?: QrCodeOrderByWithRelationInput | QrCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QrCodes.
     */
    cursor?: QrCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QrCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QrCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QrCodes.
     */
    distinct?: QrCodeScalarFieldEnum | QrCodeScalarFieldEnum[]
  }

  /**
   * QrCode findMany
   */
  export type QrCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter, which QrCodes to fetch.
     */
    where?: QrCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QrCodes to fetch.
     */
    orderBy?: QrCodeOrderByWithRelationInput | QrCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QrCodes.
     */
    cursor?: QrCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QrCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QrCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QrCodes.
     */
    distinct?: QrCodeScalarFieldEnum | QrCodeScalarFieldEnum[]
  }

  /**
   * QrCode create
   */
  export type QrCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a QrCode.
     */
    data: XOR<QrCodeCreateInput, QrCodeUncheckedCreateInput>
  }

  /**
   * QrCode createMany
   */
  export type QrCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QrCodes.
     */
    data: QrCodeCreateManyInput | QrCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QrCode createManyAndReturn
   */
  export type QrCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * The data used to create many QrCodes.
     */
    data: QrCodeCreateManyInput | QrCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QrCode update
   */
  export type QrCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a QrCode.
     */
    data: XOR<QrCodeUpdateInput, QrCodeUncheckedUpdateInput>
    /**
     * Choose, which QrCode to update.
     */
    where: QrCodeWhereUniqueInput
  }

  /**
   * QrCode updateMany
   */
  export type QrCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QrCodes.
     */
    data: XOR<QrCodeUpdateManyMutationInput, QrCodeUncheckedUpdateManyInput>
    /**
     * Filter which QrCodes to update
     */
    where?: QrCodeWhereInput
    /**
     * Limit how many QrCodes to update.
     */
    limit?: number
  }

  /**
   * QrCode updateManyAndReturn
   */
  export type QrCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * The data used to update QrCodes.
     */
    data: XOR<QrCodeUpdateManyMutationInput, QrCodeUncheckedUpdateManyInput>
    /**
     * Filter which QrCodes to update
     */
    where?: QrCodeWhereInput
    /**
     * Limit how many QrCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QrCode upsert
   */
  export type QrCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the QrCode to update in case it exists.
     */
    where: QrCodeWhereUniqueInput
    /**
     * In case the QrCode found by the `where` argument doesn't exist, create a new QrCode with this data.
     */
    create: XOR<QrCodeCreateInput, QrCodeUncheckedCreateInput>
    /**
     * In case the QrCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QrCodeUpdateInput, QrCodeUncheckedUpdateInput>
  }

  /**
   * QrCode delete
   */
  export type QrCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
    /**
     * Filter which QrCode to delete.
     */
    where: QrCodeWhereUniqueInput
  }

  /**
   * QrCode deleteMany
   */
  export type QrCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QrCodes to delete
     */
    where?: QrCodeWhereInput
    /**
     * Limit how many QrCodes to delete.
     */
    limit?: number
  }

  /**
   * QrCode without action
   */
  export type QrCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QrCode
     */
    select?: QrCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QrCode
     */
    omit?: QrCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QrCodeInclude<ExtArgs> | null
  }


  /**
   * Model ClicksAnalytics
   */

  export type AggregateClicksAnalytics = {
    _count: ClicksAnalyticsCountAggregateOutputType | null
    _min: ClicksAnalyticsMinAggregateOutputType | null
    _max: ClicksAnalyticsMaxAggregateOutputType | null
  }

  export type ClicksAnalyticsMinAggregateOutputType = {
    id: string | null
    linkId: string | null
    clickedAt: Date | null
    ip: string | null
    isQr: boolean | null
    country: string | null
    device: string | null
    referrer: string | null
  }

  export type ClicksAnalyticsMaxAggregateOutputType = {
    id: string | null
    linkId: string | null
    clickedAt: Date | null
    ip: string | null
    isQr: boolean | null
    country: string | null
    device: string | null
    referrer: string | null
  }

  export type ClicksAnalyticsCountAggregateOutputType = {
    id: number
    linkId: number
    clickedAt: number
    ip: number
    isQr: number
    country: number
    device: number
    referrer: number
    _all: number
  }


  export type ClicksAnalyticsMinAggregateInputType = {
    id?: true
    linkId?: true
    clickedAt?: true
    ip?: true
    isQr?: true
    country?: true
    device?: true
    referrer?: true
  }

  export type ClicksAnalyticsMaxAggregateInputType = {
    id?: true
    linkId?: true
    clickedAt?: true
    ip?: true
    isQr?: true
    country?: true
    device?: true
    referrer?: true
  }

  export type ClicksAnalyticsCountAggregateInputType = {
    id?: true
    linkId?: true
    clickedAt?: true
    ip?: true
    isQr?: true
    country?: true
    device?: true
    referrer?: true
    _all?: true
  }

  export type ClicksAnalyticsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClicksAnalytics to aggregate.
     */
    where?: ClicksAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClicksAnalytics to fetch.
     */
    orderBy?: ClicksAnalyticsOrderByWithRelationInput | ClicksAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClicksAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClicksAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClicksAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClicksAnalytics
    **/
    _count?: true | ClicksAnalyticsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClicksAnalyticsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClicksAnalyticsMaxAggregateInputType
  }

  export type GetClicksAnalyticsAggregateType<T extends ClicksAnalyticsAggregateArgs> = {
        [P in keyof T & keyof AggregateClicksAnalytics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClicksAnalytics[P]>
      : GetScalarType<T[P], AggregateClicksAnalytics[P]>
  }




  export type ClicksAnalyticsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClicksAnalyticsWhereInput
    orderBy?: ClicksAnalyticsOrderByWithAggregationInput | ClicksAnalyticsOrderByWithAggregationInput[]
    by: ClicksAnalyticsScalarFieldEnum[] | ClicksAnalyticsScalarFieldEnum
    having?: ClicksAnalyticsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClicksAnalyticsCountAggregateInputType | true
    _min?: ClicksAnalyticsMinAggregateInputType
    _max?: ClicksAnalyticsMaxAggregateInputType
  }

  export type ClicksAnalyticsGroupByOutputType = {
    id: string
    linkId: string
    clickedAt: Date
    ip: string | null
    isQr: boolean
    country: string | null
    device: string | null
    referrer: string | null
    _count: ClicksAnalyticsCountAggregateOutputType | null
    _min: ClicksAnalyticsMinAggregateOutputType | null
    _max: ClicksAnalyticsMaxAggregateOutputType | null
  }

  type GetClicksAnalyticsGroupByPayload<T extends ClicksAnalyticsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClicksAnalyticsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClicksAnalyticsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClicksAnalyticsGroupByOutputType[P]>
            : GetScalarType<T[P], ClicksAnalyticsGroupByOutputType[P]>
        }
      >
    >


  export type ClicksAnalyticsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    linkId?: boolean
    clickedAt?: boolean
    ip?: boolean
    isQr?: boolean
    country?: boolean
    device?: boolean
    referrer?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clicksAnalytics"]>

  export type ClicksAnalyticsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    linkId?: boolean
    clickedAt?: boolean
    ip?: boolean
    isQr?: boolean
    country?: boolean
    device?: boolean
    referrer?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clicksAnalytics"]>

  export type ClicksAnalyticsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    linkId?: boolean
    clickedAt?: boolean
    ip?: boolean
    isQr?: boolean
    country?: boolean
    device?: boolean
    referrer?: boolean
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clicksAnalytics"]>

  export type ClicksAnalyticsSelectScalar = {
    id?: boolean
    linkId?: boolean
    clickedAt?: boolean
    ip?: boolean
    isQr?: boolean
    country?: boolean
    device?: boolean
    referrer?: boolean
  }

  export type ClicksAnalyticsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "linkId" | "clickedAt" | "ip" | "isQr" | "country" | "device" | "referrer", ExtArgs["result"]["clicksAnalytics"]>
  export type ClicksAnalyticsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type ClicksAnalyticsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }
  export type ClicksAnalyticsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    link?: boolean | LinkDefaultArgs<ExtArgs>
  }

  export type $ClicksAnalyticsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClicksAnalytics"
    objects: {
      link: Prisma.$LinkPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      linkId: string
      clickedAt: Date
      ip: string | null
      isQr: boolean
      country: string | null
      device: string | null
      referrer: string | null
    }, ExtArgs["result"]["clicksAnalytics"]>
    composites: {}
  }

  type ClicksAnalyticsGetPayload<S extends boolean | null | undefined | ClicksAnalyticsDefaultArgs> = $Result.GetResult<Prisma.$ClicksAnalyticsPayload, S>

  type ClicksAnalyticsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClicksAnalyticsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClicksAnalyticsCountAggregateInputType | true
    }

  export interface ClicksAnalyticsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClicksAnalytics'], meta: { name: 'ClicksAnalytics' } }
    /**
     * Find zero or one ClicksAnalytics that matches the filter.
     * @param {ClicksAnalyticsFindUniqueArgs} args - Arguments to find a ClicksAnalytics
     * @example
     * // Get one ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClicksAnalyticsFindUniqueArgs>(args: SelectSubset<T, ClicksAnalyticsFindUniqueArgs<ExtArgs>>): Prisma__ClicksAnalyticsClient<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClicksAnalytics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClicksAnalyticsFindUniqueOrThrowArgs} args - Arguments to find a ClicksAnalytics
     * @example
     * // Get one ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClicksAnalyticsFindUniqueOrThrowArgs>(args: SelectSubset<T, ClicksAnalyticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClicksAnalyticsClient<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClicksAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClicksAnalyticsFindFirstArgs} args - Arguments to find a ClicksAnalytics
     * @example
     * // Get one ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClicksAnalyticsFindFirstArgs>(args?: SelectSubset<T, ClicksAnalyticsFindFirstArgs<ExtArgs>>): Prisma__ClicksAnalyticsClient<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClicksAnalytics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClicksAnalyticsFindFirstOrThrowArgs} args - Arguments to find a ClicksAnalytics
     * @example
     * // Get one ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClicksAnalyticsFindFirstOrThrowArgs>(args?: SelectSubset<T, ClicksAnalyticsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClicksAnalyticsClient<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClicksAnalytics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClicksAnalyticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.findMany()
     * 
     * // Get first 10 ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clicksAnalyticsWithIdOnly = await prisma.clicksAnalytics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClicksAnalyticsFindManyArgs>(args?: SelectSubset<T, ClicksAnalyticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClicksAnalytics.
     * @param {ClicksAnalyticsCreateArgs} args - Arguments to create a ClicksAnalytics.
     * @example
     * // Create one ClicksAnalytics
     * const ClicksAnalytics = await prisma.clicksAnalytics.create({
     *   data: {
     *     // ... data to create a ClicksAnalytics
     *   }
     * })
     * 
     */
    create<T extends ClicksAnalyticsCreateArgs>(args: SelectSubset<T, ClicksAnalyticsCreateArgs<ExtArgs>>): Prisma__ClicksAnalyticsClient<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClicksAnalytics.
     * @param {ClicksAnalyticsCreateManyArgs} args - Arguments to create many ClicksAnalytics.
     * @example
     * // Create many ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClicksAnalyticsCreateManyArgs>(args?: SelectSubset<T, ClicksAnalyticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClicksAnalytics and returns the data saved in the database.
     * @param {ClicksAnalyticsCreateManyAndReturnArgs} args - Arguments to create many ClicksAnalytics.
     * @example
     * // Create many ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClicksAnalytics and only return the `id`
     * const clicksAnalyticsWithIdOnly = await prisma.clicksAnalytics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClicksAnalyticsCreateManyAndReturnArgs>(args?: SelectSubset<T, ClicksAnalyticsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClicksAnalytics.
     * @param {ClicksAnalyticsDeleteArgs} args - Arguments to delete one ClicksAnalytics.
     * @example
     * // Delete one ClicksAnalytics
     * const ClicksAnalytics = await prisma.clicksAnalytics.delete({
     *   where: {
     *     // ... filter to delete one ClicksAnalytics
     *   }
     * })
     * 
     */
    delete<T extends ClicksAnalyticsDeleteArgs>(args: SelectSubset<T, ClicksAnalyticsDeleteArgs<ExtArgs>>): Prisma__ClicksAnalyticsClient<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClicksAnalytics.
     * @param {ClicksAnalyticsUpdateArgs} args - Arguments to update one ClicksAnalytics.
     * @example
     * // Update one ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClicksAnalyticsUpdateArgs>(args: SelectSubset<T, ClicksAnalyticsUpdateArgs<ExtArgs>>): Prisma__ClicksAnalyticsClient<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClicksAnalytics.
     * @param {ClicksAnalyticsDeleteManyArgs} args - Arguments to filter ClicksAnalytics to delete.
     * @example
     * // Delete a few ClicksAnalytics
     * const { count } = await prisma.clicksAnalytics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClicksAnalyticsDeleteManyArgs>(args?: SelectSubset<T, ClicksAnalyticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClicksAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClicksAnalyticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClicksAnalyticsUpdateManyArgs>(args: SelectSubset<T, ClicksAnalyticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClicksAnalytics and returns the data updated in the database.
     * @param {ClicksAnalyticsUpdateManyAndReturnArgs} args - Arguments to update many ClicksAnalytics.
     * @example
     * // Update many ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClicksAnalytics and only return the `id`
     * const clicksAnalyticsWithIdOnly = await prisma.clicksAnalytics.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClicksAnalyticsUpdateManyAndReturnArgs>(args: SelectSubset<T, ClicksAnalyticsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClicksAnalytics.
     * @param {ClicksAnalyticsUpsertArgs} args - Arguments to update or create a ClicksAnalytics.
     * @example
     * // Update or create a ClicksAnalytics
     * const clicksAnalytics = await prisma.clicksAnalytics.upsert({
     *   create: {
     *     // ... data to create a ClicksAnalytics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClicksAnalytics we want to update
     *   }
     * })
     */
    upsert<T extends ClicksAnalyticsUpsertArgs>(args: SelectSubset<T, ClicksAnalyticsUpsertArgs<ExtArgs>>): Prisma__ClicksAnalyticsClient<$Result.GetResult<Prisma.$ClicksAnalyticsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClicksAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClicksAnalyticsCountArgs} args - Arguments to filter ClicksAnalytics to count.
     * @example
     * // Count the number of ClicksAnalytics
     * const count = await prisma.clicksAnalytics.count({
     *   where: {
     *     // ... the filter for the ClicksAnalytics we want to count
     *   }
     * })
    **/
    count<T extends ClicksAnalyticsCountArgs>(
      args?: Subset<T, ClicksAnalyticsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClicksAnalyticsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClicksAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClicksAnalyticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClicksAnalyticsAggregateArgs>(args: Subset<T, ClicksAnalyticsAggregateArgs>): Prisma.PrismaPromise<GetClicksAnalyticsAggregateType<T>>

    /**
     * Group by ClicksAnalytics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClicksAnalyticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClicksAnalyticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClicksAnalyticsGroupByArgs['orderBy'] }
        : { orderBy?: ClicksAnalyticsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClicksAnalyticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClicksAnalyticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClicksAnalytics model
   */
  readonly fields: ClicksAnalyticsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClicksAnalytics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClicksAnalyticsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    link<T extends LinkDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LinkDefaultArgs<ExtArgs>>): Prisma__LinkClient<$Result.GetResult<Prisma.$LinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClicksAnalytics model
   */
  interface ClicksAnalyticsFieldRefs {
    readonly id: FieldRef<"ClicksAnalytics", 'String'>
    readonly linkId: FieldRef<"ClicksAnalytics", 'String'>
    readonly clickedAt: FieldRef<"ClicksAnalytics", 'DateTime'>
    readonly ip: FieldRef<"ClicksAnalytics", 'String'>
    readonly isQr: FieldRef<"ClicksAnalytics", 'Boolean'>
    readonly country: FieldRef<"ClicksAnalytics", 'String'>
    readonly device: FieldRef<"ClicksAnalytics", 'String'>
    readonly referrer: FieldRef<"ClicksAnalytics", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ClicksAnalytics findUnique
   */
  export type ClicksAnalyticsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which ClicksAnalytics to fetch.
     */
    where: ClicksAnalyticsWhereUniqueInput
  }

  /**
   * ClicksAnalytics findUniqueOrThrow
   */
  export type ClicksAnalyticsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which ClicksAnalytics to fetch.
     */
    where: ClicksAnalyticsWhereUniqueInput
  }

  /**
   * ClicksAnalytics findFirst
   */
  export type ClicksAnalyticsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which ClicksAnalytics to fetch.
     */
    where?: ClicksAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClicksAnalytics to fetch.
     */
    orderBy?: ClicksAnalyticsOrderByWithRelationInput | ClicksAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClicksAnalytics.
     */
    cursor?: ClicksAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClicksAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClicksAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClicksAnalytics.
     */
    distinct?: ClicksAnalyticsScalarFieldEnum | ClicksAnalyticsScalarFieldEnum[]
  }

  /**
   * ClicksAnalytics findFirstOrThrow
   */
  export type ClicksAnalyticsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which ClicksAnalytics to fetch.
     */
    where?: ClicksAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClicksAnalytics to fetch.
     */
    orderBy?: ClicksAnalyticsOrderByWithRelationInput | ClicksAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClicksAnalytics.
     */
    cursor?: ClicksAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClicksAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClicksAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClicksAnalytics.
     */
    distinct?: ClicksAnalyticsScalarFieldEnum | ClicksAnalyticsScalarFieldEnum[]
  }

  /**
   * ClicksAnalytics findMany
   */
  export type ClicksAnalyticsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    /**
     * Filter, which ClicksAnalytics to fetch.
     */
    where?: ClicksAnalyticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClicksAnalytics to fetch.
     */
    orderBy?: ClicksAnalyticsOrderByWithRelationInput | ClicksAnalyticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClicksAnalytics.
     */
    cursor?: ClicksAnalyticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClicksAnalytics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClicksAnalytics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClicksAnalytics.
     */
    distinct?: ClicksAnalyticsScalarFieldEnum | ClicksAnalyticsScalarFieldEnum[]
  }

  /**
   * ClicksAnalytics create
   */
  export type ClicksAnalyticsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    /**
     * The data needed to create a ClicksAnalytics.
     */
    data: XOR<ClicksAnalyticsCreateInput, ClicksAnalyticsUncheckedCreateInput>
  }

  /**
   * ClicksAnalytics createMany
   */
  export type ClicksAnalyticsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClicksAnalytics.
     */
    data: ClicksAnalyticsCreateManyInput | ClicksAnalyticsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClicksAnalytics createManyAndReturn
   */
  export type ClicksAnalyticsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * The data used to create many ClicksAnalytics.
     */
    data: ClicksAnalyticsCreateManyInput | ClicksAnalyticsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClicksAnalytics update
   */
  export type ClicksAnalyticsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    /**
     * The data needed to update a ClicksAnalytics.
     */
    data: XOR<ClicksAnalyticsUpdateInput, ClicksAnalyticsUncheckedUpdateInput>
    /**
     * Choose, which ClicksAnalytics to update.
     */
    where: ClicksAnalyticsWhereUniqueInput
  }

  /**
   * ClicksAnalytics updateMany
   */
  export type ClicksAnalyticsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClicksAnalytics.
     */
    data: XOR<ClicksAnalyticsUpdateManyMutationInput, ClicksAnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which ClicksAnalytics to update
     */
    where?: ClicksAnalyticsWhereInput
    /**
     * Limit how many ClicksAnalytics to update.
     */
    limit?: number
  }

  /**
   * ClicksAnalytics updateManyAndReturn
   */
  export type ClicksAnalyticsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * The data used to update ClicksAnalytics.
     */
    data: XOR<ClicksAnalyticsUpdateManyMutationInput, ClicksAnalyticsUncheckedUpdateManyInput>
    /**
     * Filter which ClicksAnalytics to update
     */
    where?: ClicksAnalyticsWhereInput
    /**
     * Limit how many ClicksAnalytics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClicksAnalytics upsert
   */
  export type ClicksAnalyticsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    /**
     * The filter to search for the ClicksAnalytics to update in case it exists.
     */
    where: ClicksAnalyticsWhereUniqueInput
    /**
     * In case the ClicksAnalytics found by the `where` argument doesn't exist, create a new ClicksAnalytics with this data.
     */
    create: XOR<ClicksAnalyticsCreateInput, ClicksAnalyticsUncheckedCreateInput>
    /**
     * In case the ClicksAnalytics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClicksAnalyticsUpdateInput, ClicksAnalyticsUncheckedUpdateInput>
  }

  /**
   * ClicksAnalytics delete
   */
  export type ClicksAnalyticsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
    /**
     * Filter which ClicksAnalytics to delete.
     */
    where: ClicksAnalyticsWhereUniqueInput
  }

  /**
   * ClicksAnalytics deleteMany
   */
  export type ClicksAnalyticsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClicksAnalytics to delete
     */
    where?: ClicksAnalyticsWhereInput
    /**
     * Limit how many ClicksAnalytics to delete.
     */
    limit?: number
  }

  /**
   * ClicksAnalytics without action
   */
  export type ClicksAnalyticsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClicksAnalytics
     */
    select?: ClicksAnalyticsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClicksAnalytics
     */
    omit?: ClicksAnalyticsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClicksAnalyticsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    role: 'role',
    planId: 'planId',
    plan: 'plan',
    organizationId: 'organizationId',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    status: 'status',
    ownerId: 'ownerId',
    createdAt: 'createdAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const DomainScalarFieldEnum: {
    id: 'id',
    hostname: 'hostname',
    organizationId: 'organizationId',
    verified: 'verified',
    createdAt: 'createdAt'
  };

  export type DomainScalarFieldEnum = (typeof DomainScalarFieldEnum)[keyof typeof DomainScalarFieldEnum]


  export const PlanScalarFieldEnum: {
    id: 'id',
    tierName: 'tierName',
    publicName: 'publicName',
    monthlyLinks: 'monthlyLinks',
    monthlyQrCodes: 'monthlyQrCodes',
    maxOrganizations: 'maxOrganizations',
    price: 'price',
    createdAt: 'createdAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const LinkScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    originalUrl: 'originalUrl',
    domain: 'domain',
    shortSlug: 'shortSlug',
    title: 'title',
    tags: 'tags',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type LinkScalarFieldEnum = (typeof LinkScalarFieldEnum)[keyof typeof LinkScalarFieldEnum]


  export const QrCodeScalarFieldEnum: {
    id: 'id',
    linkId: 'linkId',
    designConfig: 'designConfig',
    imageUrl: 'imageUrl'
  };

  export type QrCodeScalarFieldEnum = (typeof QrCodeScalarFieldEnum)[keyof typeof QrCodeScalarFieldEnum]


  export const ClicksAnalyticsScalarFieldEnum: {
    id: 'id',
    linkId: 'linkId',
    clickedAt: 'clickedAt',
    ip: 'ip',
    isQr: 'isQr',
    country: 'country',
    device: 'device',
    referrer: 'referrer'
  };

  export type ClicksAnalyticsScalarFieldEnum = (typeof ClicksAnalyticsScalarFieldEnum)[keyof typeof ClicksAnalyticsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    planId?: StringFilter<"User"> | string
    plan?: StringFilter<"User"> | string
    organizationId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    planTier?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    ownedOrganizations?: OrganizationListRelationFilter
    links?: LinkListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    planId?: SortOrder
    plan?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    planTier?: PlanOrderByWithRelationInput
    organization?: OrganizationOrderByWithRelationInput
    ownedOrganizations?: OrganizationOrderByRelationAggregateInput
    links?: LinkOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    planId?: StringFilter<"User"> | string
    plan?: StringFilter<"User"> | string
    organizationId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    planTier?: XOR<PlanScalarRelationFilter, PlanWhereInput>
    organization?: XOR<OrganizationNullableScalarRelationFilter, OrganizationWhereInput> | null
    ownedOrganizations?: OrganizationListRelationFilter
    links?: LinkListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    planId?: SortOrder
    plan?: SortOrder
    organizationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    planId?: StringWithAggregatesFilter<"User"> | string
    plan?: StringWithAggregatesFilter<"User"> | string
    organizationId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    status?: EnumStatusFilter<"Organization"> | $Enums.Status
    ownerId?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    users?: UserListRelationFilter
    domains?: DomainListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    users?: UserOrderByRelationAggregateInput
    domains?: DomainOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    status?: EnumStatusFilter<"Organization"> | $Enums.Status
    ownerId?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    users?: UserListRelationFilter
    domains?: DomainListRelationFilter
  }, "id">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    status?: EnumStatusWithAggregatesFilter<"Organization"> | $Enums.Status
    ownerId?: StringWithAggregatesFilter<"Organization"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type DomainWhereInput = {
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    id?: StringFilter<"Domain"> | string
    hostname?: StringFilter<"Domain"> | string
    organizationId?: StringFilter<"Domain"> | string
    verified?: BoolFilter<"Domain"> | boolean
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }

  export type DomainOrderByWithRelationInput = {
    id?: SortOrder
    hostname?: SortOrder
    organizationId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type DomainWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hostname?: string
    AND?: DomainWhereInput | DomainWhereInput[]
    OR?: DomainWhereInput[]
    NOT?: DomainWhereInput | DomainWhereInput[]
    organizationId?: StringFilter<"Domain"> | string
    verified?: BoolFilter<"Domain"> | boolean
    createdAt?: DateTimeFilter<"Domain"> | Date | string
    organization?: XOR<OrganizationScalarRelationFilter, OrganizationWhereInput>
  }, "id" | "hostname">

  export type DomainOrderByWithAggregationInput = {
    id?: SortOrder
    hostname?: SortOrder
    organizationId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
    _count?: DomainCountOrderByAggregateInput
    _max?: DomainMaxOrderByAggregateInput
    _min?: DomainMinOrderByAggregateInput
  }

  export type DomainScalarWhereWithAggregatesInput = {
    AND?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    OR?: DomainScalarWhereWithAggregatesInput[]
    NOT?: DomainScalarWhereWithAggregatesInput | DomainScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Domain"> | string
    hostname?: StringWithAggregatesFilter<"Domain"> | string
    organizationId?: StringWithAggregatesFilter<"Domain"> | string
    verified?: BoolWithAggregatesFilter<"Domain"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Domain"> | Date | string
  }

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: StringFilter<"Plan"> | string
    tierName?: StringFilter<"Plan"> | string
    publicName?: StringFilter<"Plan"> | string
    monthlyLinks?: IntFilter<"Plan"> | number
    monthlyQrCodes?: IntFilter<"Plan"> | number
    maxOrganizations?: IntFilter<"Plan"> | number
    price?: FloatFilter<"Plan"> | number
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    users?: UserListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    tierName?: SortOrder
    publicName?: SortOrder
    monthlyLinks?: SortOrder
    monthlyQrCodes?: SortOrder
    maxOrganizations?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tierName?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    publicName?: StringFilter<"Plan"> | string
    monthlyLinks?: IntFilter<"Plan"> | number
    monthlyQrCodes?: IntFilter<"Plan"> | number
    maxOrganizations?: IntFilter<"Plan"> | number
    price?: FloatFilter<"Plan"> | number
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    users?: UserListRelationFilter
  }, "id" | "tierName">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    tierName?: SortOrder
    publicName?: SortOrder
    monthlyLinks?: SortOrder
    monthlyQrCodes?: SortOrder
    maxOrganizations?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plan"> | string
    tierName?: StringWithAggregatesFilter<"Plan"> | string
    publicName?: StringWithAggregatesFilter<"Plan"> | string
    monthlyLinks?: IntWithAggregatesFilter<"Plan"> | number
    monthlyQrCodes?: IntWithAggregatesFilter<"Plan"> | number
    maxOrganizations?: IntWithAggregatesFilter<"Plan"> | number
    price?: FloatWithAggregatesFilter<"Plan"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type LinkWhereInput = {
    AND?: LinkWhereInput | LinkWhereInput[]
    OR?: LinkWhereInput[]
    NOT?: LinkWhereInput | LinkWhereInput[]
    id?: StringFilter<"Link"> | string
    userId?: StringFilter<"Link"> | string
    originalUrl?: StringFilter<"Link"> | string
    domain?: StringFilter<"Link"> | string
    shortSlug?: StringFilter<"Link"> | string
    title?: StringNullableFilter<"Link"> | string | null
    tags?: StringNullableListFilter<"Link">
    status?: EnumStatusFilter<"Link"> | $Enums.Status
    createdAt?: DateTimeFilter<"Link"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    qrCodes?: QrCodeListRelationFilter
    clicksAnalytics?: ClicksAnalyticsListRelationFilter
  }

  export type LinkOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    originalUrl?: SortOrder
    domain?: SortOrder
    shortSlug?: SortOrder
    title?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    qrCodes?: QrCodeOrderByRelationAggregateInput
    clicksAnalytics?: ClicksAnalyticsOrderByRelationAggregateInput
  }

  export type LinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shortSlug?: string
    AND?: LinkWhereInput | LinkWhereInput[]
    OR?: LinkWhereInput[]
    NOT?: LinkWhereInput | LinkWhereInput[]
    userId?: StringFilter<"Link"> | string
    originalUrl?: StringFilter<"Link"> | string
    domain?: StringFilter<"Link"> | string
    title?: StringNullableFilter<"Link"> | string | null
    tags?: StringNullableListFilter<"Link">
    status?: EnumStatusFilter<"Link"> | $Enums.Status
    createdAt?: DateTimeFilter<"Link"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    qrCodes?: QrCodeListRelationFilter
    clicksAnalytics?: ClicksAnalyticsListRelationFilter
  }, "id" | "shortSlug">

  export type LinkOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    originalUrl?: SortOrder
    domain?: SortOrder
    shortSlug?: SortOrder
    title?: SortOrderInput | SortOrder
    tags?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: LinkCountOrderByAggregateInput
    _max?: LinkMaxOrderByAggregateInput
    _min?: LinkMinOrderByAggregateInput
  }

  export type LinkScalarWhereWithAggregatesInput = {
    AND?: LinkScalarWhereWithAggregatesInput | LinkScalarWhereWithAggregatesInput[]
    OR?: LinkScalarWhereWithAggregatesInput[]
    NOT?: LinkScalarWhereWithAggregatesInput | LinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Link"> | string
    userId?: StringWithAggregatesFilter<"Link"> | string
    originalUrl?: StringWithAggregatesFilter<"Link"> | string
    domain?: StringWithAggregatesFilter<"Link"> | string
    shortSlug?: StringWithAggregatesFilter<"Link"> | string
    title?: StringNullableWithAggregatesFilter<"Link"> | string | null
    tags?: StringNullableListFilter<"Link">
    status?: EnumStatusWithAggregatesFilter<"Link"> | $Enums.Status
    createdAt?: DateTimeWithAggregatesFilter<"Link"> | Date | string
  }

  export type QrCodeWhereInput = {
    AND?: QrCodeWhereInput | QrCodeWhereInput[]
    OR?: QrCodeWhereInput[]
    NOT?: QrCodeWhereInput | QrCodeWhereInput[]
    id?: StringFilter<"QrCode"> | string
    linkId?: StringFilter<"QrCode"> | string
    designConfig?: JsonFilter<"QrCode">
    imageUrl?: StringFilter<"QrCode"> | string
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }

  export type QrCodeOrderByWithRelationInput = {
    id?: SortOrder
    linkId?: SortOrder
    designConfig?: SortOrder
    imageUrl?: SortOrder
    link?: LinkOrderByWithRelationInput
  }

  export type QrCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QrCodeWhereInput | QrCodeWhereInput[]
    OR?: QrCodeWhereInput[]
    NOT?: QrCodeWhereInput | QrCodeWhereInput[]
    linkId?: StringFilter<"QrCode"> | string
    designConfig?: JsonFilter<"QrCode">
    imageUrl?: StringFilter<"QrCode"> | string
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }, "id">

  export type QrCodeOrderByWithAggregationInput = {
    id?: SortOrder
    linkId?: SortOrder
    designConfig?: SortOrder
    imageUrl?: SortOrder
    _count?: QrCodeCountOrderByAggregateInput
    _max?: QrCodeMaxOrderByAggregateInput
    _min?: QrCodeMinOrderByAggregateInput
  }

  export type QrCodeScalarWhereWithAggregatesInput = {
    AND?: QrCodeScalarWhereWithAggregatesInput | QrCodeScalarWhereWithAggregatesInput[]
    OR?: QrCodeScalarWhereWithAggregatesInput[]
    NOT?: QrCodeScalarWhereWithAggregatesInput | QrCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QrCode"> | string
    linkId?: StringWithAggregatesFilter<"QrCode"> | string
    designConfig?: JsonWithAggregatesFilter<"QrCode">
    imageUrl?: StringWithAggregatesFilter<"QrCode"> | string
  }

  export type ClicksAnalyticsWhereInput = {
    AND?: ClicksAnalyticsWhereInput | ClicksAnalyticsWhereInput[]
    OR?: ClicksAnalyticsWhereInput[]
    NOT?: ClicksAnalyticsWhereInput | ClicksAnalyticsWhereInput[]
    id?: StringFilter<"ClicksAnalytics"> | string
    linkId?: StringFilter<"ClicksAnalytics"> | string
    clickedAt?: DateTimeFilter<"ClicksAnalytics"> | Date | string
    ip?: StringNullableFilter<"ClicksAnalytics"> | string | null
    isQr?: BoolFilter<"ClicksAnalytics"> | boolean
    country?: StringNullableFilter<"ClicksAnalytics"> | string | null
    device?: StringNullableFilter<"ClicksAnalytics"> | string | null
    referrer?: StringNullableFilter<"ClicksAnalytics"> | string | null
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }

  export type ClicksAnalyticsOrderByWithRelationInput = {
    id?: SortOrder
    linkId?: SortOrder
    clickedAt?: SortOrder
    ip?: SortOrderInput | SortOrder
    isQr?: SortOrder
    country?: SortOrderInput | SortOrder
    device?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    link?: LinkOrderByWithRelationInput
  }

  export type ClicksAnalyticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClicksAnalyticsWhereInput | ClicksAnalyticsWhereInput[]
    OR?: ClicksAnalyticsWhereInput[]
    NOT?: ClicksAnalyticsWhereInput | ClicksAnalyticsWhereInput[]
    linkId?: StringFilter<"ClicksAnalytics"> | string
    clickedAt?: DateTimeFilter<"ClicksAnalytics"> | Date | string
    ip?: StringNullableFilter<"ClicksAnalytics"> | string | null
    isQr?: BoolFilter<"ClicksAnalytics"> | boolean
    country?: StringNullableFilter<"ClicksAnalytics"> | string | null
    device?: StringNullableFilter<"ClicksAnalytics"> | string | null
    referrer?: StringNullableFilter<"ClicksAnalytics"> | string | null
    link?: XOR<LinkScalarRelationFilter, LinkWhereInput>
  }, "id">

  export type ClicksAnalyticsOrderByWithAggregationInput = {
    id?: SortOrder
    linkId?: SortOrder
    clickedAt?: SortOrder
    ip?: SortOrderInput | SortOrder
    isQr?: SortOrder
    country?: SortOrderInput | SortOrder
    device?: SortOrderInput | SortOrder
    referrer?: SortOrderInput | SortOrder
    _count?: ClicksAnalyticsCountOrderByAggregateInput
    _max?: ClicksAnalyticsMaxOrderByAggregateInput
    _min?: ClicksAnalyticsMinOrderByAggregateInput
  }

  export type ClicksAnalyticsScalarWhereWithAggregatesInput = {
    AND?: ClicksAnalyticsScalarWhereWithAggregatesInput | ClicksAnalyticsScalarWhereWithAggregatesInput[]
    OR?: ClicksAnalyticsScalarWhereWithAggregatesInput[]
    NOT?: ClicksAnalyticsScalarWhereWithAggregatesInput | ClicksAnalyticsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClicksAnalytics"> | string
    linkId?: StringWithAggregatesFilter<"ClicksAnalytics"> | string
    clickedAt?: DateTimeWithAggregatesFilter<"ClicksAnalytics"> | Date | string
    ip?: StringNullableWithAggregatesFilter<"ClicksAnalytics"> | string | null
    isQr?: BoolWithAggregatesFilter<"ClicksAnalytics"> | boolean
    country?: StringNullableWithAggregatesFilter<"ClicksAnalytics"> | string | null
    device?: StringNullableWithAggregatesFilter<"ClicksAnalytics"> | string | null
    referrer?: StringNullableWithAggregatesFilter<"ClicksAnalytics"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    plan?: string
    createdAt?: Date | string
    planTier: PlanCreateNestedOneWithoutUsersInput
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    ownedOrganizations?: OrganizationCreateNestedManyWithoutOwnerInput
    links?: LinkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    role?: $Enums.Role
    planId: string
    plan?: string
    organizationId?: string | null
    createdAt?: Date | string
    ownedOrganizations?: OrganizationUncheckedCreateNestedManyWithoutOwnerInput
    links?: LinkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    planTier?: PlanUpdateOneRequiredWithoutUsersNestedInput
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    ownedOrganizations?: OrganizationUpdateManyWithoutOwnerNestedInput
    links?: LinkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    planId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedOrganizations?: OrganizationUncheckedUpdateManyWithoutOwnerNestedInput
    links?: LinkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    role?: $Enums.Role
    planId: string
    plan?: string
    organizationId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    planId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    status?: $Enums.Status
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedOrganizationsInput
    users?: UserCreateNestedManyWithoutOrganizationInput
    domains?: DomainCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    status?: $Enums.Status
    ownerId: string
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    domains?: DomainUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedOrganizationsNestedInput
    users?: UserUpdateManyWithoutOrganizationNestedInput
    domains?: DomainUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    domains?: DomainUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    status?: $Enums.Status
    ownerId: string
    createdAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainCreateInput = {
    id?: string
    hostname: string
    verified?: boolean
    createdAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutDomainsInput
  }

  export type DomainUncheckedCreateInput = {
    id?: string
    hostname: string
    organizationId: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type DomainUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostname?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutDomainsNestedInput
  }

  export type DomainUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostname?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainCreateManyInput = {
    id?: string
    hostname: string
    organizationId: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type DomainUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostname?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostname?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCreateInput = {
    id?: string
    tierName: string
    publicName: string
    monthlyLinks: number
    monthlyQrCodes: number
    maxOrganizations?: number
    price?: number
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutPlanTierInput
  }

  export type PlanUncheckedCreateInput = {
    id?: string
    tierName: string
    publicName: string
    monthlyLinks: number
    monthlyQrCodes: number
    maxOrganizations?: number
    price?: number
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutPlanTierInput
  }

  export type PlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tierName?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    monthlyLinks?: IntFieldUpdateOperationsInput | number
    monthlyQrCodes?: IntFieldUpdateOperationsInput | number
    maxOrganizations?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutPlanTierNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tierName?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    monthlyLinks?: IntFieldUpdateOperationsInput | number
    monthlyQrCodes?: IntFieldUpdateOperationsInput | number
    maxOrganizations?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutPlanTierNestedInput
  }

  export type PlanCreateManyInput = {
    id?: string
    tierName: string
    publicName: string
    monthlyLinks: number
    monthlyQrCodes: number
    maxOrganizations?: number
    price?: number
    createdAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tierName?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    monthlyLinks?: IntFieldUpdateOperationsInput | number
    monthlyQrCodes?: IntFieldUpdateOperationsInput | number
    maxOrganizations?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tierName?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    monthlyLinks?: IntFieldUpdateOperationsInput | number
    monthlyQrCodes?: IntFieldUpdateOperationsInput | number
    maxOrganizations?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkCreateInput = {
    id?: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLinksInput
    qrCodes?: QrCodeCreateNestedManyWithoutLinkInput
    clicksAnalytics?: ClicksAnalyticsCreateNestedManyWithoutLinkInput
  }

  export type LinkUncheckedCreateInput = {
    id?: string
    userId: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
    qrCodes?: QrCodeUncheckedCreateNestedManyWithoutLinkInput
    clicksAnalytics?: ClicksAnalyticsUncheckedCreateNestedManyWithoutLinkInput
  }

  export type LinkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLinksNestedInput
    qrCodes?: QrCodeUpdateManyWithoutLinkNestedInput
    clicksAnalytics?: ClicksAnalyticsUpdateManyWithoutLinkNestedInput
  }

  export type LinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrCodes?: QrCodeUncheckedUpdateManyWithoutLinkNestedInput
    clicksAnalytics?: ClicksAnalyticsUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type LinkCreateManyInput = {
    id?: string
    userId: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
  }

  export type LinkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QrCodeCreateInput = {
    id?: string
    designConfig: JsonNullValueInput | InputJsonValue
    imageUrl: string
    link: LinkCreateNestedOneWithoutQrCodesInput
  }

  export type QrCodeUncheckedCreateInput = {
    id?: string
    linkId: string
    designConfig: JsonNullValueInput | InputJsonValue
    imageUrl: string
  }

  export type QrCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    designConfig?: JsonNullValueInput | InputJsonValue
    imageUrl?: StringFieldUpdateOperationsInput | string
    link?: LinkUpdateOneRequiredWithoutQrCodesNestedInput
  }

  export type QrCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: StringFieldUpdateOperationsInput | string
    designConfig?: JsonNullValueInput | InputJsonValue
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type QrCodeCreateManyInput = {
    id?: string
    linkId: string
    designConfig: JsonNullValueInput | InputJsonValue
    imageUrl: string
  }

  export type QrCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    designConfig?: JsonNullValueInput | InputJsonValue
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type QrCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: StringFieldUpdateOperationsInput | string
    designConfig?: JsonNullValueInput | InputJsonValue
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type ClicksAnalyticsCreateInput = {
    id?: string
    clickedAt?: Date | string
    ip?: string | null
    isQr?: boolean
    country?: string | null
    device?: string | null
    referrer?: string | null
    link: LinkCreateNestedOneWithoutClicksAnalyticsInput
  }

  export type ClicksAnalyticsUncheckedCreateInput = {
    id?: string
    linkId: string
    clickedAt?: Date | string
    ip?: string | null
    isQr?: boolean
    country?: string | null
    device?: string | null
    referrer?: string | null
  }

  export type ClicksAnalyticsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clickedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isQr?: BoolFieldUpdateOperationsInput | boolean
    country?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
    link?: LinkUpdateOneRequiredWithoutClicksAnalyticsNestedInput
  }

  export type ClicksAnalyticsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: StringFieldUpdateOperationsInput | string
    clickedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isQr?: BoolFieldUpdateOperationsInput | boolean
    country?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClicksAnalyticsCreateManyInput = {
    id?: string
    linkId: string
    clickedAt?: Date | string
    ip?: string | null
    isQr?: boolean
    country?: string | null
    device?: string | null
    referrer?: string | null
  }

  export type ClicksAnalyticsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clickedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isQr?: BoolFieldUpdateOperationsInput | boolean
    country?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClicksAnalyticsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    linkId?: StringFieldUpdateOperationsInput | string
    clickedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isQr?: BoolFieldUpdateOperationsInput | boolean
    country?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PlanScalarRelationFilter = {
    is?: PlanWhereInput
    isNot?: PlanWhereInput
  }

  export type OrganizationNullableScalarRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type OrganizationListRelationFilter = {
    every?: OrganizationWhereInput
    some?: OrganizationWhereInput
    none?: OrganizationWhereInput
  }

  export type LinkListRelationFilter = {
    every?: LinkWhereInput
    some?: LinkWhereInput
    none?: LinkWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrganizationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    planId?: SortOrder
    plan?: SortOrder
    organizationId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    planId?: SortOrder
    plan?: SortOrder
    organizationId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    role?: SortOrder
    planId?: SortOrder
    plan?: SortOrder
    organizationId?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type DomainListRelationFilter = {
    every?: DomainWhereInput
    some?: DomainWhereInput
    none?: DomainWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DomainOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    ownerId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrganizationScalarRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type DomainCountOrderByAggregateInput = {
    id?: SortOrder
    hostname?: SortOrder
    organizationId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
  }

  export type DomainMaxOrderByAggregateInput = {
    id?: SortOrder
    hostname?: SortOrder
    organizationId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
  }

  export type DomainMinOrderByAggregateInput = {
    id?: SortOrder
    hostname?: SortOrder
    organizationId?: SortOrder
    verified?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    tierName?: SortOrder
    publicName?: SortOrder
    monthlyLinks?: SortOrder
    monthlyQrCodes?: SortOrder
    maxOrganizations?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    monthlyLinks?: SortOrder
    monthlyQrCodes?: SortOrder
    maxOrganizations?: SortOrder
    price?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    tierName?: SortOrder
    publicName?: SortOrder
    monthlyLinks?: SortOrder
    monthlyQrCodes?: SortOrder
    maxOrganizations?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    tierName?: SortOrder
    publicName?: SortOrder
    monthlyLinks?: SortOrder
    monthlyQrCodes?: SortOrder
    maxOrganizations?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    monthlyLinks?: SortOrder
    monthlyQrCodes?: SortOrder
    maxOrganizations?: SortOrder
    price?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type QrCodeListRelationFilter = {
    every?: QrCodeWhereInput
    some?: QrCodeWhereInput
    none?: QrCodeWhereInput
  }

  export type ClicksAnalyticsListRelationFilter = {
    every?: ClicksAnalyticsWhereInput
    some?: ClicksAnalyticsWhereInput
    none?: ClicksAnalyticsWhereInput
  }

  export type QrCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClicksAnalyticsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LinkCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originalUrl?: SortOrder
    domain?: SortOrder
    shortSlug?: SortOrder
    title?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type LinkMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originalUrl?: SortOrder
    domain?: SortOrder
    shortSlug?: SortOrder
    title?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type LinkMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    originalUrl?: SortOrder
    domain?: SortOrder
    shortSlug?: SortOrder
    title?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LinkScalarRelationFilter = {
    is?: LinkWhereInput
    isNot?: LinkWhereInput
  }

  export type QrCodeCountOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    designConfig?: SortOrder
    imageUrl?: SortOrder
  }

  export type QrCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    imageUrl?: SortOrder
  }

  export type QrCodeMinOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    imageUrl?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type ClicksAnalyticsCountOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    clickedAt?: SortOrder
    ip?: SortOrder
    isQr?: SortOrder
    country?: SortOrder
    device?: SortOrder
    referrer?: SortOrder
  }

  export type ClicksAnalyticsMaxOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    clickedAt?: SortOrder
    ip?: SortOrder
    isQr?: SortOrder
    country?: SortOrder
    device?: SortOrder
    referrer?: SortOrder
  }

  export type ClicksAnalyticsMinOrderByAggregateInput = {
    id?: SortOrder
    linkId?: SortOrder
    clickedAt?: SortOrder
    ip?: SortOrder
    isQr?: SortOrder
    country?: SortOrder
    device?: SortOrder
    referrer?: SortOrder
  }

  export type PlanCreateNestedOneWithoutUsersInput = {
    create?: XOR<PlanCreateWithoutUsersInput, PlanUncheckedCreateWithoutUsersInput>
    connectOrCreate?: PlanCreateOrConnectWithoutUsersInput
    connect?: PlanWhereUniqueInput
  }

  export type OrganizationCreateNestedOneWithoutUsersInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationCreateNestedManyWithoutOwnerInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput> | OrganizationCreateWithoutOwnerInput[] | OrganizationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput | OrganizationCreateOrConnectWithoutOwnerInput[]
    createMany?: OrganizationCreateManyOwnerInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type LinkCreateNestedManyWithoutUserInput = {
    create?: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput> | LinkCreateWithoutUserInput[] | LinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LinkCreateOrConnectWithoutUserInput | LinkCreateOrConnectWithoutUserInput[]
    createMany?: LinkCreateManyUserInputEnvelope
    connect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
  }

  export type OrganizationUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput> | OrganizationCreateWithoutOwnerInput[] | OrganizationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput | OrganizationCreateOrConnectWithoutOwnerInput[]
    createMany?: OrganizationCreateManyOwnerInputEnvelope
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
  }

  export type LinkUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput> | LinkCreateWithoutUserInput[] | LinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LinkCreateOrConnectWithoutUserInput | LinkCreateOrConnectWithoutUserInput[]
    createMany?: LinkCreateManyUserInputEnvelope
    connect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlanUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<PlanCreateWithoutUsersInput, PlanUncheckedCreateWithoutUsersInput>
    connectOrCreate?: PlanCreateOrConnectWithoutUsersInput
    upsert?: PlanUpsertWithoutUsersInput
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutUsersInput, PlanUpdateWithoutUsersInput>, PlanUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateOneWithoutUsersNestedInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    upsert?: OrganizationUpsertWithoutUsersInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutUsersInput, OrganizationUpdateWithoutUsersInput>, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput> | OrganizationCreateWithoutOwnerInput[] | OrganizationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput | OrganizationCreateOrConnectWithoutOwnerInput[]
    upsert?: OrganizationUpsertWithWhereUniqueWithoutOwnerInput | OrganizationUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: OrganizationCreateManyOwnerInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?: OrganizationUpdateWithWhereUniqueWithoutOwnerInput | OrganizationUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: OrganizationUpdateManyWithWhereWithoutOwnerInput | OrganizationUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type LinkUpdateManyWithoutUserNestedInput = {
    create?: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput> | LinkCreateWithoutUserInput[] | LinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LinkCreateOrConnectWithoutUserInput | LinkCreateOrConnectWithoutUserInput[]
    upsert?: LinkUpsertWithWhereUniqueWithoutUserInput | LinkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LinkCreateManyUserInputEnvelope
    set?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    disconnect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    delete?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    connect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    update?: LinkUpdateWithWhereUniqueWithoutUserInput | LinkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LinkUpdateManyWithWhereWithoutUserInput | LinkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LinkScalarWhereInput | LinkScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type OrganizationUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput> | OrganizationCreateWithoutOwnerInput[] | OrganizationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: OrganizationCreateOrConnectWithoutOwnerInput | OrganizationCreateOrConnectWithoutOwnerInput[]
    upsert?: OrganizationUpsertWithWhereUniqueWithoutOwnerInput | OrganizationUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: OrganizationCreateManyOwnerInputEnvelope
    set?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    disconnect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    delete?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    connect?: OrganizationWhereUniqueInput | OrganizationWhereUniqueInput[]
    update?: OrganizationUpdateWithWhereUniqueWithoutOwnerInput | OrganizationUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: OrganizationUpdateManyWithWhereWithoutOwnerInput | OrganizationUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
  }

  export type LinkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput> | LinkCreateWithoutUserInput[] | LinkUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LinkCreateOrConnectWithoutUserInput | LinkCreateOrConnectWithoutUserInput[]
    upsert?: LinkUpsertWithWhereUniqueWithoutUserInput | LinkUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LinkCreateManyUserInputEnvelope
    set?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    disconnect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    delete?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    connect?: LinkWhereUniqueInput | LinkWhereUniqueInput[]
    update?: LinkUpdateWithWhereUniqueWithoutUserInput | LinkUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LinkUpdateManyWithWhereWithoutUserInput | LinkUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LinkScalarWhereInput | LinkScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOwnedOrganizationsInput = {
    create?: XOR<UserCreateWithoutOwnedOrganizationsInput, UserUncheckedCreateWithoutOwnedOrganizationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedOrganizationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DomainCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<DomainCreateWithoutOrganizationInput, DomainUncheckedCreateWithoutOrganizationInput> | DomainCreateWithoutOrganizationInput[] | DomainUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutOrganizationInput | DomainCreateOrConnectWithoutOrganizationInput[]
    createMany?: DomainCreateManyOrganizationInputEnvelope
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DomainUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<DomainCreateWithoutOrganizationInput, DomainUncheckedCreateWithoutOrganizationInput> | DomainCreateWithoutOrganizationInput[] | DomainUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutOrganizationInput | DomainCreateOrConnectWithoutOrganizationInput[]
    createMany?: DomainCreateManyOrganizationInputEnvelope
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type UserUpdateOneRequiredWithoutOwnedOrganizationsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedOrganizationsInput, UserUncheckedCreateWithoutOwnedOrganizationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedOrganizationsInput
    upsert?: UserUpsertWithoutOwnedOrganizationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedOrganizationsInput, UserUpdateWithoutOwnedOrganizationsInput>, UserUncheckedUpdateWithoutOwnedOrganizationsInput>
  }

  export type UserUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DomainUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<DomainCreateWithoutOrganizationInput, DomainUncheckedCreateWithoutOrganizationInput> | DomainCreateWithoutOrganizationInput[] | DomainUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutOrganizationInput | DomainCreateOrConnectWithoutOrganizationInput[]
    upsert?: DomainUpsertWithWhereUniqueWithoutOrganizationInput | DomainUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: DomainCreateManyOrganizationInputEnvelope
    set?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    disconnect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    delete?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    update?: DomainUpdateWithWhereUniqueWithoutOrganizationInput | DomainUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: DomainUpdateManyWithWhereWithoutOrganizationInput | DomainUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: DomainScalarWhereInput | DomainScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DomainUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<DomainCreateWithoutOrganizationInput, DomainUncheckedCreateWithoutOrganizationInput> | DomainCreateWithoutOrganizationInput[] | DomainUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: DomainCreateOrConnectWithoutOrganizationInput | DomainCreateOrConnectWithoutOrganizationInput[]
    upsert?: DomainUpsertWithWhereUniqueWithoutOrganizationInput | DomainUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: DomainCreateManyOrganizationInputEnvelope
    set?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    disconnect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    delete?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    connect?: DomainWhereUniqueInput | DomainWhereUniqueInput[]
    update?: DomainUpdateWithWhereUniqueWithoutOrganizationInput | DomainUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: DomainUpdateManyWithWhereWithoutOrganizationInput | DomainUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: DomainScalarWhereInput | DomainScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutDomainsInput = {
    create?: XOR<OrganizationCreateWithoutDomainsInput, OrganizationUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutDomainsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrganizationUpdateOneRequiredWithoutDomainsNestedInput = {
    create?: XOR<OrganizationCreateWithoutDomainsInput, OrganizationUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutDomainsInput
    upsert?: OrganizationUpsertWithoutDomainsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutDomainsInput, OrganizationUpdateWithoutDomainsInput>, OrganizationUncheckedUpdateWithoutDomainsInput>
  }

  export type UserCreateNestedManyWithoutPlanTierInput = {
    create?: XOR<UserCreateWithoutPlanTierInput, UserUncheckedCreateWithoutPlanTierInput> | UserCreateWithoutPlanTierInput[] | UserUncheckedCreateWithoutPlanTierInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPlanTierInput | UserCreateOrConnectWithoutPlanTierInput[]
    createMany?: UserCreateManyPlanTierInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutPlanTierInput = {
    create?: XOR<UserCreateWithoutPlanTierInput, UserUncheckedCreateWithoutPlanTierInput> | UserCreateWithoutPlanTierInput[] | UserUncheckedCreateWithoutPlanTierInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPlanTierInput | UserCreateOrConnectWithoutPlanTierInput[]
    createMany?: UserCreateManyPlanTierInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateManyWithoutPlanTierNestedInput = {
    create?: XOR<UserCreateWithoutPlanTierInput, UserUncheckedCreateWithoutPlanTierInput> | UserCreateWithoutPlanTierInput[] | UserUncheckedCreateWithoutPlanTierInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPlanTierInput | UserCreateOrConnectWithoutPlanTierInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutPlanTierInput | UserUpsertWithWhereUniqueWithoutPlanTierInput[]
    createMany?: UserCreateManyPlanTierInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutPlanTierInput | UserUpdateWithWhereUniqueWithoutPlanTierInput[]
    updateMany?: UserUpdateManyWithWhereWithoutPlanTierInput | UserUpdateManyWithWhereWithoutPlanTierInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutPlanTierNestedInput = {
    create?: XOR<UserCreateWithoutPlanTierInput, UserUncheckedCreateWithoutPlanTierInput> | UserCreateWithoutPlanTierInput[] | UserUncheckedCreateWithoutPlanTierInput[]
    connectOrCreate?: UserCreateOrConnectWithoutPlanTierInput | UserCreateOrConnectWithoutPlanTierInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutPlanTierInput | UserUpsertWithWhereUniqueWithoutPlanTierInput[]
    createMany?: UserCreateManyPlanTierInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutPlanTierInput | UserUpdateWithWhereUniqueWithoutPlanTierInput[]
    updateMany?: UserUpdateManyWithWhereWithoutPlanTierInput | UserUpdateManyWithWhereWithoutPlanTierInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type LinkCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutLinksInput = {
    create?: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLinksInput
    connect?: UserWhereUniqueInput
  }

  export type QrCodeCreateNestedManyWithoutLinkInput = {
    create?: XOR<QrCodeCreateWithoutLinkInput, QrCodeUncheckedCreateWithoutLinkInput> | QrCodeCreateWithoutLinkInput[] | QrCodeUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: QrCodeCreateOrConnectWithoutLinkInput | QrCodeCreateOrConnectWithoutLinkInput[]
    createMany?: QrCodeCreateManyLinkInputEnvelope
    connect?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
  }

  export type ClicksAnalyticsCreateNestedManyWithoutLinkInput = {
    create?: XOR<ClicksAnalyticsCreateWithoutLinkInput, ClicksAnalyticsUncheckedCreateWithoutLinkInput> | ClicksAnalyticsCreateWithoutLinkInput[] | ClicksAnalyticsUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: ClicksAnalyticsCreateOrConnectWithoutLinkInput | ClicksAnalyticsCreateOrConnectWithoutLinkInput[]
    createMany?: ClicksAnalyticsCreateManyLinkInputEnvelope
    connect?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
  }

  export type QrCodeUncheckedCreateNestedManyWithoutLinkInput = {
    create?: XOR<QrCodeCreateWithoutLinkInput, QrCodeUncheckedCreateWithoutLinkInput> | QrCodeCreateWithoutLinkInput[] | QrCodeUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: QrCodeCreateOrConnectWithoutLinkInput | QrCodeCreateOrConnectWithoutLinkInput[]
    createMany?: QrCodeCreateManyLinkInputEnvelope
    connect?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
  }

  export type ClicksAnalyticsUncheckedCreateNestedManyWithoutLinkInput = {
    create?: XOR<ClicksAnalyticsCreateWithoutLinkInput, ClicksAnalyticsUncheckedCreateWithoutLinkInput> | ClicksAnalyticsCreateWithoutLinkInput[] | ClicksAnalyticsUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: ClicksAnalyticsCreateOrConnectWithoutLinkInput | ClicksAnalyticsCreateOrConnectWithoutLinkInput[]
    createMany?: ClicksAnalyticsCreateManyLinkInputEnvelope
    connect?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
  }

  export type LinkUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutLinksNestedInput = {
    create?: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    connectOrCreate?: UserCreateOrConnectWithoutLinksInput
    upsert?: UserUpsertWithoutLinksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLinksInput, UserUpdateWithoutLinksInput>, UserUncheckedUpdateWithoutLinksInput>
  }

  export type QrCodeUpdateManyWithoutLinkNestedInput = {
    create?: XOR<QrCodeCreateWithoutLinkInput, QrCodeUncheckedCreateWithoutLinkInput> | QrCodeCreateWithoutLinkInput[] | QrCodeUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: QrCodeCreateOrConnectWithoutLinkInput | QrCodeCreateOrConnectWithoutLinkInput[]
    upsert?: QrCodeUpsertWithWhereUniqueWithoutLinkInput | QrCodeUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: QrCodeCreateManyLinkInputEnvelope
    set?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
    disconnect?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
    delete?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
    connect?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
    update?: QrCodeUpdateWithWhereUniqueWithoutLinkInput | QrCodeUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: QrCodeUpdateManyWithWhereWithoutLinkInput | QrCodeUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: QrCodeScalarWhereInput | QrCodeScalarWhereInput[]
  }

  export type ClicksAnalyticsUpdateManyWithoutLinkNestedInput = {
    create?: XOR<ClicksAnalyticsCreateWithoutLinkInput, ClicksAnalyticsUncheckedCreateWithoutLinkInput> | ClicksAnalyticsCreateWithoutLinkInput[] | ClicksAnalyticsUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: ClicksAnalyticsCreateOrConnectWithoutLinkInput | ClicksAnalyticsCreateOrConnectWithoutLinkInput[]
    upsert?: ClicksAnalyticsUpsertWithWhereUniqueWithoutLinkInput | ClicksAnalyticsUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: ClicksAnalyticsCreateManyLinkInputEnvelope
    set?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
    disconnect?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
    delete?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
    connect?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
    update?: ClicksAnalyticsUpdateWithWhereUniqueWithoutLinkInput | ClicksAnalyticsUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: ClicksAnalyticsUpdateManyWithWhereWithoutLinkInput | ClicksAnalyticsUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: ClicksAnalyticsScalarWhereInput | ClicksAnalyticsScalarWhereInput[]
  }

  export type QrCodeUncheckedUpdateManyWithoutLinkNestedInput = {
    create?: XOR<QrCodeCreateWithoutLinkInput, QrCodeUncheckedCreateWithoutLinkInput> | QrCodeCreateWithoutLinkInput[] | QrCodeUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: QrCodeCreateOrConnectWithoutLinkInput | QrCodeCreateOrConnectWithoutLinkInput[]
    upsert?: QrCodeUpsertWithWhereUniqueWithoutLinkInput | QrCodeUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: QrCodeCreateManyLinkInputEnvelope
    set?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
    disconnect?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
    delete?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
    connect?: QrCodeWhereUniqueInput | QrCodeWhereUniqueInput[]
    update?: QrCodeUpdateWithWhereUniqueWithoutLinkInput | QrCodeUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: QrCodeUpdateManyWithWhereWithoutLinkInput | QrCodeUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: QrCodeScalarWhereInput | QrCodeScalarWhereInput[]
  }

  export type ClicksAnalyticsUncheckedUpdateManyWithoutLinkNestedInput = {
    create?: XOR<ClicksAnalyticsCreateWithoutLinkInput, ClicksAnalyticsUncheckedCreateWithoutLinkInput> | ClicksAnalyticsCreateWithoutLinkInput[] | ClicksAnalyticsUncheckedCreateWithoutLinkInput[]
    connectOrCreate?: ClicksAnalyticsCreateOrConnectWithoutLinkInput | ClicksAnalyticsCreateOrConnectWithoutLinkInput[]
    upsert?: ClicksAnalyticsUpsertWithWhereUniqueWithoutLinkInput | ClicksAnalyticsUpsertWithWhereUniqueWithoutLinkInput[]
    createMany?: ClicksAnalyticsCreateManyLinkInputEnvelope
    set?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
    disconnect?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
    delete?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
    connect?: ClicksAnalyticsWhereUniqueInput | ClicksAnalyticsWhereUniqueInput[]
    update?: ClicksAnalyticsUpdateWithWhereUniqueWithoutLinkInput | ClicksAnalyticsUpdateWithWhereUniqueWithoutLinkInput[]
    updateMany?: ClicksAnalyticsUpdateManyWithWhereWithoutLinkInput | ClicksAnalyticsUpdateManyWithWhereWithoutLinkInput[]
    deleteMany?: ClicksAnalyticsScalarWhereInput | ClicksAnalyticsScalarWhereInput[]
  }

  export type LinkCreateNestedOneWithoutQrCodesInput = {
    create?: XOR<LinkCreateWithoutQrCodesInput, LinkUncheckedCreateWithoutQrCodesInput>
    connectOrCreate?: LinkCreateOrConnectWithoutQrCodesInput
    connect?: LinkWhereUniqueInput
  }

  export type LinkUpdateOneRequiredWithoutQrCodesNestedInput = {
    create?: XOR<LinkCreateWithoutQrCodesInput, LinkUncheckedCreateWithoutQrCodesInput>
    connectOrCreate?: LinkCreateOrConnectWithoutQrCodesInput
    upsert?: LinkUpsertWithoutQrCodesInput
    connect?: LinkWhereUniqueInput
    update?: XOR<XOR<LinkUpdateToOneWithWhereWithoutQrCodesInput, LinkUpdateWithoutQrCodesInput>, LinkUncheckedUpdateWithoutQrCodesInput>
  }

  export type LinkCreateNestedOneWithoutClicksAnalyticsInput = {
    create?: XOR<LinkCreateWithoutClicksAnalyticsInput, LinkUncheckedCreateWithoutClicksAnalyticsInput>
    connectOrCreate?: LinkCreateOrConnectWithoutClicksAnalyticsInput
    connect?: LinkWhereUniqueInput
  }

  export type LinkUpdateOneRequiredWithoutClicksAnalyticsNestedInput = {
    create?: XOR<LinkCreateWithoutClicksAnalyticsInput, LinkUncheckedCreateWithoutClicksAnalyticsInput>
    connectOrCreate?: LinkCreateOrConnectWithoutClicksAnalyticsInput
    upsert?: LinkUpsertWithoutClicksAnalyticsInput
    connect?: LinkWhereUniqueInput
    update?: XOR<XOR<LinkUpdateToOneWithWhereWithoutClicksAnalyticsInput, LinkUpdateWithoutClicksAnalyticsInput>, LinkUncheckedUpdateWithoutClicksAnalyticsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PlanCreateWithoutUsersInput = {
    id?: string
    tierName: string
    publicName: string
    monthlyLinks: number
    monthlyQrCodes: number
    maxOrganizations?: number
    price?: number
    createdAt?: Date | string
  }

  export type PlanUncheckedCreateWithoutUsersInput = {
    id?: string
    tierName: string
    publicName: string
    monthlyLinks: number
    monthlyQrCodes: number
    maxOrganizations?: number
    price?: number
    createdAt?: Date | string
  }

  export type PlanCreateOrConnectWithoutUsersInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutUsersInput, PlanUncheckedCreateWithoutUsersInput>
  }

  export type OrganizationCreateWithoutUsersInput = {
    id?: string
    name: string
    status?: $Enums.Status
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedOrganizationsInput
    domains?: DomainCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    status?: $Enums.Status
    ownerId: string
    createdAt?: Date | string
    domains?: DomainUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutUsersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
  }

  export type OrganizationCreateWithoutOwnerInput = {
    id?: string
    name: string
    status?: $Enums.Status
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
    domains?: DomainCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    status?: $Enums.Status
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
    domains?: DomainUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutOwnerInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
  }

  export type OrganizationCreateManyOwnerInputEnvelope = {
    data: OrganizationCreateManyOwnerInput | OrganizationCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type LinkCreateWithoutUserInput = {
    id?: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
    qrCodes?: QrCodeCreateNestedManyWithoutLinkInput
    clicksAnalytics?: ClicksAnalyticsCreateNestedManyWithoutLinkInput
  }

  export type LinkUncheckedCreateWithoutUserInput = {
    id?: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
    qrCodes?: QrCodeUncheckedCreateNestedManyWithoutLinkInput
    clicksAnalytics?: ClicksAnalyticsUncheckedCreateNestedManyWithoutLinkInput
  }

  export type LinkCreateOrConnectWithoutUserInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput>
  }

  export type LinkCreateManyUserInputEnvelope = {
    data: LinkCreateManyUserInput | LinkCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PlanUpsertWithoutUsersInput = {
    update: XOR<PlanUpdateWithoutUsersInput, PlanUncheckedUpdateWithoutUsersInput>
    create: XOR<PlanCreateWithoutUsersInput, PlanUncheckedCreateWithoutUsersInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutUsersInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutUsersInput, PlanUncheckedUpdateWithoutUsersInput>
  }

  export type PlanUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    tierName?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    monthlyLinks?: IntFieldUpdateOperationsInput | number
    monthlyQrCodes?: IntFieldUpdateOperationsInput | number
    maxOrganizations?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    tierName?: StringFieldUpdateOperationsInput | string
    publicName?: StringFieldUpdateOperationsInput | string
    monthlyLinks?: IntFieldUpdateOperationsInput | number
    monthlyQrCodes?: IntFieldUpdateOperationsInput | number
    maxOrganizations?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUpsertWithoutUsersInput = {
    update: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutUsersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedOrganizationsNestedInput
    domains?: DomainUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    domains?: DomainUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUpsertWithWhereUniqueWithoutOwnerInput = {
    where: OrganizationWhereUniqueInput
    update: XOR<OrganizationUpdateWithoutOwnerInput, OrganizationUncheckedUpdateWithoutOwnerInput>
    create: XOR<OrganizationCreateWithoutOwnerInput, OrganizationUncheckedCreateWithoutOwnerInput>
  }

  export type OrganizationUpdateWithWhereUniqueWithoutOwnerInput = {
    where: OrganizationWhereUniqueInput
    data: XOR<OrganizationUpdateWithoutOwnerInput, OrganizationUncheckedUpdateWithoutOwnerInput>
  }

  export type OrganizationUpdateManyWithWhereWithoutOwnerInput = {
    where: OrganizationScalarWhereInput
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyWithoutOwnerInput>
  }

  export type OrganizationScalarWhereInput = {
    AND?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    OR?: OrganizationScalarWhereInput[]
    NOT?: OrganizationScalarWhereInput | OrganizationScalarWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    status?: EnumStatusFilter<"Organization"> | $Enums.Status
    ownerId?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
  }

  export type LinkUpsertWithWhereUniqueWithoutUserInput = {
    where: LinkWhereUniqueInput
    update: XOR<LinkUpdateWithoutUserInput, LinkUncheckedUpdateWithoutUserInput>
    create: XOR<LinkCreateWithoutUserInput, LinkUncheckedCreateWithoutUserInput>
  }

  export type LinkUpdateWithWhereUniqueWithoutUserInput = {
    where: LinkWhereUniqueInput
    data: XOR<LinkUpdateWithoutUserInput, LinkUncheckedUpdateWithoutUserInput>
  }

  export type LinkUpdateManyWithWhereWithoutUserInput = {
    where: LinkScalarWhereInput
    data: XOR<LinkUpdateManyMutationInput, LinkUncheckedUpdateManyWithoutUserInput>
  }

  export type LinkScalarWhereInput = {
    AND?: LinkScalarWhereInput | LinkScalarWhereInput[]
    OR?: LinkScalarWhereInput[]
    NOT?: LinkScalarWhereInput | LinkScalarWhereInput[]
    id?: StringFilter<"Link"> | string
    userId?: StringFilter<"Link"> | string
    originalUrl?: StringFilter<"Link"> | string
    domain?: StringFilter<"Link"> | string
    shortSlug?: StringFilter<"Link"> | string
    title?: StringNullableFilter<"Link"> | string | null
    tags?: StringNullableListFilter<"Link">
    status?: EnumStatusFilter<"Link"> | $Enums.Status
    createdAt?: DateTimeFilter<"Link"> | Date | string
  }

  export type UserCreateWithoutOwnedOrganizationsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    plan?: string
    createdAt?: Date | string
    planTier: PlanCreateNestedOneWithoutUsersInput
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    links?: LinkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwnedOrganizationsInput = {
    id?: string
    email: string
    role?: $Enums.Role
    planId: string
    plan?: string
    organizationId?: string | null
    createdAt?: Date | string
    links?: LinkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwnedOrganizationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedOrganizationsInput, UserUncheckedCreateWithoutOwnedOrganizationsInput>
  }

  export type UserCreateWithoutOrganizationInput = {
    id?: string
    email: string
    role?: $Enums.Role
    plan?: string
    createdAt?: Date | string
    planTier: PlanCreateNestedOneWithoutUsersInput
    ownedOrganizations?: OrganizationCreateNestedManyWithoutOwnerInput
    links?: LinkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationInput = {
    id?: string
    email: string
    role?: $Enums.Role
    planId: string
    plan?: string
    createdAt?: Date | string
    ownedOrganizations?: OrganizationUncheckedCreateNestedManyWithoutOwnerInput
    links?: LinkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserCreateManyOrganizationInputEnvelope = {
    data: UserCreateManyOrganizationInput | UserCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type DomainCreateWithoutOrganizationInput = {
    id?: string
    hostname: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type DomainUncheckedCreateWithoutOrganizationInput = {
    id?: string
    hostname: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type DomainCreateOrConnectWithoutOrganizationInput = {
    where: DomainWhereUniqueInput
    create: XOR<DomainCreateWithoutOrganizationInput, DomainUncheckedCreateWithoutOrganizationInput>
  }

  export type DomainCreateManyOrganizationInputEnvelope = {
    data: DomainCreateManyOrganizationInput | DomainCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOwnedOrganizationsInput = {
    update: XOR<UserUpdateWithoutOwnedOrganizationsInput, UserUncheckedUpdateWithoutOwnedOrganizationsInput>
    create: XOR<UserCreateWithoutOwnedOrganizationsInput, UserUncheckedCreateWithoutOwnedOrganizationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedOrganizationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedOrganizationsInput, UserUncheckedUpdateWithoutOwnedOrganizationsInput>
  }

  export type UserUpdateWithoutOwnedOrganizationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    planTier?: PlanUpdateOneRequiredWithoutUsersNestedInput
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    links?: LinkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedOrganizationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    planId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    links?: LinkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    planId?: StringFilter<"User"> | string
    plan?: StringFilter<"User"> | string
    organizationId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type DomainUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: DomainWhereUniqueInput
    update: XOR<DomainUpdateWithoutOrganizationInput, DomainUncheckedUpdateWithoutOrganizationInput>
    create: XOR<DomainCreateWithoutOrganizationInput, DomainUncheckedCreateWithoutOrganizationInput>
  }

  export type DomainUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: DomainWhereUniqueInput
    data: XOR<DomainUpdateWithoutOrganizationInput, DomainUncheckedUpdateWithoutOrganizationInput>
  }

  export type DomainUpdateManyWithWhereWithoutOrganizationInput = {
    where: DomainScalarWhereInput
    data: XOR<DomainUpdateManyMutationInput, DomainUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type DomainScalarWhereInput = {
    AND?: DomainScalarWhereInput | DomainScalarWhereInput[]
    OR?: DomainScalarWhereInput[]
    NOT?: DomainScalarWhereInput | DomainScalarWhereInput[]
    id?: StringFilter<"Domain"> | string
    hostname?: StringFilter<"Domain"> | string
    organizationId?: StringFilter<"Domain"> | string
    verified?: BoolFilter<"Domain"> | boolean
    createdAt?: DateTimeFilter<"Domain"> | Date | string
  }

  export type OrganizationCreateWithoutDomainsInput = {
    id?: string
    name: string
    status?: $Enums.Status
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutOwnedOrganizationsInput
    users?: UserCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateWithoutDomainsInput = {
    id?: string
    name: string
    status?: $Enums.Status
    ownerId: string
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationCreateOrConnectWithoutDomainsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutDomainsInput, OrganizationUncheckedCreateWithoutDomainsInput>
  }

  export type OrganizationUpsertWithoutDomainsInput = {
    update: XOR<OrganizationUpdateWithoutDomainsInput, OrganizationUncheckedUpdateWithoutDomainsInput>
    create: XOR<OrganizationCreateWithoutDomainsInput, OrganizationUncheckedCreateWithoutDomainsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutDomainsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutDomainsInput, OrganizationUncheckedUpdateWithoutDomainsInput>
  }

  export type OrganizationUpdateWithoutDomainsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutOwnedOrganizationsNestedInput
    users?: UserUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutDomainsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    ownerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type UserCreateWithoutPlanTierInput = {
    id?: string
    email: string
    role?: $Enums.Role
    plan?: string
    createdAt?: Date | string
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    ownedOrganizations?: OrganizationCreateNestedManyWithoutOwnerInput
    links?: LinkCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPlanTierInput = {
    id?: string
    email: string
    role?: $Enums.Role
    plan?: string
    organizationId?: string | null
    createdAt?: Date | string
    ownedOrganizations?: OrganizationUncheckedCreateNestedManyWithoutOwnerInput
    links?: LinkUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPlanTierInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlanTierInput, UserUncheckedCreateWithoutPlanTierInput>
  }

  export type UserCreateManyPlanTierInputEnvelope = {
    data: UserCreateManyPlanTierInput | UserCreateManyPlanTierInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutPlanTierInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutPlanTierInput, UserUncheckedUpdateWithoutPlanTierInput>
    create: XOR<UserCreateWithoutPlanTierInput, UserUncheckedCreateWithoutPlanTierInput>
  }

  export type UserUpdateWithWhereUniqueWithoutPlanTierInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutPlanTierInput, UserUncheckedUpdateWithoutPlanTierInput>
  }

  export type UserUpdateManyWithWhereWithoutPlanTierInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutPlanTierInput>
  }

  export type UserCreateWithoutLinksInput = {
    id?: string
    email: string
    role?: $Enums.Role
    plan?: string
    createdAt?: Date | string
    planTier: PlanCreateNestedOneWithoutUsersInput
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    ownedOrganizations?: OrganizationCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutLinksInput = {
    id?: string
    email: string
    role?: $Enums.Role
    planId: string
    plan?: string
    organizationId?: string | null
    createdAt?: Date | string
    ownedOrganizations?: OrganizationUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutLinksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
  }

  export type QrCodeCreateWithoutLinkInput = {
    id?: string
    designConfig: JsonNullValueInput | InputJsonValue
    imageUrl: string
  }

  export type QrCodeUncheckedCreateWithoutLinkInput = {
    id?: string
    designConfig: JsonNullValueInput | InputJsonValue
    imageUrl: string
  }

  export type QrCodeCreateOrConnectWithoutLinkInput = {
    where: QrCodeWhereUniqueInput
    create: XOR<QrCodeCreateWithoutLinkInput, QrCodeUncheckedCreateWithoutLinkInput>
  }

  export type QrCodeCreateManyLinkInputEnvelope = {
    data: QrCodeCreateManyLinkInput | QrCodeCreateManyLinkInput[]
    skipDuplicates?: boolean
  }

  export type ClicksAnalyticsCreateWithoutLinkInput = {
    id?: string
    clickedAt?: Date | string
    ip?: string | null
    isQr?: boolean
    country?: string | null
    device?: string | null
    referrer?: string | null
  }

  export type ClicksAnalyticsUncheckedCreateWithoutLinkInput = {
    id?: string
    clickedAt?: Date | string
    ip?: string | null
    isQr?: boolean
    country?: string | null
    device?: string | null
    referrer?: string | null
  }

  export type ClicksAnalyticsCreateOrConnectWithoutLinkInput = {
    where: ClicksAnalyticsWhereUniqueInput
    create: XOR<ClicksAnalyticsCreateWithoutLinkInput, ClicksAnalyticsUncheckedCreateWithoutLinkInput>
  }

  export type ClicksAnalyticsCreateManyLinkInputEnvelope = {
    data: ClicksAnalyticsCreateManyLinkInput | ClicksAnalyticsCreateManyLinkInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutLinksInput = {
    update: XOR<UserUpdateWithoutLinksInput, UserUncheckedUpdateWithoutLinksInput>
    create: XOR<UserCreateWithoutLinksInput, UserUncheckedCreateWithoutLinksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLinksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLinksInput, UserUncheckedUpdateWithoutLinksInput>
  }

  export type UserUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    planTier?: PlanUpdateOneRequiredWithoutUsersNestedInput
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    ownedOrganizations?: OrganizationUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    planId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedOrganizations?: OrganizationUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type QrCodeUpsertWithWhereUniqueWithoutLinkInput = {
    where: QrCodeWhereUniqueInput
    update: XOR<QrCodeUpdateWithoutLinkInput, QrCodeUncheckedUpdateWithoutLinkInput>
    create: XOR<QrCodeCreateWithoutLinkInput, QrCodeUncheckedCreateWithoutLinkInput>
  }

  export type QrCodeUpdateWithWhereUniqueWithoutLinkInput = {
    where: QrCodeWhereUniqueInput
    data: XOR<QrCodeUpdateWithoutLinkInput, QrCodeUncheckedUpdateWithoutLinkInput>
  }

  export type QrCodeUpdateManyWithWhereWithoutLinkInput = {
    where: QrCodeScalarWhereInput
    data: XOR<QrCodeUpdateManyMutationInput, QrCodeUncheckedUpdateManyWithoutLinkInput>
  }

  export type QrCodeScalarWhereInput = {
    AND?: QrCodeScalarWhereInput | QrCodeScalarWhereInput[]
    OR?: QrCodeScalarWhereInput[]
    NOT?: QrCodeScalarWhereInput | QrCodeScalarWhereInput[]
    id?: StringFilter<"QrCode"> | string
    linkId?: StringFilter<"QrCode"> | string
    designConfig?: JsonFilter<"QrCode">
    imageUrl?: StringFilter<"QrCode"> | string
  }

  export type ClicksAnalyticsUpsertWithWhereUniqueWithoutLinkInput = {
    where: ClicksAnalyticsWhereUniqueInput
    update: XOR<ClicksAnalyticsUpdateWithoutLinkInput, ClicksAnalyticsUncheckedUpdateWithoutLinkInput>
    create: XOR<ClicksAnalyticsCreateWithoutLinkInput, ClicksAnalyticsUncheckedCreateWithoutLinkInput>
  }

  export type ClicksAnalyticsUpdateWithWhereUniqueWithoutLinkInput = {
    where: ClicksAnalyticsWhereUniqueInput
    data: XOR<ClicksAnalyticsUpdateWithoutLinkInput, ClicksAnalyticsUncheckedUpdateWithoutLinkInput>
  }

  export type ClicksAnalyticsUpdateManyWithWhereWithoutLinkInput = {
    where: ClicksAnalyticsScalarWhereInput
    data: XOR<ClicksAnalyticsUpdateManyMutationInput, ClicksAnalyticsUncheckedUpdateManyWithoutLinkInput>
  }

  export type ClicksAnalyticsScalarWhereInput = {
    AND?: ClicksAnalyticsScalarWhereInput | ClicksAnalyticsScalarWhereInput[]
    OR?: ClicksAnalyticsScalarWhereInput[]
    NOT?: ClicksAnalyticsScalarWhereInput | ClicksAnalyticsScalarWhereInput[]
    id?: StringFilter<"ClicksAnalytics"> | string
    linkId?: StringFilter<"ClicksAnalytics"> | string
    clickedAt?: DateTimeFilter<"ClicksAnalytics"> | Date | string
    ip?: StringNullableFilter<"ClicksAnalytics"> | string | null
    isQr?: BoolFilter<"ClicksAnalytics"> | boolean
    country?: StringNullableFilter<"ClicksAnalytics"> | string | null
    device?: StringNullableFilter<"ClicksAnalytics"> | string | null
    referrer?: StringNullableFilter<"ClicksAnalytics"> | string | null
  }

  export type LinkCreateWithoutQrCodesInput = {
    id?: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLinksInput
    clicksAnalytics?: ClicksAnalyticsCreateNestedManyWithoutLinkInput
  }

  export type LinkUncheckedCreateWithoutQrCodesInput = {
    id?: string
    userId: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
    clicksAnalytics?: ClicksAnalyticsUncheckedCreateNestedManyWithoutLinkInput
  }

  export type LinkCreateOrConnectWithoutQrCodesInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutQrCodesInput, LinkUncheckedCreateWithoutQrCodesInput>
  }

  export type LinkUpsertWithoutQrCodesInput = {
    update: XOR<LinkUpdateWithoutQrCodesInput, LinkUncheckedUpdateWithoutQrCodesInput>
    create: XOR<LinkCreateWithoutQrCodesInput, LinkUncheckedCreateWithoutQrCodesInput>
    where?: LinkWhereInput
  }

  export type LinkUpdateToOneWithWhereWithoutQrCodesInput = {
    where?: LinkWhereInput
    data: XOR<LinkUpdateWithoutQrCodesInput, LinkUncheckedUpdateWithoutQrCodesInput>
  }

  export type LinkUpdateWithoutQrCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLinksNestedInput
    clicksAnalytics?: ClicksAnalyticsUpdateManyWithoutLinkNestedInput
  }

  export type LinkUncheckedUpdateWithoutQrCodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clicksAnalytics?: ClicksAnalyticsUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type LinkCreateWithoutClicksAnalyticsInput = {
    id?: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutLinksInput
    qrCodes?: QrCodeCreateNestedManyWithoutLinkInput
  }

  export type LinkUncheckedCreateWithoutClicksAnalyticsInput = {
    id?: string
    userId: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
    qrCodes?: QrCodeUncheckedCreateNestedManyWithoutLinkInput
  }

  export type LinkCreateOrConnectWithoutClicksAnalyticsInput = {
    where: LinkWhereUniqueInput
    create: XOR<LinkCreateWithoutClicksAnalyticsInput, LinkUncheckedCreateWithoutClicksAnalyticsInput>
  }

  export type LinkUpsertWithoutClicksAnalyticsInput = {
    update: XOR<LinkUpdateWithoutClicksAnalyticsInput, LinkUncheckedUpdateWithoutClicksAnalyticsInput>
    create: XOR<LinkCreateWithoutClicksAnalyticsInput, LinkUncheckedCreateWithoutClicksAnalyticsInput>
    where?: LinkWhereInput
  }

  export type LinkUpdateToOneWithWhereWithoutClicksAnalyticsInput = {
    where?: LinkWhereInput
    data: XOR<LinkUpdateWithoutClicksAnalyticsInput, LinkUncheckedUpdateWithoutClicksAnalyticsInput>
  }

  export type LinkUpdateWithoutClicksAnalyticsInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLinksNestedInput
    qrCodes?: QrCodeUpdateManyWithoutLinkNestedInput
  }

  export type LinkUncheckedUpdateWithoutClicksAnalyticsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrCodes?: QrCodeUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type OrganizationCreateManyOwnerInput = {
    id?: string
    name: string
    status?: $Enums.Status
    createdAt?: Date | string
  }

  export type LinkCreateManyUserInput = {
    id?: string
    originalUrl: string
    domain?: string
    shortSlug: string
    title?: string | null
    tags?: LinkCreatetagsInput | string[]
    status?: $Enums.Status
    createdAt?: Date | string
  }

  export type OrganizationUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
    domains?: DomainUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
    domains?: DomainUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LinkUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrCodes?: QrCodeUpdateManyWithoutLinkNestedInput
    clicksAnalytics?: ClicksAnalyticsUpdateManyWithoutLinkNestedInput
  }

  export type LinkUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    qrCodes?: QrCodeUncheckedUpdateManyWithoutLinkNestedInput
    clicksAnalytics?: ClicksAnalyticsUncheckedUpdateManyWithoutLinkNestedInput
  }

  export type LinkUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalUrl?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    shortSlug?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: LinkUpdatetagsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyOrganizationInput = {
    id?: string
    email: string
    role?: $Enums.Role
    planId: string
    plan?: string
    createdAt?: Date | string
  }

  export type DomainCreateManyOrganizationInput = {
    id?: string
    hostname: string
    verified?: boolean
    createdAt?: Date | string
  }

  export type UserUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    planTier?: PlanUpdateOneRequiredWithoutUsersNestedInput
    ownedOrganizations?: OrganizationUpdateManyWithoutOwnerNestedInput
    links?: LinkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    planId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedOrganizations?: OrganizationUncheckedUpdateManyWithoutOwnerNestedInput
    links?: LinkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    planId?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostname?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostname?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DomainUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hostname?: StringFieldUpdateOperationsInput | string
    verified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyPlanTierInput = {
    id?: string
    email: string
    role?: $Enums.Role
    plan?: string
    organizationId?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateWithoutPlanTierInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    ownedOrganizations?: OrganizationUpdateManyWithoutOwnerNestedInput
    links?: LinkUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPlanTierInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedOrganizations?: OrganizationUncheckedUpdateManyWithoutOwnerNestedInput
    links?: LinkUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutPlanTierInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    plan?: StringFieldUpdateOperationsInput | string
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QrCodeCreateManyLinkInput = {
    id?: string
    designConfig: JsonNullValueInput | InputJsonValue
    imageUrl: string
  }

  export type ClicksAnalyticsCreateManyLinkInput = {
    id?: string
    clickedAt?: Date | string
    ip?: string | null
    isQr?: boolean
    country?: string | null
    device?: string | null
    referrer?: string | null
  }

  export type QrCodeUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    designConfig?: JsonNullValueInput | InputJsonValue
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type QrCodeUncheckedUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    designConfig?: JsonNullValueInput | InputJsonValue
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type QrCodeUncheckedUpdateManyWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    designConfig?: JsonNullValueInput | InputJsonValue
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  export type ClicksAnalyticsUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    clickedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isQr?: BoolFieldUpdateOperationsInput | boolean
    country?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClicksAnalyticsUncheckedUpdateWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    clickedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isQr?: BoolFieldUpdateOperationsInput | boolean
    country?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ClicksAnalyticsUncheckedUpdateManyWithoutLinkInput = {
    id?: StringFieldUpdateOperationsInput | string
    clickedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isQr?: BoolFieldUpdateOperationsInput | boolean
    country?: NullableStringFieldUpdateOperationsInput | string | null
    device?: NullableStringFieldUpdateOperationsInput | string | null
    referrer?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}