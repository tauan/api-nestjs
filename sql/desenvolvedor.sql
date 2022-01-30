CREATE TABLE `gazin-tech-teste`.desenvolvedor (
	id INT UNSIGNED auto_increment NOT NULL,
	nivel_id INT UNSIGNED NOT NULL,
	nome varchar(100) NOT NULL,
	sexo ENUM("masculino", "feminino", "outro") NOT NULL,
	data_nascimento DATE NOT NULL,
	idade INT NOT NULL,
	hobby varchar(250) NULL,
	criado_em TIMESTAMP DEFAULT now() NULL,
	atualizado_em TIMESTAMP NULL,
	desativado_em TIMESTAMP NULL,
	CONSTRAINT desenvolvedor_pk PRIMARY KEY (id),
	CONSTRAINT desenvolvedor_FK FOREIGN KEY (nivel_id) REFERENCES `gazin-tech-teste`.nivel(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
