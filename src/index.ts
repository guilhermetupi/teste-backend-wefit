import "reflect-metadata";
import "dotenv/config";
import { ExpressHttpServerAdapterFactory } from "./config/factories/http/express/express.factory";

const httpServer = ExpressHttpServerAdapterFactory.create();

httpServer.execute();
