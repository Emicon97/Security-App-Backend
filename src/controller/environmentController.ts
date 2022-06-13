import environmentModel from "../models/environment";

async function environmentCreate(name:string){
    if(name){
        let findInDB = await environmentModel.find({name});
        console.log('find',findInDB)
        if(findInDB.length===0){
            let nameOfViro = await environmentModel.create({name});
            let saverViro = nameOfViro.save();
            return saverViro
        } throw new Error('The environment already exists.')
    }else{
        throw new Error('Enter a name.')
    }
}



export{
    environmentCreate
}