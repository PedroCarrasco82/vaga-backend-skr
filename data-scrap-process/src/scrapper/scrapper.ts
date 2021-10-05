import IHttpHandler from "./../interfaces/httpHandler";
import IFunction from "./../interfaces/function";
import * as functions from "firebase-functions";
// import {URL} from "url";
// import {mkdirSync, existsSync} from "fs";
import puppeteer from "puppeteer";
import pagesTag from "./tags/pagesTag.json";


export class Scrapper implements IFunction {
  constructor(private httpHandler: IHttpHandler) {}

  public async run(): Promise<void> {
    const {response} = this.httpHandler;

    functions.logger.info("Initialize scrapper", {structuredData: true});
    const data = await this.startScrap();

    response.send(data);
  }

  private async startScrap() {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disabe-setuid-sandbox"],
      });

      const page = await browser.newPage();

      const data = await this.preMainDataScrap(page, pagesTag);

      browser.close();

      return data;
    } catch (err) {
      functions.logger.info(err, {structuredData: true});
      return err;
    }
  }

  private async preMainDataScrap(page: puppeteer.Page, tags: any) {
    await page.goto(tags["baseUrl"], {waitUntil: "networkidle0"});
    const content = await page.content();

    // const selectors: [string] = tags["children"];

    // const items: any[] = await page.evaluate((sel) => {
    //   const ret = [];
    //   for (const item of document.querySelectorAll(sel)) {
    //     ret.push(item);
    //   }
    //   return ret;
    // }, selectors[0]["selector"]);

    return content;
  }
}
