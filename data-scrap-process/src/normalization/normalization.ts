import IHttpHandler from "../interfaces/httpHandler";
import IFunction from "../interfaces/function";
import * as functions from "firebase-functions";


export class Normalization implements IFunction {
  constructor(private httpHandler: IHttpHandler) {}

  public run(): void {
    const {response} = this.httpHandler;

    functions.logger.info("Initialize normalization", {structuredData: true});
    response.send("Normalization");
  }
}
