class Stack{
    constructor(){
        this.items =[];
    }
    push(Element){
        this.items.push(Element);
    }
    isEmpty(){
        return this.items.length === 0;
    }
    pop(){
        return this.items.pop()
    }
    print(){
        console.log( this.items.toString())
    }
}

function decimalToBinary(decNumber){
    const remStack = new Stack();
    let rem;
    let binaryString = '';

    while (decNumber > 0){
        rem = Math.floor(decNumber % 2);
        remStack.push(rem);
        decNumber = Math.floor(decNumber / 2);
    }
    while (!remStack.isEmpty()){
        binaryString += remStack.pop().toString();
    }
    return binaryString;
}

console.log(decimalToBinary(26))







