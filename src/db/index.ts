const mongoose = require('mongoose');
import config from '../config/config';

const dbConnection = async () => {
  return await mongoose.connect(`mongodb+srv://emi:p5qdrHQR7Qc5JnOa@centinel.urpnz5k.mongodb.net/?retryWrites=true&w=majority`, {
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
