<h1>Macro</h1>
    <p style="text-align: justify; font-size: 1.2em;">
        Criar um servidor web configurado no NGINX.
    </p>
    <p style="text-align: justify; font-size: 1.2em;">
        Quando o usuário acessar o servidor (localhost:9898) redirecionar para uma aplicação NodeJS, 
        na porta específica (8787).
    </p>
    <p style="text-align: justify; font-size: 1.2em;">
        Ao acessar a aplicação, esta deve inserir uma pessoa em um banco de dados e, 
        retornar este nome junto à escrita Full Cycle Rocks! 
        Os arquivos do MySQL serão posicionados na pasta FCDesafio02/mysql_folder
    </p>


<h1>Procedimento</h1>
<p style="text-align: justify; font-size: 1.2em;">
    Para poder testar o servidor Web (NGINX) chamando o NodeApp ou, o NodeApp acessando o BD,
    é preciso antes fazer o NodeApp.
    </br>
    Para o app NodeJS será usada a pasta FCDesafio02/node_app_folder.
</p>
<p style="text-align: justify; font-size: 1.2em;">
    Depois segue-se com a configuração do NGINX.
    </br>
    Para o servidor NGINX será usada a pasta FCDesafio02/nginx_folder.
</p>
<p style="text-align: justify; font-size: 1.2em;">
    Preparando-se para o final, é necessário criar o servidor do MySQL, 
    instanciando um container apontando para a pasta FCDesafio02/mysql_folder, onde ficarão os arquivos do banco.
</p>
<p style="text-align: justify; font-size: 1.2em;">
    Então, para finalizar, atualiza-se a página index.js com as operações de banco.
</p>

<h1>App NodeJS</h1>
<p style="text-align: justify; font-size: 1.2em;">
    Instancia um container NodeJS para poder criar o app em NodeJS sem precisar ter Node instalado localmente.
    </br>
    A instância tem o mapeamento do volume (pasta do projeto). 
    </br>
    Para que o mapeamento funcione devidamente, o comando, a seguir, deve ser executado dentro da pasta FCDesafio02/node_app_folder.
</p>

```code
$ docker run --rm -it -v $(pwd)/:/usr/src/app -p 3000:3000 node bash
```
<p style="text-align: justify; font-size: 1.2em;">
    Ao entrar na pasta de trabalho do container Node, procede-se com a criação do projeto.
    </br>
    Ao inicializar o projeto utiliza-se o parâmetro -y para aceitar o padrão em todas as perguntas, a fim de simplesmente criar o projeto.
</p>

```code
$ cd /usr/src/app
/usr/src/app#  npm init -y
```
<p style="text-align: justify; font-size: 1.2em;">
Instala-se o express para prover o serviço web.
</br>
Aproveita e instala também a lib pro MySQL.</p>

```code
/usr/src/app#  npm install express mysql2 --save
```
<p style="text-align: justify; font-size: 1.2em;">
    No VSCode já se visualiza que o projeto foi criado, então procede com a criação do index.js. Veja através dos commits, a evolução do index.js até ser atualizado com as <i>operações de banco</i>.
</p>

[index.js](../node_app_folder/index.js)

<p style="text-align: justify; font-size: 1.2em;">
    Após a criação de um index.js minimo (no VSCode), no terminal da imagem, coloca o index.js em execução.
</p>

```code
/usr/src/app#  node index.js
```

<p style="text-align: justify; font-size: 1.2em;">
    A partir de outra janela do Terminal, na máquina local, pode-se verificar o funcionamento.
</p>

```code
$ curl localhost:3000
<h1> Full Cycle Rocks!</h1>
```

<h3>NodeApp Image</h3>
<p style="text-align: justify; font-size: 1.2em;">
    Dockerfile para cria a imagem desse NodeApp.
</p>

[Dockerfile.node](../node_app_folder/Dockerfile.node)

<p style="text-align: justify; font-size: 1.2em;">
Para evitar copiar arquivos indesejados para dentro da imagem no momento do build, usa-se o arquivo dockerignore.</p>

[dockerignore](../node_app_folder/.dockerignore)


<p style="text-align: justify; font-size: 1.2em;">
Para verificar o resultado obtido até aqui.</p>

```code
$ docker build -t my_node_app:v1.0 -f Dockerfile.node .

$ docker run --rm -p3000:3000 my_node_app:v1.0

$ curl localhost:3000
<h1> Full Cycle Rocks!</h1>
```
