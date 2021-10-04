import IHttpHandler from "../interfaces/httpHandler";
import IFunction from "../interfaces/function";
import * as functions from "firebase-functions";


export class Migration implements IFunction {
  constructor(private httpHandler: IHttpHandler) {}

  public run(): void {
    const {response} = this.httpHandler;

    functions.logger.info("Initialize migration", {structuredData: true});
    response.send("Migration");
  }
}
