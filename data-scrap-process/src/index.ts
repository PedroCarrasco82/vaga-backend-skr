import {Scrapper} from "./scrapper/scrapper";
import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello World");
});

export const scrapper = functions.https.onRequest(
    (request, response) => new Scrapper({request, response}).run()
);
