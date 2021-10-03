 
 parseBytes = () => {
    const stats = localStorage.getItem('stats');
    return stats === 0 ? {} : parseInt(stats);
   
 }
 
const stats = parseBytes();

let extractedBytes = {};
console.log(stats);

 for (origin in stats){
     extractedBytes.push({ origin:'origin', bytes : stats[origin]});
 }

 for (origin in extractedBytes){

    const newH1 = Document.createElement('h1');
    const newItem = Document.createTextNode(origin);
    newH1.appendChild(newItem);

    const newH2 = Document.createElement('h2');
    const newData = Document.createTextNode(extractedBytes[origin])
    newH2.appendChild(newData);

 }



