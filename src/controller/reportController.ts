import reportModel from '../models/report';
import { Report } from './../models/report';
import toDosModel from '../models/toDos';
import { getSuperior } from './userController';

async function sendReport (
   title:string,
   sender:string,
   id:string,
   description?:string,
   picture?:string
   ): Promise<Report> {

   try {
      var receiver = await getSuperior(sender);
   } catch (err:any) {
      throw new Error (err.message);
   }

   const report = await reportModel.create({
      title,
      description: description ? description : undefined,
      picture: picture ? picture : undefined,
      sender,
      receiver
   });

   await report.save();
   await toDosModel.findByIdAndUpdate(id, { $push: { report }});
   return report;
}

async function getReportsById (id:string, relation?:string) {

   if (relation === 'sender') {
      return await reportModel.find({sender: id});
   } else if (relation === 'receiver') {
      return await reportModel.find({receiver: id});
   } else {
      let sent = await reportModel.find({sender: id});
      let received = await reportModel.find({receiver: id});
      return [ ...sent, ...received ];
   }
}

async function getSenderOrReceiver (id:string, relation:string) {
   if (relation === 'sender') return await getSender(id);
   else if (relation === 'receiver') return await getReceiver (id);
}

async function getSender (id:string) {
   const sender = await reportModel.findById(id).populate({path:'sender'});
   return sender;
}

async function getReceiver (id:string) {
   const receiver = await reportModel.findById(id).populate({path:'receiver'});
   return receiver;
}

export {
   sendReport,
   getReportsById,
   getSenderOrReceiver
};