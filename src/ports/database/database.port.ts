export abstract class DatabaseAdapterPort {
  abstract connect(): Promise<void>;
}
