import app from './src/app';
import dbConnection  from './src/db/index';
// import dotenv from 'dotenv'
// dotenv.config()
const port = process.env.PORT || 3000;

async function main(){
    await dbConnection()
    // app.listen(app.get('port'), () => {
    app.listen(port, () => {
        console.log(`server on port ${port}`)
        // console.log(`server on port`, app.get('port'))
    })
}

main();