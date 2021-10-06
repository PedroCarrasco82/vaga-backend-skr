# Projeto para processo seletivo - SKR 
Esse projeto tem como objetivo a criação de um fluxo de processamento de dados na qual inicialmente deverá obter os empreendimentos da <a href="https://skr.com.br/empreendimentos"><b>construtora SKR</b></a>.


<hr />

## 🛠 Algumas das ferramentas que utilizei 
<a href=''>![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)</a>
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)


Caso queira observar o quadro de desenvolvimento do projeto, <a href="https://trello.com/b/9nMWFDDq/processo-seletivo-skr">clique aqui</a>
<hr />

## 📈 Modelo do fluxo de processamento dos dados
<p align="center">
    <img src="./assets/img/Fluxo - SKR Processo Seletivo.jpg" width = 600>
</p>

### Serviços
| Serviço | Descrição |
| :---: | :--------: | 
| Scrapper | Processo de obtenção dos dados de empreendimentos direto do site da <a href="https://skr.com.br/empreendimentos"><b>construtora SKR</b></a>.
| Handler | É responsável por ser a ponte entre o scrapper e o migration| 
| Migration | Após a obtenção dos dados no Scrapper, o handler envia eles para o migration, e em seguida esses dados são validados e salvos no banco de dados|
 | API | A API atua na transmissão dos dados que já foram coletados pelo data Scrap Process|
