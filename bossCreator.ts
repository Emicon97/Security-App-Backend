console.log('entré')
import {bossModel, neighbourModel, supervisorModel, watcherModel} from './src/models/user';

async function bossCreator () {
   const boss = await bossModel.create({
         name: 'Emi',
         lastName: 'Conde',
         password: 'granjefe@biggestjefe.password',
         dni: 88888888,
         email: 'disizmuymale',
         telephone: 18181818,
         environment: 'Mi casa'
   })
   const saveUser = await boss.save();
   return saveUser;
}

bossCreator();