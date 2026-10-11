# Pet Shop — Máquina de Banho para Pets

Projeto de estudo desenvolvido a partir de um desafio de Java da [Digital Innovation One (DIO)](https://www.dio.me/), em parceria com o Itaú. A proposta é simular o funcionamento de uma máquina de banho para pets.

Além da aplicação original em Java, este repositório inclui uma interface feita com HTML, CSS e JavaScript para visualizar e experimentar as operações no navegador.

## Funcionalidades

### Aplicação Java

- Abastecer água e shampoo.
- Consultar os níveis dos produtos e verificar se há um pet na máquina.
- Colocar e remover um pet.
- Dar banho no pet e limpar a máquina.
- Interagir com o programa por um menu no console.

### Interface web

- Visualizar o status da máquina e os níveis de água e shampoo.
- Consultar o status e verificar se há pet na máquina.
- Colocar e remover um pet, dar banho e limpar a máquina.
- Receber mensagens sobre as ações e o estado atual da máquina.
- Usar os controles em uma interface adaptável a diferentes tamanhos de tela.

> A interface web é uma demonstração independente: ela não está conectada à aplicação Java. Cada versão mantém seu próprio estado enquanto está em uso.

## Tecnologias

- Java
- HTML
- CSS
- JavaScript

## Como executar

### Java pelo IntelliJ IDEA

1. Abra o projeto no IntelliJ IDEA.
2. Abra `src/Main.java`.
3. Execute a classe `Main`.

### Java pelo PowerShell

Na pasta raiz do projeto, compile e execute:

```powershell
New-Item -ItemType Directory -Force out
javac -encoding UTF-8 -d out src\Main.java src\Pet.java src\PetMachine.java
java -cp out Main
```

É necessário ter o JDK instalado e os comandos `javac` e `java` disponíveis no terminal.

### Interface web

Abra o arquivo `index.html` no navegador. Não é preciso instalar dependências nem iniciar um servidor.

## Estrutura do projeto

```text
.
├── index.html       # Interface web
├── styles.css       # Estilos da interface
├── script.js        # Interações e estado da demonstração web
└── src/
    ├── Main.java       # Menu de console
    ├── Pet.java        # Modelo do pet
    └── PetMachine.java # Regras da máquina de banho
```

## Observação

Este projeto foi modificado para fins de estudo. A implementação Java e a interface web são independentes; atualmente, as ações realizadas em uma não alteram os dados da outra.
