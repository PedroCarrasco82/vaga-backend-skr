import axios from 'axios';
import { Request, Response } from 'express';
import * as dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../', '../', '../', '.env') });


class DataScrapProcessController {
    public async startDataProcess(req: Request, res: Response){
        try{
            if(process.env.SCRAPPER_FUNCTION_URL && process.env.MIGRATION_FUNCTION_URL){
                const crawledDataResponse = await axios.get(process.env.SCRAPPER_FUNCTION_URL);

                await axios.post(process.env.MIGRATION_FUNCTION_URL, crawledDataResponse.data);
                return res.status(201).json("Done");
            }else{
                return res.status(500).json({
                    message: "The functions must be specified in enviroment variables"
                });
            }
        }catch(err){
            return res.status(500).json(err);
        }
    }
}

export default new DataScrapProcessController();