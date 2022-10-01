
# Data-structure-and-algorithms

## Estrutura de Dados Cap 5

**Estrutura de Dados de Fila**

Uma estrutura de fila é uma sequência de itens baseada em `FIFO` (first in first out - ou seja o primeiro que entra é o primeiro que sai), a adição de novos elementos na fila é feita pela cauda e a remoção feita pela frente ,como uma fila de atendimento em um cinema, o elemento(pessoa) mais recente que for adicionado deve esperar no final da fila. 

Criamos uma classe para representar uma fila :

```JavaScript
class Queue {
    constructor() {
        this.count = 0;
        this.lowesCount = 0;
        this.items = {};
    }
}
```

Dentro dessa classe temos uma propriedade chamada `count` que nos ajuda a controlar o tamanho da fila,como removeremos também os itens da frente da fila  criamos uma propriedade chamada `lowestCount` temos por último a propriedade `items` que é um objeto que usaremos para armazenar os elementos,e em seguida adicionamos os métodos que estão disponiveis em uma fila que são :

 **enqueue**(element):Esse método adiciona um novo elemento no final da fila.
```Javascript
    enqueue(element){
        this.items[this.count]=element;
        this.count++;
    };
```
 **dequeue**():Esse método remove o primeiro elemento da fila e depois retorna o elemento removido.
```Javascript
 dequeue(){
        if (this.isEmpty()){
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
```

**peek**():Esse método devolve o primeiro item a fila,o elemento não é removido mas é devolvido como informação.

```Javascript
    peek (){
        if(this.isEmpty()){
           return undefined; 
    }
    return console.log(this.items[this.lowestCount]);
}
```

**isEmpty**(): Esse método devolve `true` se a fila estiver vazia e `false` se o tamanho da fila for maior que 0.

```JavaScript
isEmpty(){
        return this.count - this.lowestCount === 0;
    }
```
**size**(): Esse método nos retorna a quantidade de elementos que estão na fila.

```JavaScript
 size(){
        return this.count - this.lowestCount;
    };
```
**Clear**():Usamos esse método para limpar as filas,resetando suas propriedades.

```JavaScript
  clear(){
        this.items= {};
        this.count= 0;
        this.lowestCount = 0; 
        
    };
```
**toString**():Usamos esse método para transformar um elemento `number` em uma `string`.

```JavaScript
toString(){
        if(this.isEmpty()){
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++){
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
```
**Fila Circular-Batata Quente**

Para entendermos um pouco melhor a aplicação das `filas `vamos criar um algoritmo que exemplifica um jogo de batata quente,em um jogo de batata quente temos uma roda de participantes que repassam a batata quente ate que ela para de ser passada e quem estiver com a batata é eliminado,e isso irá acontecer até que reste apenas uma criança que será a vencedora.

Antes de iniciar o algoritmo , precisamos declarar a classe `Queue` , e ai sim iniciaremos nosso algoritmo.

* Começamos criando uma função chamada `hotpotato` que recebe como parâmetro `elementList`(lista de elementos) e `num`(número de rodadas que o jogo terá.) dentro do escopo da função vamos instanciar a classe `Queue` passando para a constante `queue` abaixo criamos uma constante chamada `eliminatedList` que recebe como valor um array.

```Javascript
function hotPotato(elementList,num){
    const queue =new Queue();
    const eliminatedList = [];
}
```

* Logo após isso para obter uma lista de nomes vamos criar um laço de repetição ,que através do método `enqueue` irá adicionar elemento por elemento na constante `queue` enquanto "i" for menor que o tamanho de `elementList`.

```JavaScript

    for (let i = 0; i < elementsList.length; i++) {
      queue.enqueue(elementsList[i]);
    }

```

* No próximo passo da construção do algoritmo vamos criar um "While" que tem como condição, que enquanto o tamanho da `queue` for maior que `1`, ele entra dentro do "for" que está dentro de seu escopo,esse "for" tem como condição de que enquanto "i" for menor que o parâmetro  `num` ,vai ser excluido o primeiro item da lista e adicionado novamente no final da lista ,até que o valor de `num` seja alcançado.
  
Alcançando o valor  de `num` será excluido o primeiro item da lista e vamos adiciona-lo através do `push` no array `eliminatedList`,isso acontecerá até que `(queue.size() > 1)` sobrando assim um elemento,que será o ganhador do game.

```Javascript

    while (queue.size() > 1) {
      for (let i = 0; i < num; i++) {
        queue.enqueue(queue.dequeue());
      }
      eliminatedList.push(queue.dequeue());
    }

```
* Finalizando o algoritmo, vamos retornar um objeto que terá como elementos `eliminated` que tem como valor todos os elementos que perderam e `winner` tem como valor `queue.dequeue()`, que basicamente é o retorno do item vencedor ,como sabemos o método `dequeue` exclui o primeiro item da lista depois o retorna.

```Javascript
return {
      eliminated: eliminatedList,
      winner: queue.dequeue()
    };
```

Para testarmos o algoritmo, declaramos primeiro um array de nomes passando para constante `names` e depois criamos uma constante `result`, que recebe a função que criamos tendo como parâmetro `names` e `7`,após isso vamos iterar por cada elemento do objeto `eliminated` que é retornado na função `hotpotato`,imprimindo através de um `console.log`uma mensagem.

Por fim,imprimimos quem foi o ganhador acessando o `result.winner`:

```JavaScript

  const names =["Renata","Matheus","Davi","Camila"];
  const result = hotPotato(names,7);

  result.eliminated.forEach(name=>{
    console.log(`${name} was eliminated from the hot Potato game.`);
  });
  console.log(`The winner is: ${result.winner}`);
```

**Estruturas de Dados de Deque**

Aprendemos também um pouco mais sobre a estrutura de dados em `deque`,que também é conhecida como `fila de duas pontas`,que nos permite remover elementos do começo da fila e do final.

Um exemplo de um deque na vida real é a fila típica em cinemas,lanchonetes e assim por diante. Por exemplo, uma pessoa que acabou de comprar um ingresso poderia retornar para a frente da fila somente para pedir uma informação rápida. Se a pessoa que estiver no final da fila estiver com pressa, ela poderia também sair da fila.

Criamos uma classe `Deque` com as mesmas propriedades no constructor da classe `queue` :

```JavaScript
class Deque {
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }
}

```
Um Deque possui alguns métodos em comum ,como uma fila normal como o "isEmpty,clear,size,toString",porém ele possui alguns métodos novos dando a possibilidade de inserir e remover elementos nas duas extremidades esses métodos são :

* addFront(element): esse método adiciona um novo elemento na frente
do deque.
```Javascript

 addFront(element) {
        if (this.isEmpty()) {
          this.addBack(element);
        } else if (this.lowestCount > 0) {
          this.lowestCount--;
          this.items[this.lowestCount] = element;
        } else {
          for (let i = this.count; i > 0; i--) {
            this.items[i] = this.items[i - 1];
          }
          this.count++;
          this.items[0] = element;
        }
      }
```
* addBack(element): esse método adiciona um novo elemento no fim do
deque (a mesma implementação do método enqueue da classe Queue).

```JavaScript

 addBack(element) {
        this.items[this.count] = element;
        this.count++;
      }
```
* removeFront(): esse método remove o primeiro elemento do deque (a
mesma implementação do método dequeue da classe Queue).

```JavaScript

 removeFront() {
        if (this.isEmpty()) {
          return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
      }
```
* removeBack(): esse método remove o último elemento do deque (a
mesma implementação do método pop da classe Stack).
```JavaScript

 removeBack() {
        if (this.isEmpty()) {
          return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
      }
```
* peekFront(): esse método devolve o primeiro elemento do deque (a
mesma implementação do método peek da classe Queue).
```JavaScript

  peekFront() {
        if (this.isEmpty()) {
          return undefined;
        }
        return this.items[this.lowestCount];
      }
```
* peekBack(): esse método devolve o último elemento do deque (a
mesma implementação do método peek da classe Stack).
```JavaScript

peekBack() {
        if (this.isEmpty()) {
          return undefined;
        }
        return this.items[this.count - 1];
      }
```

**Verificador de Palíndromo**

Para entendermos melhor sobre `deques` vamos contruir um agoritmo ,que é um verificador de palíndromo.

Mas o que é um palindromo? Palindromo é uma palavra,frase,número ou outra sequência de caracteres que é lido igualmente de trás para frente e de frente para trás por exemplo : `11011`.


* Antes de começar a criar o verificador precisamos criar a `classe Deque` com todos os métodos:

```JavaScript
class Deque{
    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
      }
         addFront(element) {
        if (this.isEmpty()) {
          this.addBack(element);
        } else if (this.lowestCount > 0) {
          this.lowestCount--;
          this.items[this.lowestCount] = element;
        } else {
          for (let i = this.count; i > 0; i--) {
            this.items[i] = this.items[i - 1];
          }
          this.count++;
          this.items[0] = element;
        }
      }
    
      addBack(element) {
        this.items[this.count] = element;
        this.count++;
      }
    
      removeFront() {
        if (this.isEmpty()) {
          return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
      }
    
      removeBack() {
        if (this.isEmpty()) {
          return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
      }
    
      peekFront() {
        if (this.isEmpty()) {
          return undefined;
        }
        return this.items[this.lowestCount];
      }
    
      peekBack() {
        if (this.isEmpty()) {
          return undefined;
        }
        return this.items[this.count - 1];
      }
    
      isEmpty() {
        return this.size() === 0;
      }
    
      clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
      }
    
      size() {
        return this.count - this.lowestCount;
      }
    
      toString() {
        if (this.isEmpty()) {
          return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
          objString = `${objString},${this.items[i]}`;
        }
        return objString;
      }
    }
```

* Para criarmos esse verificador começamos criando uma função chamada `palindromeChecker` passando `aString` como parâmetro ou seja a palavra,frase ou número que vamos checkar.
```JavaScript
function palindromeChecker(aString){

}
```

* Em seguida vamos construir um laço de repetição com `if` que contém as condições para que a string passada seja válida não sendo válida retornamos `false` :

```JavaScript
if (
          aString === undefined ||
          aString === null ||
          (aString !== null && aString.length === 0)
        ) {
          return false;
        }
```

* Logo após isso vamos instanciar a classe `Deque` alocando dentro da constante `deque` ,e vamos criar uma constante chamada `lowerString` que vai receber a `aString.toLocaleLowerCase().split(' ').join('');` ,fazendo com que primeiro todas as letras fiquem minúsculas, depois usamos o `split()` para fazer a separação de cada letra e junta-lás  com o método `join()` removendo assim todos os espaços entre as palavras, também declaramos duas variáveis novas `firstChar` e `lastChar`:

```JavaScript
const deque = new Deque();
        const lowerString = aString.toLocaleLowerCase().split(' ').join('');
        let firstChar;
        let lastChar;

```
* Como próximo passo vamos criar um `for` que tem a condição de que se `i`for menor que `lowerString.length` ele irá adicionar letra por letra da palavra que está em `lowerString` na constante `deque`,até `lowerString` ser menor que `i` :


```JavaScript
 for (let i = 0; i < lowerString.length; i++) {
          deque.addBack(lowerString.charAt(i));
        }

```

* Seguindo com a construção do algoritmo, depois que passarmos pelo `for` ,vamos criar um `while` tendo como condição de que enquanto `(deque.size() > 1)` ele irá remover a primeira letra de `deque` e a última letra e atribuir ao `if` se a primeira e a última char forem diferentes retornamos `false` se não retornamos true :
  
```JavaScript
while (deque.size() > 1) {
          firstChar = deque.removeFront();
          lastChar = deque.removeBack();
          if (firstChar !== lastChar) {
            return false;
          }
        }
      
        return true;
      };
```

E assim finalizamos nosso algoritmo com o `console.log`:

```JavaScript
console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));
```


