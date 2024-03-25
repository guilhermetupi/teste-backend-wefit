export abstract class MiddlewareHttpPort<
  T = Record<string, any>,
  K = Record<string, any>,
  P = Record<string, any>,
  R = Record<string, any> | void
> {
  abstract execute(req: T, res: K, next: P): Promise<R>;
}
