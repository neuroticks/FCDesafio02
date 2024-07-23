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

[index.js](/node_app_folder/index.js)

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

[Dockerfile.node](/node_app_folder/Dockerfile.node)

<p style="text-align: justify; font-size: 1.2em;">
Para evitar copiar arquivos indesejados para dentro da imagem no momento do build, usa-se o arquivo dockerignore.</p>

[dockerignore](/node_app_folder/.dockerignore)


<p style="text-align: justify; font-size: 1.2em;">
Para verificar o resultado obtido até aqui.</p>

```code
$ docker build -t my_node_app:v1.0 -f Dockerfile.node .

$ docker run --rm -p3000:3000 my_node_app:v1.0

$ curl localhost:3000
<h1> Full Cycle Rocks!</h1>
```

<h1>NGINX</h1>
<p style="text-align: justify; font-size: 1.2em;">
    Para configurar o proxy, pode ser usado diretamente o arquivo defaul.conf, ou da pra usar também um template que é carregado na inicialização do serviço, o que se aproxima mais de um procedimento ideal, ao meu entender, visto que serve-se de um procedimento de substituição automática de variáveis de ambiente. 
    </br>
    Cria o template de config do nginx e aproveitando cria o arquivo de variáveis de ambiente.
</p>

[default.conf](/nginx_folder/default.conf.template)

<p style="text-align: justify; font-size: 1.2em;">
    Dockerfile para criar a imagem do servidor web, a partir da imagem padrão do NGINX.
</p>

[Dockerfile.nginx](/nginx_folder/Dockerfile.nginx)

<h1>MYSQL</h1>
<p style="text-align: justify; font-size: 1.2em;">
    Será usada a imagem padrão do dockerhub para a criação do banco MySQL.
    Não havendo criação de imagem, não precisa de dockerfile, mas somente do serviço no <i>docker-compose</i>.
    Para armazenar os arquivos do banco de dados será usada a pasta <i>mysql_folder</i>>.
</p>

<h1>Juntando Tudo</h1>
<p style="text-align: justify; font-size: 1.2em;">
    Para verificar que o docker-compose está ok, ativa primeiro o serviço NodeApp com o NGINX.
    </br>
    Para testar, basta executar docker-compose up.
    </br>
    Acompanhe os commits para ver a evolução do docker-compose.
    </br>
    Para verificar o correto funcionamento:
</p>

```code
$ docker compose up

$ curl localhost:9898
<h1> Full Cycle Rocks!</h1>

$ curl localhost:8787
<h1> Full Cycle Rocks!</h1>
```

<p style="text-align: justify; font-size: 1.2em;">
    Modifica o index.js para mostrar o header quando passa pelo proxy, para ver a distinção.
    </br>
    Agora dá pra ver quando acessa direto a nodeApp, sem passar pelo proxy (porta = 8787)
    </br>
    e o resultado com os headers adicionado pelo proxy, quando passa por ele (porta = 9898)
</p>

```code
$ curl localhost:8787
{"host":"localhost:8787","user-agent":"curl/7.81.0","accept":"*/*"}

$ curl localhost:9898
{"x-forwarded-for":"172.17.0.1","host":"localhost","connection":"Upgrade","user-agent":"curl/7.81.0","accept":"*/*"}
```

<p style="text-align: justify; font-size: 1.2em;">
    Verificado o correto funcionamento do NGINX com o nodeApp, acrescenta o serviço do MySQL.
    </br>
    Acompanhe os commits para ver a evolução do docker-compose.
</p>

[docker-compose](/docker-compose.yaml)

<p style="text-align: justify; font-size: 1.2em;">
    Após subir o docker compose, verificou-se que todos os containers estavam rodando, e os nodeApp respondendo.
    </br>
    Para dar prosseguimento, antes de poder inserir o nome no banco, precisa criar a tabela.
    </br>
    Para tal será usado um script executado ao inicializar o container mysql.
</p>

[criando a tabela na inicialização](/mysql_folder/init-db.sql)

<p style="text-align: justify; font-size: 1.2em;">
    Após as devidas atualizações, limpa-se todos os containers e imagens para verificar o correto funcionamento da criação da tabela na inicialização do container do MySQL.
    </br>
    Presseguindo com a execução do docker-compose, acessa o container do MySQL para verificação da criação da tabela.
</p>

```code
$ docker exec -it mysql_srv_container bash

bash-5.1# mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor...

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| node_db            |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.01 sec)

mysql> use node_db;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed

mysql> show tables;
+-------------------+
| Tables_in_node_db |
+-------------------+
| pessoa            |
+-------------------+
1 row in set (0.00 sec)

mysql> desc pessoa;
+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int          | NO   | PRI | NULL    | auto_increment |
| nome  | varchar(255) | YES  |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
2 rows in set (0.00 sec)
```

<p style="text-align: justify; font-size: 1.2em;">
    Verificado que tudo está funcionando até agora, prossegue com a atualização do index.js, para incluir o nome na tabela e mostrar na tela.
</p>
