-- CreateTable
CREATE TABLE `Endereco` (
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `rua` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `id_endereco` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `data_nascimento` DATETIME(3) NULL,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_categoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategoria` (
    `id_subcategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `id_categoria` INTEGER NOT NULL,
    `nome_subcategoria` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_subcategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id_compra` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `formaDepagamento` VARCHAR(191) NOT NULL,
    `data_hora` DATETIME(3) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `total` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NumSerie` (
    `id_numSerie` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroSerie` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `NumSerie_numeroSerie_key`(`numeroSerie`),
    PRIMARY KEY (`id_numSerie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `id_subcategoria` INTEGER NOT NULL,
    `id_numSerie` INTEGER NOT NULL,
    `id_compra` INTEGER NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `preco_base` DECIMAL(65, 30) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `fabricante` VARCHAR(191) NULL,

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategoria` ADD CONSTRAINT `SubCategoria_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_id_subcategoria_fkey` FOREIGN KEY (`id_subcategoria`) REFERENCES `SubCategoria`(`id_subcategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_id_numSerie_fkey` FOREIGN KEY (`id_numSerie`) REFERENCES `NumSerie`(`id_numSerie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_id_compra_fkey` FOREIGN KEY (`id_compra`) REFERENCES `Compra`(`id_compra`) ON DELETE SET NULL ON UPDATE CASCADE;
