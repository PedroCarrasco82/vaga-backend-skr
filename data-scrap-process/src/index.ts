import {Migration} from "./migration/migration";
import {Normalization} from "./normalization";
import {Scrapper} from "./scrapper";
import * as functions from "firebase-functions";

const functionConfigs: functions.RuntimeOptions = {
  timeoutSeconds: 300,
  memory: "1GB",
};

export const scrapper = functions.runWith(functionConfigs).https.onRequest(
    async (request, response) =>
      await new Scrapper({request, response}).run()
);

export const normalization = functions.runWith(functionConfigs).https.onRequest(
    async (request, response) =>
      await new Normalization({request, response}).run()
);

export const migration = functions.runWith(functionConfigs).https.onRequest(
    async (request, response) =>
      await new Migration({request, response}).run()
);
