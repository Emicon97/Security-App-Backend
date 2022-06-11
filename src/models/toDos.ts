import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Supervisor, Watcher } from './user';
import { Report } from './report';

const TODO_STATUS:string[] = ['left', 'done', 'postponed'];
const PRIORITIES:string[] = ['urgent', 'high', 'regular', 'low'];
export class ToDos {

    @prop({ required: true })
    public name: string;

    @prop()
    public description?: string;

    @prop({ required: true, enum: TODO_STATUS, default: 'left' })
    public status!: string;

    @prop({ required: true, ref: () => Supervisor || Watcher })
    public responsible: Ref<Supervisor | Watcher>;

    @prop({ enum: PRIORITIES, required: true })
    public priority: string;

    @prop({ ref: () => Report })
    public report: Report[];
}

const toDosModel = getModelForClass(ToDos);
export default toDosModel;