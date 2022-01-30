-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema gazin-tech-teste
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gazin-tech-teste
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gazin-tech-teste` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `gazin-tech-teste` ;

-- -----------------------------------------------------
-- Table `gazin-tech-teste`.`nivel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gazin-tech-teste`.`nivel` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nivel` VARCHAR(100) NOT NULL,
  `criado_em` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` TIMESTAMP NULL DEFAULT NULL,
  `desativado_em` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gazin-tech-teste`.`desenvolvedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gazin-tech-teste`.`desenvolvedor` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nivel_id` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `sexo` ENUM('masculino', 'feminino', 'outro') NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `idade` INT NOT NULL,
  `hobby` VARCHAR(250) NULL DEFAULT NULL,
  `criado_em` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` TIMESTAMP NULL DEFAULT NULL,
  `desativado_em` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `desenvolvedor_FK` (`nivel_id` ASC) VISIBLE,
  CONSTRAINT `desenvolvedor_FK`
    FOREIGN KEY (`nivel_id`)
    REFERENCES `gazin-tech-teste`.`nivel` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
