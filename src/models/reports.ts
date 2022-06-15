import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Boss, Supervisor, Watcher } from './user';

const SENDER_TYPES :string[] = ['Supervisor', 'Watcher'];
const RECEIVER_TYPES:string[] = ['Boss', 'Supervisor']
export class Report {

   @prop({ required: true })
   public title: string;

   @prop()
   public description?: string;

   @prop()
   public picture?: string;

   @prop({ required: true, enum:SENDER_TYPES })
   public senderType: string;

   @prop({ refPath: 'senderType' })
   public sender: Ref<Supervisor | Watcher>;

   @prop({ required: true, enum:RECEIVER_TYPES })
   public receiverType: string;

   @prop({ refPath: 'receiverType' })
   public receiver: Ref<Boss | Supervisor>;
}

const reportModel = getModelForClass(Report);
export default reportModel;