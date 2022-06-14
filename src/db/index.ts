const mongoose = require('mongoose');
import config from '../config/config';

const dbConnection = async () => {
  return await mongoose.connect(`${config.MONGO_DATABASE}://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_HOST}/${config.MONGO_CONFIGURATION}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('DB Online');
    })
    .catch((err:any) => {
      console.log(err)
    })
};

export default dbConnection;