class set {
    constructor(){
        this.items= {};
    }
    has(element) {
        return Object.prototype.hasOwnProperty.call(this.items, element);
      }
    
      add(element) {
        if (!this.has(element)) {
          this.items[element] = element;
          return true;
        }
        return false;
      }
    
      Delete(element) {
        if (this.has(element)) {
          delete this.items[element];
          return true;
        }
        return false;
      }
    
      clear() {
        this.items = {};
      }
    
      size() {
        let count = 0;
        for (let key in this.items) {
          if (this.items.hasOwnProperty(key)) {
            count++;
          }
        }
        return count;
      }
    
      values() {
        let values=[];
        for(let key in this.items){
            if(this.items.hasOwnProperty(key)){
                values.push(key);
            }
        }
        return values;
      }

      union(unionSet){
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
      }
}

