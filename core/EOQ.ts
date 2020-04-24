import { stringLiteral } from "babel-types";

export {};

`calculate economic order quantity Q per order so as to minimize 
the total annual cost, including holding and setting-up costs`
export class EOQ {
    a_demand:number; //annual demand - constant demand rate
    a_ordering_cost:number; //fixed ordering cost per order
    a_holding_cost:number; //holding cost per unit per year
    eoq:number; //economic order quantity
    eoq_cycle_time:number; //time between consecutive orders
    no_of_orders:number; //number of orders per year

    constructor(a_demand:number, a_ordering_cost:number, a_holding_cost:number){
        this.a_demand = a_demand;
        this.a_ordering_cost = a_ordering_cost;
        this.a_holding_cost = a_holding_cost;
        this.calcEOQ();
        this.calcEoqCT();
    }

    calcEOQ():void {
        this.eoq = Math.sqrt((2 * this.a_demand * this.a_ordering_cost)/this.a_holding_cost);
    }

    calcEoqCT():void {
        this.eoq_cycle_time = this.eoq/this.a_demand;
        this.no_of_orders = 1/this.eoq_cycle_time; 
    }

    getEOQ():number {
        return this.eoq;
    }

    /**
    * Calculate cycle time
    * @param {boolean} s - unit of cycle time to return (year or working days)
    */
    getEoqCycleTime(s:boolean):any {
        if(s==true)
            return "1/"+ this.no_of_orders.toString() + " year";
        return this.eoq_cycle_time*240;
    }

    getNumberOfOrders():number {
        return this.no_of_orders;
    }
}

let a_demand:number = 9600;
let a_ordering_cost:number = 75;
let a_holding_cost:number = 16;

let obj = new EOQ(a_demand, a_ordering_cost, a_holding_cost);
console.log("\nEconomic order quantity = " + obj.getEOQ());
console.log("Length of order cycle if EOQ is ordered = " + obj.getEoqCycleTime(true));
console.log("Reorders per year if EOQ is ordered = " + obj.getNumberOfOrders());

console.log("\n");