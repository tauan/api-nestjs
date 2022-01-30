CREATE TABLE `gazin-tech-teste`.nivel (
	id INT UNSIGNED auto_increment NOT NULL,
	nivel varchar(100) NOT NULL,
	criado_em TIMESTAMP DEFAULT now() NULL,
	atualizado_em TIMESTAMP NULL,
	desativado_em TIMESTAMP NULL,
	CONSTRAINT nivel_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
