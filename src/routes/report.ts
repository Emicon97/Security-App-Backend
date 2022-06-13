import { Router } from 'express';
import { TokenValidation } from '../libs/verifyToken';
import { sendReport, getReportsById, getSenderOrReceiver } from '../controller/reportController';

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
      let { title, toDo, description, picture } = req.body;
      let report = await sendReport(title, id, toDo, description, picture);
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