const mongoose = require('mongoose');
// import config from '../config/config'
const { MONGODB_URL } = process.env;

const dbConnection = async () => {
  return await mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('DB Online');
    })
};

export default dbConnection;
