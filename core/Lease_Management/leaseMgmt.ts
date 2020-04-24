const num2Date = (n:number):string => {
    let date = n.toString();
    if(n.toString().length < 6)
        date = '0' + date;
    
    date = date.substring(0,2)+'-'+date.substring(2,4)+'-'+date.substring(4,6);
    return date;
}

const date2Num = (date:string):number => {
    let num:any = date.split('-');
    num = num.join('');
    return parseInt(num);
}

const JSDate2Num = ():number => {
    function lenTwo(num:number) {
        let temp = num.toString();
        if(temp.length < 2) temp = '0'+temp;
        return temp;
    }
    const d = new Date();
    let numArr = [d.getMinutes(), d.getHours(), d.getDate(), d.getMonth()+1, d.getFullYear()];
    let strArr = numArr.map(lenTwo);
    let dt = parseInt(strArr.join(''));
    return dt;
}

export class LeaseNode {
    name:string = '';
    leaseStart:number;
    leaseEnd:number;
    next:{[k:string]: any} = null;

    constructor(name:string, start:number, end:number){
        this.name = name;
        this.leaseStart = start;
        this.leaseEnd = end;
    }
};

export class Vehicle {
    rentalStatus:string = '';
    offset:number;
    next:{[k:string]: any} = null;

    constructor(status:string, offset:number){
        this.rentalStatus = status;
        this.offset = offset;
    }

    getLeaseInfo():{[k:string]: any} {
        let temp = this.next;
        let leaseInfo:{[k:string]: any} = {};
        while(temp!=null) {
            leaseInfo[temp.name] = {
                'startTS':num2Date(temp.leaseStart), 
                'endTS':num2Date(temp.leaseEnd)
            };
            temp = temp.next
        }
        return leaseInfo;
    }

    insertLeaseInfo(node:{[k:string]: any}, after:string):void {
        if(after == '-1') {
            node.next = this.next;
            this.next = node;
            return;
        }

        let temp = this.next;
        while(temp!=null) {
            if(temp.name == after){
               node.next = temp.next;
               temp.next = node; 
            }
            temp = temp.next;
        }
    }

    deleteLeaseNode(custName:string):void {
        let temp = this.next;
        
        if(temp.name == custName) {
            this.next = temp.next;
            return;
        }

        temp = temp.next;
        while(temp!=null){
            if(temp.next == null) 
                return;
            
            else if(temp.next.name == custName) {
                temp.next = temp.next.next;
                return;
            }

            temp = temp.next;
        }
    }

    deleteAccordingToTS(currTS:number):void {
        let temp = this.next;

        if(currTS < temp.leaseStart) 
            return;

        while(temp!=null){
            if(temp.next == null){
                if(currTS > temp.leaseEnd){
                    this.next = null;
                    this.rentalStatus = 'AVAILABLE';
                }
            }
            else if((currTS > temp.leaseEnd) && (currTS <= temp.next.leaseStart)){
                if(currTS < temp.next.leaseStart) 
                    this.rentalStatus = 'AVAILABLE';
                this.next = temp.next;
                break;
            }
            temp = temp.next;
        }
    }

    getAvailSlots(currTS:number) {
        let temp = this.next;
        let avail = new Array();
        let betLease = this.offset;

        if(temp == null){
            avail.push({
                'status': 'NoBookings'
            });
            return avail;
        }

        if(currTS < temp.leaseStart) {
            avail.push({
                'after': 'Current', 
                'from':num2Date(currTS), 
                'till':num2Date(temp.leaseStart)
            });
        }

        while(temp!=null) {
            let leaseEnd = (temp.next==null)? 'NextNewBooking': num2Date(temp.next.leaseStart);
            let slots = {
                'after': temp.name,
                'from':num2Date(temp.leaseEnd+betLease), 
                'till':leaseEnd
            };
            avail.push(slots);
            temp = temp.next;
        }
        return avail;
    }

    checkAvailability(avail:object[], requirement:{[k:string]: any}) {
        avail.forEach(obj => {
            if(obj['till'] == 'NextNewBooking'){
                console.log('Available between: ', obj);
            }
            else if((requirement['from'] === undefined) && (date2Num(obj['from'])+requirement['for'] <= date2Num(obj['till']))){
                console.log('Available between: ', obj);
            }
            else if((requirement['from'] >= date2Num(obj['from'])) && (requirement['from']+requirement['for'] <= date2Num(obj['till']))){
                console.log('Available between: ', obj);
            }
        })
    }

    updateRentalStatus(currTS:number) {
        if(this.next == null) 
            this.rentalStatus = 'AVAILABLE';
        
        else if( (currTS >= this.next.leaseStart) && (currTS >= this.next.leaseEnd) )
            this.rentalStatus = 'BOOKED';

        else 
            this.rentalStatus = 'AVAILABLE';
    }
};
