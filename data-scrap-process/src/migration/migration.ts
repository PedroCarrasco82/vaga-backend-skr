import IHttpHandler from "../interfaces/httpHandler";
import IFunction from "../interfaces/function";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


export class Migration implements IFunction {
  database: FirebaseFirestore.Firestore;

  constructor(private httpHandler: IHttpHandler) {
    if (!admin.apps.length) {
      admin.initializeApp();
    }
    this.database = admin.firestore();
    this.database.settings({ignoreUndefinedProperties: true});
  }

  public async run(): Promise<void> {
    const {request, response} = this.httpHandler;

    functions.logger.info("Initialize migration", {structuredData: true});
    const body = JSON.parse(request.body);

    const buildsCollection = this.database.collection("builds");
    await this.storeData(body, buildsCollection);
    response.status(201).send({message: "done"});
  }

  private async storeData(scrapData: any[], buildsCollection: FirebaseFirestore.CollectionReference) {
    for (const itemScrapData of scrapData) {
      const itemExistsQuerySnapshot = await buildsCollection
          .where("name", "==", itemScrapData["name"])
          .where("localization", "==", itemScrapData["localization"]).get();

      let itemExists: any;
      itemExistsQuerySnapshot.forEach((doc) => {
        itemExists = {
          id: doc.id,
          ...doc.data(),
        };
      });
      if (itemExists) {
        buildsCollection.doc(itemExists.id).update(itemScrapData);
      } else {
        buildsCollection.add(itemScrapData);
      }
    }
  }
}
