import IHttpHandler from "./../interfaces/httpHandler";
import IFunction from "./../interfaces/function";
import * as functions from "firebase-functions";
// import {URL} from "url";
// import {mkdirSync, existsSync} from "fs";
import puppeteer from "puppeteer";
import searchPageTag from "./tags/searchPageTag.json";
import mainPageTag from "./tags/mainPageTag.json";
// import ITag from "./interfaces/tag";


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
      const baseData = await this.scrapBaseData(page, searchPageTag);

      const mainData = await this.scrapMainData(page, baseData, mainPageTag);

      browser.close();

      return mainData;
    } catch (err) {
      functions.logger.info(err, {structuredData: true});
      return err;
    }
  }

  private async scrapBaseData(page: puppeteer.Page, tags: any) {
    const firstSearchPageData = await this.scrap(page, tags["baseUrl"], tags);
    let consolidatedPrimordialDataRaw: any[] = firstSearchPageData.primordialDataRaw;

    let nextPageURL: string = firstSearchPageData.nextPageURL;
    while (nextPageURL) {
      const searchPageData = await this.scrap(page, nextPageURL, tags);
      nextPageURL = searchPageData.nextPageURL;
      consolidatedPrimordialDataRaw = [...consolidatedPrimordialDataRaw, ...searchPageData.primordialDataRaw];
    }

    return consolidatedPrimordialDataRaw;
  }

  private async scrapMainData(page: puppeteer.Page,
      baseData: any[], mainPageTag: any) {
    const items: any[] = [];
    for (const itemBaseData of baseData) {
      const data = await this.scrap(page, itemBaseData["baseUrl"], mainPageTag);
      items.push(data);
    }

    return items;
  }

  private async scrap(page: puppeteer.Page,
      url: string, tags: any): Promise<any> {
    await page.goto(url, {waitUntil: "networkidle0"});

    const items: any = await page.evaluate((sel) => {
      const primordialDataRaw: any[] = [];

      const getDataFromTag = (dom: Document, children: any[]) => {
        const data = {};
        for (const item of children) {
          const getTagData = Function("document",
              `return ${item["selector"]}`
          );

          const tagValue = getTagData(dom);
          if (tagValue) {
            data[item["name"]] = tagValue;
          }
        }
        return data;
      }

      if (sel["isBaseData"]) {
        const containers = document.querySelectorAll(sel["selector"]);

        const nextPageContent = document.querySelector(sel["nextPageSelector"]);
        const nextPageURL = nextPageContent && nextPageContent["href"];

        containers.forEach((element) => {
          const baseData = getDataFromTag(element, sel["children"]);
          primordialDataRaw.push(baseData);
        });

        return {
          nextPageURL,
          primordialDataRaw,
        };
      } else {
        const mainData = getDataFromTag(document, sel["children"]);
        return mainData;
      }
    }, tags);

    return items;
  }
}
