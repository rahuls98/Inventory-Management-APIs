class LeaseNode {
    name:string;
    leaseStart:number;
    leaseEnd:number; 
    next = null;

    constructor(name:string, start:number, end:number){
        this.name = name;
        this.leaseStart = start;
        this.leaseEnd = end;
    }
};

class Vehicle {
    rentalStatus:string;
    betweenLease:number;
    next = null;

    constructor(status:string, service:number){
        this.rentalStatus = status;
        this.betweenLease = service;
    }
};

/* Object creation */
let Miracle = new Vehicle('BOOKED', 10000);
let cust1 = new LeaseNode('cust1', 180220, 200220);
Miracle.next = cust1;
let cust2 = new LeaseNode('cust2', 250220, 270220);
cust1.next = cust2;
let betLease = Miracle.betweenLease;
let temp = Miracle.next;

/* Getting vehicle object store */
console.log('\nVehicle object store:')
console.log(Miracle);
console.log("------------------------------------------------");

/* Getting availability status */
console.log('\nVehicle availability: ');
let avail = new Array();
while(temp!=null){
    let endPoint = (temp.next==null)? 'NoNewBooking': temp.next.leaseStart;
    let t = {'from':temp.leaseEnd+betLease, 'to':endPoint};
    avail.push(t);
    temp = temp.next;
}
console.log(avail);
console.log("------------------------------------------------");

/* Getting requirements based availability */
let req1 = {'from':220220, 'for':20000};
let req2 = {'from':220220, 'for':40000};
let req3 = {'from':280220, 'for':30000};
let req4 = {'from':undefined, 'for':50000};

function checkAvail(avail, requirement) {
    console.log('\nFor ', requirement);
    avail.forEach(obj => {
        if(obj['to'] == 'NoNewBooking'){
            console.log('Available between: ', obj);
        }
        else if((requirement['from'] === undefined) && (obj['from']+requirement['for'] <= obj['to'])){
            console.log('Available between: ', obj);
        }
        else if((requirement['from'] >= obj['from']) && (requirement['from']+requirement['for'] <= obj['to'])){
            console.log('Available between: ', obj);
        }
    });
}

console.log('\nRequirement based availability: ');
checkAvail(avail, req1);
checkAvail(avail, req2);
checkAvail(avail, req3);
checkAvail(avail, req4);

console.log("------------------------------------------------");

/* Lease insertion */
let cust3 = new LeaseNode('cust3', 220220, 230220);
function leaseInsert(vehicle, node){
    let temp = vehicle['next']['next'];
    vehicle['next']['next'] = { ... node };
    vehicle['next']['next']['next'] = { ... temp };
    return vehicle;
}

console.log('\nNew lease insertion: ');
console.log('Lease Inserted: ', leaseInsert(Miracle, cust3));
console.log("------------------------------------------------");

/* Lease termination */
function leaseTermination(name:string, vehicle) {
    if(name=='front'){
        vehicle['next'] = vehicle['next']['next'];
    }
    vehicle['rentalStatus'] = 'AVAILABLE';
    return vehicle;
}
console.log('\nLease termination: ');
console.log('Lease terminated: ', leaseTermination('front', Miracle));