//variables globales
//listo, ejecucion, bloqueado, terminado;

//lista que contiene el progreso de los procesos de como se están ejecutando
var progreso = [];
//variable que almacena el número de segundo por el cual esta corriendo el algorimot
var conteo= 0;

//metodo de roundrobin
function RoundRobin(processes){   
    //quantum con el que se va trabajar el algoritmo
    var quantum = processes.quantum;
    //variable finalizado que nos dice si ya se acabo de tratar todos los procesos es decir, sus burst-times son cero.
    var finalizado = false;
    while(finalizado === false){
        for(var x = 0; x < processes.Processes.length-1;x++){
            if(processes.Processes[x].Burst_time === 0) finalizado = true;
            else{
                finalizado = false;
                break;
            }
        }
        if(finalizado === true){
            var result = {
                "Processes": progreso
            }
            return result;
        }
        else{
            for(var i = 0; i< processes.Processes.length-1;i++){
                if(processes.Processes[i].Burst_time >= quantum){
                    processes.Processes[i].Burst_time -= quantum;
                    var proceso = {
                        "Id": processes.Processes[i].Id,
                        "inicio": conteo,
                        "final" : conteo+quantum,
                        "Burst_time": processes.Processes[i].Burst_time,
                        "listo": conteo,  
                        "enjecucion": `${conteo}-${conteo+quantum}`
                    }
                    conteo += quantum;
                    progreso.push(proceso);
                }else if(processes.Processes[i].Burst_time < quantum){
                    var burst = processes.Processes[i].Burst_time
                    var proceso = {
                        "Id": processes.Processes[i].Id,
                        "inicio": conteo,
                        "final" : conteo+processes.Processes[i].Burst_time,
                        "Burst_time": processes.Processes[i].Burst_time - burst,
                        "listo": conteo,
                        "enjecucion": `${conteo}-${conteo+processes.Processes[i].Burst_time}`
                    }
                    processes.Processes[i].Burst_time -= burst;
                    conteo += burst;
                    progreso.push(proceso);
                }
            }
        } 
    }
}

module.exports = RoundRobin;
