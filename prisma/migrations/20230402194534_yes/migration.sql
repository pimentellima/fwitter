-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `author_id` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(191) NOT NULL,
    `ingredients` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_post_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    UNIQUE INDEX `Comment_parent_post_id_key`(`parent_post_id`),
    UNIQUE INDEX `Comment_post_id_key`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmark` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `author_id` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Bookmark_post_id_author_id_key`(`post_id`, `author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Share` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `author_id` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Follow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `followed_id` VARCHAR(191) NOT NULL,
    `follower_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Follow_followed_id_follower_id_key`(`followed_id`, `follower_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `author_id` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Like_post_id_author_id_key`(`post_id`, `author_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parent_post_id_fkey` FOREIGN KEY (`parent_post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Share` ADD CONSTRAINT `Share_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
