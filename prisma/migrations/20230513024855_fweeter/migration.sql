/*
  Warnings:

  - You are about to alter the column `author_id` on the `bookmark` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to drop the column `parent_post_id` on the `comment` table. All the data in the column will be lost.
  - You are about to alter the column `followed_id` on the `follow` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `follower_id` on the `follow` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `author_id` on the `like` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to drop the column `image` on the `post` table. All the data in the column will be lost.
  - You are about to alter the column `author_id` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `author_id` on the `share` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - Added the required column `author_id` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_parent_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_post_id_fkey`;

-- AlterTable
ALTER TABLE `bookmark` MODIFY `author_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `parent_post_id`,
    ADD COLUMN `author_id` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `title` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `follow` MODIFY `followed_id` INTEGER NOT NULL,
    MODIFY `follower_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `like` MODIFY `author_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    MODIFY `author_id` INTEGER NOT NULL,
    MODIFY `ingredients` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `share` MODIFY `author_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Comment_post_id_fkey_idx` ON `comment`(`post_id`);

-- CreateIndex
CREATE INDEX `Post_author_id_fkey` ON `post`(`author_id`);

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `Comment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `Comment_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `follow` ADD CONSTRAINT `follow_followed_id_fkey` FOREIGN KEY (`followed_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `follow` ADD CONSTRAINT `follow_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `Post_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
