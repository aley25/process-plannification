const Joi = require('joi');

//shift+alt+f, reorganizar código;
const express = require('express');
const app = express();

//i need to change the method, i give themethod a list with the infor burst-time etc and i need he complete the json
//with the avg time etc.

app.use(express.json());

app.post('/api/fcfs', (req,res) => {
    const FCFS = require('./fcfs.js');
    const validacion = validate(req.body)
    if(validacion ==="Error"){
        res.status(404).send("Bad request the information don´t have the neccesary information");
        return;
    }
    var data = req.body;
    var result = FCFS(data);
    //data[0].average = 100;
    //console.log(result);
    res.send(result);
});

app.post('/api/rr', (req,res) => {
    const RR = require('./rr.js');
    const validacion = validate(req.body);
    if(validacion ==="Error"){
        res.status(404).send("Bad request the information don´t have the neccesary information");
        return;
    }
    var data = req.body;
    var result = RR(data);
    res.send(result);
});
app.post('/api/sjfna', (req,res) => {
    const SJFNA = require('./sjfna.js');
    const validacion = validate(req.body)
    if(validacion ==="Error"){
        res.status(404).send("Bad request the information don´t have the neccesary information");
        return;
    }
    var data = req.body;
    var result = SJFNA(data);
    //data[0].average = 100;
    res.send(result);
});
app.post('/api/sjfa', (req,res) => {
    const sjfa = require('./sjfa.js');
    const validacion = validate(req.body)
    if(validacion ==="Error"){
        res.status(404).send("Bad request the information don´t have the neccesary information");
        return;
    }
    var data = req.body;
    console.log(data);
    var result = sjfa(data);
    //data[0].average = 100;
    //console.log(result);
    res.send(result);
});
app.post('/api/hrrn', (req,res) => {
    const HRRN = require('./hrrn.js');
    const validacion = validate(req.body)
    if(validacion ==="Error"){
        res.status(404).send("Bad request the information don´t have the neccesary information");
        return;
    }
    var data = req.body;
    var result = HRRN(data);
    //data[0].average = 100;
    //console.log(result);
    res.send(result);
});

//validacion de que los procesos tienen el formato correcto con toda la información necesaria.
function validate(process){
    var schema = {
        Id: Joi.required(),
        Nombre: Joi.string().required(),
        Burst_time: Joi.required(),
        Tiempoarribo: Joi.required(),
        Estado: Joi.string().required(),
        Prioridad : Joi.required(),
        Tipoproceso: Joi.required(),
        Punteropila: Joi.required()
    }
    var a = [];
    var contador=0;
    for (var i in process){
        var correcto =  Joi.validate(process[contador],schema);
        contador++;
        if(correcto.error){
            console.log(correcto.error);
            return "Error";
        }
    }
    return "Correcto"; 
    
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Listening app on port ${PORT}`));

