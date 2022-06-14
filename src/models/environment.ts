import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { createArrayFromDimensions } from '@typegoose/typegoose/lib/internal/utils';
import { Supervisor, Watcher } from './user';

export class Environment{

    @prop({unique:true, required: true, lowercase: true, trim: true })
    public name!:string;

    @prop({ref: () => Supervisor})
    public supervisor?:Supervisor[];

    @prop({ref: () => Watcher})
    public watcher?:Watcher[];                                                                                                               
}

const environmentModel = getModelForClass(Environment);
export default environmentModel;

// controles 
// -crear
// -Borrar
// -Añadir sup or watch (by:Id)
