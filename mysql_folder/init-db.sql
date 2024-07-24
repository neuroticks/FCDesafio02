use node_db;

create table if not exists `pessoa`(`id` int not null auto_increment, `nome` varchar(255), primary key(`id`));