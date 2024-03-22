import Express from "express";
import cors from "cors";
import { HttpServerAdapterPort, HttpRouteAdapterPort } from "@/ports/http";
import { DatabaseAdapterPort } from "@/ports/database";
import { Environment } from "@/config/env";

export class ExpressHttpAdapter implements HttpServerAdapterPort {
  private readonly app: Express.Application;
  private readonly httpServerPort: number;

  constructor(
    private readonly routeAdapters: HttpRouteAdapterPort<Express.Router>[],
    private readonly databaseAdapter: DatabaseAdapterPort
  ) {
    this.app = Express();
    this.httpServerPort = Environment.getHttpServerPort();
  }

  execute(): void {
    this.setupDatabase();
    this.setupMiddlewares();
    this.setupRoutes();
    this.app.listen(this.httpServerPort, () => {
      console.log(`Escutando na porta ${this.httpServerPort}`);
    });
  }

  private setupDatabase(): void {
    this.databaseAdapter
      .connect()
      .then(() => console.log("Banco de dados conectado!"))
      .catch((e: any) => console.log("Erro ao conectar ao banco de dados: ", e));
  }

  private setupMiddlewares(): void {
    this.app.use(Express.json());
    this.app.use(cors());
  }

  private setupRoutes(): void {
    this.routeAdapters.map((route: HttpRouteAdapterPort<Express.Router>) => {
      const router = Express.Router();
      route.setup(router);
      this.app.use(`/${route.name}`, router);
    });
  }
}
