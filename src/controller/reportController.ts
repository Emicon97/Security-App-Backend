import reportModel from '../models/reports';
import toDosModel from '../models/toDos';
import { Report } from '../models/reports';
import { getSuperior, roleIdentifier } from './userController';

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

   var senderType:string = await roleIdentifier(sender);
   senderType = senderType.charAt(0).toUpperCase() + senderType.slice(1);
   var receiverType:string;
   senderType === 'Watcher' ?
      receiverType = 'Supervisor' : receiverType = 'Boss';

   const report = await reportModel.create({
      title,
      description: description ? description : undefined,
      picture: picture ? picture : undefined,
      senderType,
      sender,
      receiverType,
      receiver
   });

   await report.save();
   await toDosModel.findByIdAndUpdate(id, { $push: { report }});
   return report;
}

async function getReportsById (id:string, relation?:string) {

   if (relation === 'sender') {
      return await reportModel.find({sender: id}).populate({path:'receiver'});
   } else if (relation === 'receiver') {
      return await reportModel.find({receiver: id}).populate({path:'sender'});
   } else {
      let sent = await reportModel.find({sender: id}).populate({path:'receiver'});
      let received = await reportModel.find({receiver: id}).populate({path:'sender'});
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