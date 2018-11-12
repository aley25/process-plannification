//nuevo, listo, ejecucion, terminado, bloqueado

function SJFA(processes){
    var progreso = [];
    finalizado = false;
    var conteo = 0;
    while(finalizado !== true){
        var procesoactual;
        var procesoanterior;
        if(conteo=== 0){
            procesoactual =processes.Processes[0]; 
        }
        for(var i = 0; i < processes.Processes.length; i++){
            if(conteo <= processes.Processes[i].Tiempoarribo){
                if(processes.Processes[i].Burst_time !== 0){
                    for(var x = 0; x < processes.Processes.length; x++){
                        if(processes.Processes[x].Burst_time < processes.Processes[i].Burst_time){
                            if(processes.Processes[x].Id !== processes.Processes[i].Id){
                                procesoanterior = procesoactual;
                                if(progreso.length === 0){
                                    procesoanterior.nuevo = procesoanterior.Tiempoarribo;
                                    procesoanterior.listo= procesoanterior.Tiempoarribo;
                                    procesoanterior.enjecucion= `${procesoanterior.Tiempoarribo}-${procesoanterior.Tiempoarribo+conteo}`;
                                }
                            }else{
                                procesoactual.Burst_time -= 1;
                            }
                            
                        }else{
                            procesoactual.Burst_time -= 1;
                        }
                    }
                    
                }else{
                    finalizado = true;
                }
            }
        }
        conteo+= 1;
        if(procesoactual.Burst_time === 0){
            progreso.push(procesoactual);
        }
       
    }
    var final = {
        "Processes": progreso,
        "averageWT": 0
    };
    return final;
    
}

module.exports = SJFA;