import reportModel from '../models/Report';

async function sendReport (title:string, sender:string, receiver:string) {
   console.log('entré')
   const report = await reportModel.create({
      title,
      sender,
      receiver
   });

   await report.save();
   return report;
}

async function getReportsById (id:string, relation?:string) {

   if (relation === 'sender') {
      console.log('acá')
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