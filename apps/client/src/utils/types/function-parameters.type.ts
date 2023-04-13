/**
 * Casts function arguments to a type for reuse.
 */
export type FunctionParameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P extends [infer F, ...infer _]
    ? F
    : never
  : never;
