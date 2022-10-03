

class Set{
    constructor(){
        this.items = {};
    }

    has(element){
        return Object.prototype.hasOwnProperty.call(this.items, element);
     }

    add(element){ 
        if(!this.has(element)){
            this.items[element]= element;
            return true;
        }
        return false;
    }

    Delete(element){
        if(this.has(element)){
            delete this.items[element];
            return true;
        }
        return false
     }

    clear(){ 
        this.items ={};
    }

   size(){
    let count = 0;
    for(let key in this.items){
        if(this.items.hasOwnProperty(key)){
            count++;
        }
    }
    return count;
   }

   values(){}


}