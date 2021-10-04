import IHttpHandler from "./../interfaces/httpHandler";
import IFunction from "./../interfaces/function";
import * as functions from "firebase-functions";


export class Scrapper implements IFunction {
  constructor(private httpHandler: IHttpHandler) {}

  public run(): void {
    const {response} = this.httpHandler;

    functions.logger.info("Initialize scrapper", {structuredData: true});
    response.send("Scrapper");
  }
}
