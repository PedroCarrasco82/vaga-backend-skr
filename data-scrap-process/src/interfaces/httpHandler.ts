import {Request, Response} from "firebase-functions";

export default interface IHttpHandler {
    request : Request;
    response : Response;
}
