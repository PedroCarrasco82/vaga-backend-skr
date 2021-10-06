import BuildsDAO from "../models/buildsDAO";
import { Request, Response } from 'express';

class BuildsController {
    public async index(req: Request, res: Response){
        try{
            const getAllBuilds = await new BuildsDAO().getAll();
            res.status(200).json(getAllBuilds);
        }catch(err){
            res.status(500).json(err);
        }
    }

    public async indexByTag(req: Request, res: Response){
        try{
            const builds = await new BuildsDAO()
                .where('tags', 'array-contains', req.params.tag.toUpperCase());
            res.status(200).json(builds);
        }catch(err){
            res.status(500).json(err);
        }
    }

    public async findById(req: Request, res: Response){
        try{
            const builds = await new BuildsDAO().getById(req.params.id);
            res.status(200).json(builds);
        }catch(err){
            res.status(500).json(err);
        }
    }
}

export default new BuildsController();