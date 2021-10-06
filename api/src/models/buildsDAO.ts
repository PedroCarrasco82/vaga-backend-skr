import * as admin from "firebase-admin";
import Build from "./build";

if (!admin.apps.length) {
    admin.initializeApp();
}
const database = admin.firestore();
database.settings({ignoreUndefinedProperties: true});

export default class BuildsDAO {

    public collection() {
        return database.collection('builds');
    }

    public async getAll() {
        const rawBuilds: FirebaseFirestore.QuerySnapshot = await this.collection().get();

        const builds : Array<Build> = [];
        rawBuilds.forEach((doc) => {
            const data = doc.data();
            const build: Build = new Build(
                doc.id, 
                data["name"], 
                data["localization"], 
                data["tags"], 
                data["architecture"],
                data["landscaping"],
                data["release"],
                data["deliveryForecast"],
                data["images"]
            );
            builds.push(build);
        });

        return builds;
    }

    public async where(fieldPath: string, opStr: WhereFilterOp, value: any) {
        const rawBuilds: FirebaseFirestore.QuerySnapshot = await this.collection().where(fieldPath, opStr, value).get();

        const builds : Array<Build> = [];
        rawBuilds.forEach((doc) => {
            const data = doc.data();
            const build: Build = new Build(
                doc.id, 
                data["name"], 
                data["localization"], 
                data["tags"], 
                data["architecture"],
                data["landscaping"],
                data["release"],
                data["deliveryForecast"],
                data["images"]
            );
            builds.push(build);
        });

        return builds;
    }

    public async getById(id: string) {
        const rawBuilds: FirebaseFirestore.DocumentSnapshot = await this.collection().doc(id).get();

        const data = rawBuilds.data();
        const build: Build = new Build(
            id, 
            data!["name"], 
            data!["localization"], 
            data!["tags"], 
            data!["architecture"],
            data!["landscaping"],
            data!["release"],
            data!["deliveryForecast"],
            data!["images"]
        );

        return build;
    }
}

type WhereFilterOp =
    | '<'
    | '<='
    | '=='
    | '!='
    | '>='
    | '>'
    | 'array-contains'
    | 'in'
    | 'not-in'
    | 'array-contains-any';