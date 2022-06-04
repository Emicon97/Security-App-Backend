import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
const {  sendReport, getReportsById, getSenderOrReceiver } = require('../controller/reportController');

const router = Router();

router.get('/:id', TokenValidation, async (req, res) => {
   try {
      let { id } = req.params;
      let { relation } = req.body;
      let reports = await getReportsById(id, relation);
      res.json(reports);
   }  catch (error) {
      if (error instanceof Error) {
         res.status(404).json(error.message);
     } else {
         console.log('Unexpected Error', error);
     }
  }
})

router.get('/content/:id', TokenValidation, async (req, res) => {
   try {
      let { id } = req.params;
      let { relation } = req.body;
      let sender = await getSenderOrReceiver(id, relation);
      res.json(sender);
   } catch (error) {
       if (error instanceof Error) {
          res.status(404).json(error.message);
      } else {
          console.log('Unexpected Error', error);
      }
   }
})

router.post('/:id', TokenValidation, async (req, res) => {
   try {
      let { id } = req.params;
      let report = await sendReport('Nuevo reporte', '628efaec038a543cbc4c1f49', '629001d1f77222d7eee888da');
      res.json(report);
   } catch (error) {
      if (error instanceof Error) {
          res.status(404).json(error.message);
      } else {
          console.log('Unexpected Error', error);
      }
   }
})

export default router;