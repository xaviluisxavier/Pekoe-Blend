CREATE SCHEMA IF NOT EXISTS `chasdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `chasdb` ;

-- -----------------------------------------------------
-- Table `chasdb`.`chasportoformoso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chasdb`.`chasportoformoso` (
  `chaid` INT NOT NULL,
  `nome` VARCHAR(25) NOT NULL,
  `preco` DECIMAL(10,2) NOT NULL,
  `descricao` VARCHAR(250) NOT NULL,
  `stock` VARCHAR(15) NOT NULL,
  `imagem` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`chaid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chasdb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chasdb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `nome_user` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `chasdb`.`chafavorito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `chasdb`.`chafavorito` (
  `chafavorito` FLOAT NULL DEFAULT NULL,
  `chasportoformoso_chaid` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`chasportoformoso_chaid`, `users_id`),
  INDEX `fk_chafavorito_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_chafavorito_chasportoformoso`
    FOREIGN KEY (`chasportoformoso_chaid`)
    REFERENCES `chasdb`.`chasportoformoso` (`chaid`),
  CONSTRAINT `fk_chafavorito_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `chasdb`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
