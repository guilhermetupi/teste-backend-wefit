export abstract class HttpRouteAdapterPort<T> {
  abstract readonly name: string;

  abstract setup(router: T): void;
}