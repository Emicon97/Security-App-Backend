import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
const routes = require('./routes/index');

const app = express();


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', routes);

export default app;