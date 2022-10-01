# Data-structure-and-algorithms

### Capitulo-6 Listas Ligadas

**O que são listas ligadas ?**

Listas ligadas são estruturas de dados dinâmicas ,ou seja podemos adicionar e excluir elementos do modo que quisermos.

As listas ligadas armazenam itens em ordem sequencial,porém diferente dos `arrays`, estrutura de dados que já estudamos,os elementos não são posicionados de forma contígua na memória.

Cada elemento é composto de um nó,  que armazena o elemento, além de uma referência que é conhecido como `ponteiro` ou `ligação` que aponta par o próprio elemento.

- Ao criar uma `lista ligada`, temos a vantagem de não precisar deslocar os elementos quando eles são adicionados ou removidos.
- Utilizamos um `ponteiro` para trabalhar com as listas ligadas,para iterarmos por ela,em um array conseguimos trabalhar com o elemento que queremos na posição que queremos diretamente,já em uma lista ligada precisamos iterar por ela toda partindo de alguma posição,por exemplo se quisermos acessar um elemento no meio da lista,vamos partir da head(Cabeça) e iterar até o elemento.

- Um exemplo de lista ligada na vida real,é um trem pois é formado por diversos vagões um ligado ao outro,podendo mudar facilmente um vagão de lugar ou até mesmo removê-los,sendo cada vagão um elemento e a ligação entre eles o ponteiro.

**Criando a classe LinkedList**

Agora vamos implementar uma lista ligada, que basicamente é composta por:

```JavaScript
import{ defaultEquals} from '../util'; (1)
import {Node}from './Node.js'; (2)
export default class LinkedList{
    constructor(equalsFn = defaultEquals){
        this.count = 0; (3)
        this.head = undefined; (4)
        this.equalsFn =equalsFn; (5)
    }
}

```

**(1)-** Iniciamos importando a função `defaultEquals` de `util` que possui a função de comparar dois objetos ou dois valores,podemos passar uma função personalizada que fará isso também ,porém se caso não criarmos, a função `defaultEquals`, será nossa função `default` para comparação de igualdade,(ao importa-lá dessa maneira podemos usa-lá em diversas partes do nosso código).

```JavaScript
export function defaultEquals(a,b){
    return a === b;
}
```

**(2)-** Importamos também,a classe `Node` ,dentro dela existe o `element`,a importamos pois ela representa o item que vamos adicionar na lista,a classe `Node` possui também o atributo `next`,que é o ponteiro que faz a ligação para o próximo nó.

```JavaScript
export class Node{
    constructor(element){
        this.element = element;
        this.next =undefined;
    }
}
```

**(3)-** Dentro do escopo do constructor, vamos declarar a propriedade `this.count`, com a função de armazenar o número de elementos que temos na lista.

**(4)-** Sabendo que nossa estrutura é dinâmica,precisamos colocar uma referência de onde iremos começar a iterar pela lista também a referência de um primeiro elemento,por isso atribuimos a `this` a variável `Head`.

**(5)-** Já importamos `equalsFn` através do `defaultEquals`,para usa-lá como ponto de comparação e igualdade entre os elementos da lista.

**Métodos da classe LinkedList**

Dando continuidade ao processo de entender um pouco mais sobre como podemos utilizar a estrutura de dados de lista ligada, vamos aprender quais métodos são utilizados e como são constrúidos.

* **push(element):**Sabemos que esse método insere um novo elemento na lista,porém sua construção difere das demais que jáutilizamos em outras estruturas de dados.

```JavaScript
push(element) {
    const node = new Node(element);
    let current;
        if (this.head == null) {
            this.head = node;
        }else{
    current = this.head;
    while (current.next != null) { 
    current = current.next;
    }

    current.next = node;
    }
    this.count++;
}
```

  * **removeAt(index):**Esse método remove um item de uma posição especifica da lista.

```JavaScript
removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head; 

            if (index === 0) { 
                this.head = current.next;
            } else {
                let previous;
                for (let i = 0; i < index; i++) {
                    previous = current;
                    current = current.next; 
                }


                previous.next = current.next; 
            }
            this.count--; 
            return current.element;
        }
        return undefined; 
    }
```

* **isEmpty():**Já usamos esse método em outras estruturas de dados, basicamente ele possui a mesma função , caso a lista esteja vazia ele retorna `true` e `false` se a lista possuir algum elemento.

```JavaScript
 isEmpty() {
        return this.size() === 0;
    }

```

* **getElementAt(index):**Refatoramos o método `remove` que percorre toda lista até chegar na posição desejada,sabemos que esse trecho para buscar o index desejado com um laço é comum nos métodos da classe LinkedList, por isso vamos reaproveitá-los.

```JavaScript
getElementAt(index) {
if (index >= 0 && index <= this.count) {
let node = this.head;
for (let i = 0; i < index && node != null; i++) {
node = node.next;
}
return node;
}
return undefined;
}
```

* **insert(element,index):**Utilizamos também o método `insert`,que nos possibilita inserir um elemento em qualquer posição da lista ligada.

```JavaScript
   insert(element, index) {
        if (index >= 0 && index <= this.count) { 
            const node = new Node(element);
            if (index === 0) { 
                const current = this.head;
                node.next = current; 
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1); 
                const current = previous.next; 
                node.next = current; 
                previous.next = node; 
            }
            this.count++; 
            return true;
        }
        return false; 
    }
```

* **indexOf(element):**Esse elemento recebe o elemento e devolve sua posição,caso esse numero não seja encontrado -1 é devolvido.

```JavaScript
 indexOf(element) {
        let current = this.head; 
        for (let i = 0; i < this.count && current != null; i++) { 
            if (this.equalsFn(element, current.element)) { 
                return i; 
            }
            current = current.next; 
        }
        return -1; 
    }
```

* **remove(element):**Criamos o método acima para implementarmos outros métodos,como o `remove`,que utiliza do `indexOf` para remover assim determinado elemento.

```Javascript
 remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
```

* **Size():**O elemento `size` é o mesmo elemento que já implementamos anteriormente,basicamente ele retorna `this.count`,propriedade que possui a quantidade de elementos da nossa lista.

```Javascript
size(){
    return this.count;
}
```

* **getHead():**Se caso precisarmos iterar pela lista fora da implementação da classe,usamos o getHead que obtém o primeiro elemento da lista.

```JavaScript
   getHead() {
        return this.head;
    }
```

* **ToString():**O método toString tem como função converter o objeto `linkedList` em uma string.

```Javascript
toString() {
        if (this.head == null) {
            return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
```

**Lista Duplamente Ligada**

Já aprendemos um pouco sobre Lista Ligada,porém agora vamos aprender sobre mais um tipo de lista ligada que é a lista duplamente ligada.

A diferença principal entre uma lista ligada da duplamente ligada é que, na lista duplamente ligada vamos apontar para os nós de ambos os lados, o nó anterior e o próximo, o que nos da a oportunidade de iterarmos do inicio para o fim quanto vice-versa.

Vamos começar com as alterações necessárias para implementar a classe `DoublyLinkedList`:

```JavaScript
class DoublyNode extends Node { 
    constructor(element, next, prev) {
        super(element, next); 
        this.prev = prev; 
        }
       }
class DoublyLinkedList extends LinkedList { 
    constructor(equalsFn = defaultEquals) {
      super(equalsFn); 
      this.tail = undefined; 
    }
   }
```

**(1)**Analisando o começo da nossa lista,podemos ver que `DoublyNode` extende a clsse `Node`, o que nos possibilita herdar o elementos, `element` e `next`.

**(2)**Sabendo que estamos usando o conceito de herança, precisamos chamar o constructor de `Node` dentro do constructor da classe `DoublyNode`.

**(3)**Nesse momento a classe DoublyLinkedList irá utilizar um novo nó chamado `DoublyNode` e ele terá nova funcionalidade para mantermos o controle sobre o nó anterior, além das propriedades `element` e `next` que são da classe `Node`,adicionamos a propriedade `prev`.

**(4)** Sabendo que a classe `DoublyLinkedList`, é um tipo especial de `LinkedList`,devemos estender essa classe, ou seja a `DoublyLinkedList` herdará todasas propriedades e métodos da classe `LinkedList` .

**(5)** Chamamos o construtor de `LinkedList`,que terá como função iniciar as propriedades, equalsfn, count ,head.

**(6)** Precisamos também manter uma referência ao último elemento da lista,para isso adicionamos a propriedade `tail`.

**Inserindo um Novo Elemento em Qualquer Posição**

Para inserirmos um novo elemento em uma lista duplamente ligada, é bem semelhante a uma lista ligada, a diferença é que na lista ligada vamos lidar somente com o `next` enquanto na duplamente ligada,temos de controlar as propriedades `next` e `prev`.

Sabendo disso vamos sobrescrever, o método `insert` pois ele terá um novo comportamento.

```JavaScript
insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    current.prev = node;
                    this.head = node;
                }
            } else if (index === this.count) {
                current = this.tail;
                current.next = node;
                node.prev = current;
                this.tail = node;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }
```

**Removendo elementos de qualquer posição**

Remover elementos de uma lista duplamente ligada, é muito semelhante á uma remoção de lista ligada, a diferença está em definir o ponteiro para o elemento anterior também,segue a implementação :

```JavaScript
removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;

                if (this.count === 1) {
                    this.tail = undefined;
                } else {
                    this.head.prev = undefined;
                }
            } else if (index === this.count - 1) {
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = undefined; }
                else {
                current = this.getElementAt(index);
                const previous = current.prev;


                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count--;
            return current.element;
        }
        return undefined;
    }
```

**Listas ligadas circulares**

Uma lista ligada circular, possui a possibilidade de ter uma referência de direção ou duas ,como já vimos acima. A diferença que caracteriza uma lista circular é que o ponteiro que aponta para o próximo item do último elemento `(tail.next)` ,não faz referência a undefined mas ao primeiro elemento `(head)`.

Em uma `lista circular duplamente ligada`, `tail.next` aponta para `head` e `head.prev` aponta para o elemento `tail`,vamos analizar o código que cria a classe `CircularLinkedList`:

```JavaScript
CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    }
}
```

A classe `CircularLinkedList` ,não precisa de nenhuma propriedade adicional,por isso vamos estender a classe `LinkedList` e sobrescrever alguns métodos que necessitam de um comportamento especial por exemplo (insert,removeAt).

**Inserindo um novo elemento em qualquer posição**

A mesma lógica que usamos para inserir um `element` em outros tipos de listas usaremos nesta, o que vamos alterar é que precisamos também ligar a referência `next` do último nó ao nó apontado por `head` :

```JavaScript
insert(element, index) {
       if (index >= 0 && index <= this.count) {
           const node = new Node(element);
           let current = this.head;
           if (index === 0) {
               if (this.head == null) {
                   this.head = node;
                   node.next = this.head;
               } else {
                   node.next = current;
                   current = this.getElementAt(this.size());
                   this.head = node;
                   current.next = this.head;
               }
           } else {
               const previous = this.getElementAt(index - 1);
               node.next = previous.next;
               previous.next = node;
           }
           this.count++;
           return true;
       }
       return false;
   }
```

**Removendo elementos de qualquer posição**

Para removermos um `element` de uma lista ligada circular,só precisamos nos atentar para o segundo cenário, que altera o elemento `head` da lista.

O primeiro cenário para remover um `element`, é a remoção desse elemento de uma lista com um único `node`,no caso basta atribuir `undefined` a `head`.

O segundo cenário esta em remover o primeiro `element` de uma lista não vazia, como vamos mudar a referência de `head`, precisamos atualizar a referência ao elemento `head` atual,que vai ser removido da lista.

```Javascript
removeAt(index) {
       if (index >= 0 && index < this.count) {
           let current = this.head;
           if (index === 0) {
               if (this.size() === 1) {
                   this.head = undefined;
               } else {
                   const removed = this.head;
                   current = this.getElementAt(this.size());
                   this.head = this.head.next;
                   current.next = this.head;
                   current = removed;
               }
           } else {

               const previous = this.getElementAt(index - 1);
               current = previous.next;
               previous.next = current.next;
           }
           this.count--;
           return current.element;
       }
       return undefined;
   }
```

**Lista Ligadas Ordenadas**

As listas `Ligadas Ordenadas` são um tipo de lista que mantém seus elementos de forma ordenada, para manter os elementos ordenados ao invés de aplicarmos algum algoritmo para ordenar os elementos, vamos inserir o `element` em sua posição correta, mantendo assim a lista sempre ordenada.

Abaixo iremos declarar a classe `SortedLinkedList` :

```JavaScript
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};
function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
        super(equalsFn);
        this.compareFn = compareFn;
}
```
A classe `SortedLinkidList` vai herdar todas propriedades e métodos da classe `linkedList` mas, como essa classe tem um comportamento especial, precisaremos de uma função para comparar os elementos. Por esse motivo, também temos de declarar `compareFn`, usado para comparar elementos. `compareFn` usará `defaultCompare`como padrão, caso os elementos sejam iguais `defaultCompare` vai nos retornar `0`. Porém se o elemento `a` for menor que o elemento `b` ela irá nos retornar -1 caso contrario 1.

A seguir alguns métodos da classe `SortedLinkList`

**Insert**-Vamos sobrescrever o método `insert` :

```JavaScript

insert(element, index = 0) { 
    if (this.isEmpty()) {
    return super.insert(element, 0); 
}
    const pos = this.getIndexNextSortedElement(element); 
    return super.insert(element, pos); 
}
getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for (; i < this.size() && current; i++) {
    const comp = this.compareFn(element, current.element); 
    if (comp === Compare.LESS_THAN) { 
        return i;
        }
        current = current.next;
        }
     return i; 
    }
```

**Criando a classe StackLinkedList**

Podemos usar a classe `LinkedList` como estruturas de dados internas, criando assim outras estruturas como pilha,fila e deque.

Agora veremos como criação da estrutura de dados de `pilha`, utilizaremos a classe `StackLinkedList` e seus métodos que são declarados assim:

```Javascript
class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList(); 
    }
    push(element) {
        this.items.push(element); 
    }
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.removeAt(this.size() - 1); 
    }
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.getElementAt(this.size() - 1).element;
    }
    isEmpty() {
        return this.items.isEmpty();
    }
    size() {
        return this.items.size();
    }
    clear() {
        this.items.clear();
    } toString() {
        return this.items.toString();
    }
```

Na classe `StackLinkedlist`, em vez de usar um array ou um objeto `javaScript` para armazenar items, usamos uma `DoublyLinkedList`, usamos ela no lugar de uma lista ligada porque para a `pilha`, os elementos serãpo inseridos no final da lista e a remoção também será no final.

A `DoublyLinkedList` mantém uma referência ao último element da lista (tail), por isso não precisamos iterar por todos elementos da lista para acessá-los, reduzindo o esforço de processamento.


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



