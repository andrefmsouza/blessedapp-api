import { NextFunction } from "express";

export type ExpressAdapterParams = {
  params: Record<string, string>;
  query: Record<string, string>;
  body: any;
  locals: Record<string, any>;
  headers: Record<string, string>;
  nextFunction: NextFunction;
}

export type ExpressAdapterResponse = {
  status: number;
  json: {
    status: boolean;
    data?: any;
    message?: string;
  }
}
