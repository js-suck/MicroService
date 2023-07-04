/*
  Warnings:

  - You are about to drop the `BanKAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `BanKAccount`;

-- CreateTable
CREATE TABLE `BankAccount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `balance` INTEGER NOT NULL,

    UNIQUE INDEX `BankAccount_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
