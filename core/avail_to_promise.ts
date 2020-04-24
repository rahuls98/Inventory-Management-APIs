let allocated:{[k:number]:number} = {1:60, 2:25, 3:40, 4:15, 5:5, 6:0};
let scheduledReplenishment:{[k:number]:number} = {1:0, 2:0, 3:100, 4:0, 5:0, 6:100};
let openingInventory:number = 90;
let projectedInventory:{[k:number]:number} = {};

let ATP:{[k:number]:number} = {};
let CATP:{[k:number]:number} = {};

function deleteByVal(val:number) {
    for (var key in scheduledReplenishment) {
        if (scheduledReplenishment[key] == val) delete scheduledReplenishment[key];
    }
}

deleteByVal(0);

let temp:string[] = Object.keys(scheduledReplenishment);
let tot:number;
let c:number = 0;
if(temp[0]=="1") temp.shift();

for(let i=1; i<7; i++){
    tot = 0;
    if(i==1){
        for(let j=i; j<parseInt(temp[c]); j++){
            tot += allocated[j];
        }
        c++;
        let sc = (scheduledReplenishment[i]===undefined)?0:scheduledReplenishment[i];
        ATP[i] = openingInventory + sc - tot;
        CATP[i] = ATP[i];
        projectedInventory[i] = openingInventory - allocated[i]; 
    }
    else if(temp.indexOf(i.toString()) > -1) {
        tot = 0;
        for(let j=i; j<parseInt(temp[c]); j++){
            tot += allocated[j];
        }
        ATP[i] = scheduledReplenishment[i] - tot;
        CATP[i] = ATP[i] + CATP[i-1];
        projectedInventory[i] = scheduledReplenishment[i] + projectedInventory[i-1] - allocated[i];
    }
    else {
        CATP[i] = CATP[i-1];
        projectedInventory[i] = projectedInventory[i-1] - allocated[i];
        continue;
    }
}

console.log("Projected Inventory: ", projectedInventory);
console.log("Available to promise: ", ATP);
console.log("Cumulative Available to promise: ", CATP);