

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

    Delete(element){ }

    clear(){ }

   size(){}

   values(){}


}