let component:string[] = ['A', 'B', 'C'];
let available:object = {'A':10, 'B':5, 'C':7};
let minThresh:object = {'A':2, 'B':0, 'C':1};
let order:number = 5;
let resource:number = 3;
let max:object= {0:{'A':7, 'B':5, 'C':3}, 
                  1:{'A':1, 'B':0, 'C':1}, 
                  2:{'A':9, 'B':0, 'C':2},
                  3:{'A':2, 'B':2, 'C':2},
                  4:{'A':4, 'B':3, 'C':3}
                };

let allocation:object = {};
let need:object = {};

let currentCycle = new Array();
let nextCycle = new Array();

console.log("Component requirements per order: ");
console.log(max);
console.log("\n");
console.log("Current inventory of components: ");
console.log(available);
console.log("\n");

for(let i=0; i<order; i++){
    allocation[i] = {};
    for(let j=0; j<resource; j++){
        if((max[i][component[j]] <= available[component[j]]) && ((available[component[j]] - max[i][component[j]]) >= minThresh[component[j]])){
            allocation[i][component[j]] = max[i][component[j]];
            available[component[j]] -= allocation[i][component[j]];
        }
        else{
            allocation[i][component[j]] = 0;
        }
    }
}

for(let i=0; i<order; i++){
    need[i] = {};
    for(let j=0; j<resource; j++){
        need[i][component[j]] = max[i][component[j]] - allocation[i][component[j]]
    }
}

console.log("Allocatable in current cycle: ");
console.log(allocation);
console.log("\n");
console.log("Pending requests in current cycle: ");
console.log(need);
console.log("\n");
console.log("Inventory post current cycle: ");
console.log(available);

let executable:boolean[] = [];
for(let i=0; i<order; i++){
    executable.push(false);
}

for(let i=0; i<order; i++){
    let flag:number = 1;
    for(let j=0; j<resource; j++){
        if(need[i][component[j]] == 0){
            continue;
        }
        else{
            flag = 0;
            break;
        }
    }
    if(flag==1)
        executable[i] = true;
}

console.log("\n");

for(let i=0; i<order; i++){
    if(executable[i]==true){
        currentCycle.push(i);
    }
    else 
    {
        nextCycle.push(i);
    }
}

console.log("Orders that can be fulfilled in current cycle: ");
console.log(currentCycle);
console.log("\nOrders that need to be pushed to next cycle: ");
console.log(nextCycle);