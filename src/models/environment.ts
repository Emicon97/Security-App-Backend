import { prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { createArrayFromDimensions } from '@typegoose/typegoose/lib/internal/utils';
import { Supervisor, Watcher } from './user';

export class Environment{

    @prop({required: true, lowercase: true, trim: true })
    public name!:string;

    @prop({ref: () => Supervisor})
    public supervisor?:Ref<Supervisor[]>;

    @prop({ref: () => Watcher})
    public watcher?:Ref<Watcher[]>;                                                                                                               
}

const environmentModel = getModelForClass(Environment);
export default environmentModel;

// controles 
// -crear
// -Borrar
// -Añadir sup or watch (by:Id)