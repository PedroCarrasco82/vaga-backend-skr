import { Router } from 'express'
import DataScrapProcessController from './controllers/dataScrapProcessController'

const routes = Router()

routes.post('/startdatascraprocess', DataScrapProcessController.startDataProcess);

export default routes