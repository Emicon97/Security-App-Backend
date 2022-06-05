import app from './src/app';
import dbConnection  from './src/db/index';
// import dotenv from 'dotenv'
// dotenv.config()
// const port = process.env.PORT || 3000;

app.set('port', process.env.PORT || 3001);

async function main(){
    await dbConnection()
    // app.listen(app.get('port'), () => {
    app.listen(app.get("port"), () => {
        console.log(`server on port ${port}`)
        // console.log(`server on port`, app.get('port'))
    })
}

main();