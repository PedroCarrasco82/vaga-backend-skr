import { Router } from 'express'
import BuildsController from './controllers/BuildsController'

const routes = Router()

routes.get('/builds', async (req, res) => BuildsController.index(req,res));
routes.get('/builds/tag/:tag', async (req, res) => BuildsController.indexByTag(req,res));
routes.get('/builds/id/:id', async (req, res) => BuildsController.findById(req,res));

export default routes