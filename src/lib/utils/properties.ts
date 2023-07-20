export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

export type GetReadonlyKeys<
  T,
  U extends Readonly<T> = Readonly<T>,
  K extends keyof T = keyof T,
> = K extends keyof T ? (Equal<Pick<T, K>, Pick<U, K>> extends true ? K : never) : never

/**
 * Get only mutable properties of an object.
 * @link https://github.com/type-challenges/type-challenges/issues/139#issue-693821084
 */
export type OnlyMutableProperties<T> = Omit<T, GetReadonlyKeys<T>>
