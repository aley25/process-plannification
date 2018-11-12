

var nuevo = "";
var listo = "";
var ejecucuion = "";
var terminado = "";
function FCFS(process) {
  tiempofinal = 0;
  //shift+alt+f, reorganizar código;
  let output = 'P\tAT\tBT\tCT\tWT\n';
  objCollection = [];
  AT = [];
  BT = [];
  completion = 0;
  waiting = 0;
  arrivalTime = [];
  burstTime = [];
  for (var x = 0; x < process.Processes.length; x++) {
    arrivalTime.push(process.Processes[x].Tiempoarribo);
    burstTime.push(process.Processes[x].Burst_time);
  }

  //Making an object to be sorted later.
  for (var x = 0; x < arrivalTime.length; x++)
    objCollection.push({ A: arrivalTime[x], B: burstTime[x] });

  //Sorting begins with its corresponding Arrival Time and Burst Time
  //No interchanging of partner happens
  objCollection.sort(function (a, b) {
    return a.A - b.A;
  });


  for (var x = 0; x < process.Processes.length; x++) {
    //pushing to array AT and BT for later purposes.
    AT.push(objCollection[x].A);
    BT.push(objCollection[x].B);

    //calling these functions and store the values
    if (x === 0) {
      waiting = 0;
      process.Processes[x].waiting = 0;
      process.Processes[x].nuevo = process.Processes[x].Tiempoarribo;
      process.Processes[x].listo = process.Processes[x].Tiempoarribo;
      process.Processes[x].enjecucion = `${process.Processes[x].Tiempoarribo}-${process.Processes[x].Tiempoarribo + process.Processes[x].Burst_time}`;
      process.Processes[x].terminado = process.Processes[x].Burst_time + completion;
    } else {
      waiting = WT(objCollection[x], completion);
      process.Processes[x].waiting = waiting;
      process.Processes[x].nuevo = process.Processes[x].Tiempoarribo;
      process.Processes[x].listo = completion - process.Processes[x].Tiempoarribo;
      process.Processes[x].enjecucion = `${completion}-${completion + process.Processes[x].Burst_time}`;
      process.Processes[x].terminado = process.Processes[x].Burst_time + completion;
    }
    completion = CT(BT[x]);


    //storing values in output string, AT and BT array are used.
    output += `${x + 1}\t${AT[x]}\t${BT[x]}\t${completion}\t${waiting}\n`;
    //pushing to array att and awt for later purposes.
  }
  process.completion = completion;
  //Passing att and awt arrays to these functions
  process.averageWT = averageWT(process.Processes);
  output += `Average Waiting Time: ${process.averageWT}`;
  console.log(process);
  return process;
}

function CT(bt) {
  //qu must be globally scoped so that it starts initially at zero
  //and incrementing it every function invocation.
  tiempofinal += bt;
  return tiempofinal;
}

//calculating for waiting time.
function WT(object2, completion) {
  var wt = 0;
  if (object2.A >= completion) {
    wt = 0
  } else {
    wt = completion - object2.A
  }
  return wt;
}

//calculating the average turnaround time and average waiting time
//using the reduce method to find the sum of its array and dividing
//by the number of elements in the array.

function averageWT(process) {
  var conteo = 0;
  for (var x = 0; x < process.length; x++) {
    conteo += process[x].waiting;
  }
  return conteo / process.length;
}
module.exports = FCFS;

