import { Request } from "express";

export type ExpressRequest = Request & { userId: string };
