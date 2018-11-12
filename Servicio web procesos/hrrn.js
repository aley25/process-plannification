//algoritmo para trazar procesos mediante hrrn, recibe un lista que es un json, que contiene la lista
//processes y otras propiedades para luego enviarlas.
function HRRN(Full) {
    var count = 0;
    var total = 0;
    //se setean las nuevas propiedades con las que se van a trabajar
    for (var i = 0; i < Full.Processes.length; i++) {
        Full.Processes[i].terminado = 0;
        Full.Processes[i].hrrn=0;
    }
    //se organizar de menor a mayor
    for (var i = 0; i < Full.Processes.length; i++) {
        for (var j = 0; j < Full.Processes.length; j++) {
            if (Full.Processes[i].Tiempoarribo < Full.Processes[j].Tiempoarribo) {
                aux = Full.Processes[j];
                Full.Processes[j] = Full.Processes[i];
                Full.Processes[i] = aux;
            }
        }
    }
    //el primero que llegar se ejecuta automaticamente por lo cual se le da valor a las propiedades 
    count += Full.Processes[0].Burst_time;
    Full.Processes[0].listo = Full.Processes[0].Tiempoarribo;
    Full.Processes[0].nuevo = Full.Processes[0].Tiempoarribo;
    Full.Processes[0].terminado = Full.Processes[0].Tiempoarribo + Full.Processes[0].Burst_time;
    Full.Processes[0].Tiempoespera = 0;
    Full.Processes[0].enjecucion = `${Full.Processes[0].Tiempoarribo}- ${Full.Processes[0].Tiempoarribo+count}`;
    var flag = true;
    while (flag) {
        var lee = true;
        for (var i = 1; i < Full.Processes.length; i++) {
            if (Full.Processes[i].Tiempoarribo <= count && Full.Processes[i].terminado === 0) {
                Full.Processes[i].hrrn = Promed((count-Full.Processes[i].Tiempoarribo), Full.Processes[i].Burst_time)
            } else {
                if (i === Full.Processes.length-1) {
                    for (var j = 1; j < Full.Processes.length; j++) {
                        if (Full.Processes[j].terminado === 0) {
                            lee = false;
                        }
                    }
                }
            }
        }
        if (lee === true) {
            break;
        }
        //se haya el indice del proceso con mayor ratio response y luego a ese se le dan los nuevos valores
        var index = IndexMax(Full.Processes);
        Full.Processes[index].listo = count;
        Full.Processes[index].nuevo = Full.Processes[index].Tiempoarribo;
        count += Full.Processes[index].Burst_time;
        Full.Processes[index].terminado = 0;
        Full.Processes[index].enjecucion = `${count}- ${count+Full.Processes[index].Burst_time}`;
        Full.Processes[index].Tiempoespera = (count - Full.Processes[index].Tiempoarribo);
    }
    for(var m = 0; m < Full.Processes.length; m++ ){
        total += Full.Processes.Tiempoespera;
    }
    total = (total/Full.Processes.length)
    Full[1]=total;
    return Full;
}

function Promed(Weit, Burst) {
    var Calculo = ((Weit + Burst) / Burst);
    return Calculo;
}
function IndexMax(lista) {
    var indice = 0;
    var mayor = 0;
    for(var i = 0; i < lista.length; i++){
        if(lista[i].terminado===0){
            if(lista[i].hrrn > mayor){
                mayor = lista[i].hrrn;
                indice = i;
            }
        }
    }
    return indice;
}

module.exports = HRRN;
