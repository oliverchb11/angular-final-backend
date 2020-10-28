const brain = require('brain.js');
const express = require('express');
const app = express();
require('dotenv').config()
const morgan = require('morgan');
const db = require('../db/conexion');


//settings
app.set('port', process.env.PORT || 3000);

//pruebaGetdatabase

const listPrecios = async() => {
    const arr = []
    const precios = await db.collection('PRECIOS').get();
    precios.forEach((result) => {
        // console.log(result.data().accesorio);
        // console.log(result.data().marca);
        db.collection('PRECIOS').where("accesorio", "==", `${result.data().accesorio}`).where("marca", "==", `${result.data().marca}`).get().then((info) => {
            info.forEach((data) => {

                arr.push(data.data().precio)
                arr.sort()
                predecir(arr)
            })
        })

    })
}
listPrecios()
    //middlewares
app.use(morgan('dev'))


//server
const port = app.get('port');
app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
})



//brainjs


const predecir = (precios) => {
    let net = new brain.recurrent.LSTMTimeStep();
    net.train([
        precios
    ]);
    const output = net.run([1, 2, 3]); // 3
    console.table({ precios, output });
    console.log(precios[0]);
}