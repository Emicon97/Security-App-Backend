import app from './src/app';
import dbConnection  from './src/db/index';

app.set('port', process.env.PORT || 3001);

async function main(){
    await dbConnection()
    app.listen(app.get('port'), () => {
        console.log('server on port')
    })
}

main();