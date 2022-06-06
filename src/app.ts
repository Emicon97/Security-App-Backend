import express from 'express';
import morgan from 'morgan';
// import cors from 'cors';
const { CORS_URL } = process.env
const routes = require('./routes/index');

const app = express();

app.use(morgan('dev'));
// app.use(cors('*'));
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', CORS_URL); // update to match the domain you will make the request from
  //  res.header('Access-Control-Allow-Origin', 'https://security-app-puce.vercel.app/'); // update to match the domain you will make the request from
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
   next();
 });
// app.use((req, res, next) => {
//   next()
// }, cors({ maxAge: 84600 }))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', routes);

export default app;