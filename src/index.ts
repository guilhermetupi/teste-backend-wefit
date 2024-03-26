import "reflect-metadata";
import "dotenv/config";
import { ExpressHttpServerAdapterFactory } from "./config/factories/http/express";

const httpServer = ExpressHttpServerAdapterFactory.create();

httpServer.execute();
