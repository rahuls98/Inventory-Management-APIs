export {};

export class EPQ {
    a_demand:number;
    a_production:number;
    d_demand:number;
    d_production:number;
    working_days:number;
    epq:number;
    run_time:number;
    epq_cycle_time:number;
    imax:number;
    a_ordering_cost:number;
    a_holding_cost:number;
    a_tc:number;

    constructor(a_production:number, working_days:number, a_demand:number, a_ordering_cost:number, a_holding_cost:number){
        this.a_demand = a_demand;
        this.a_production = a_production;
        this.working_days = working_days;
        this.d_demand = this.a_demand/this.working_days;
        this.d_production = this.a_production/this.working_days;
        this.a_ordering_cost = a_ordering_cost;
        this.a_holding_cost = a_holding_cost;

        this.calcEPQ();
        this.calcMaxInventory();
        this.calcTotalCost();
        this.calcRunTime();
        this.calcEpqCycleTime();
    }

    calcEPQ():void {
        let temp = Math.sqrt((2 * this.a_demand * this.a_ordering_cost)/this.a_holding_cost);
        this.epq = temp * Math.sqrt(this.d_production/ (this.d_production - this.d_demand));
    }

    calcRunTime():void {
        this.run_time = this.epq/this.d_production;
    }

    calcEpqCycleTime():void {
        this.epq_cycle_time = this.epq/this.d_demand;
    }

    calcMaxInventory():void {
        this.imax = (1 - (this.d_demand/this.d_production)) * this.epq;
    }

    calcTotalCost():void {
        this.a_tc = ((this.imax/2)*this.a_holding_cost) + ((this.a_demand/this.epq)*a_ordering_cost);
    }

    getEPQ():number {
        return this.epq;
    }

    getRunTime():number {
        return this.run_time;
    }   
    
    getEpqCycleTime():number {
        return this.epq_cycle_time;
    }

    getMaxInventory():number {
        return this.imax;
    }

    getTotCost():number {
        return this.a_tc;
    }
}

let a_production:number = 192000;
let working_days:number = 240;
let a_demand:number = 48000;
let a_ordering_cost:number = 45;
let a_holding_cost:number = 1;

let obj = new EPQ(a_production, working_days, a_demand, a_ordering_cost, a_holding_cost);

console.log("\nOptimal run size = " + obj.getEPQ());
console.log("Min total annual cost = " + obj.getTotCost());
console.log("Cycle time for optimal run size = " + obj.getEpqCycleTime());
console.log("Run time for optimal run size = " + obj.getRunTime());
console.log("\n");