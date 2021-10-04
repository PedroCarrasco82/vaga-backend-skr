import {Migration} from "./migration/migration";
import {Normalization} from "./normalization";
import {Scrapper} from "./scrapper";
import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello World");
});

export const scrapper = functions.https.onRequest(
    (request, response) => new Scrapper({request, response}).run()
);

export const normalization = functions.https.onRequest(
    (request, response) => new Normalization({request, response}).run()
);

export const migration = functions.https.onRequest(
    (request, response) => new Migration({request, response}).run()
);
