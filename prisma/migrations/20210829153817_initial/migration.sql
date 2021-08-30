-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_slug" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_price" INTEGER NOT NULL,
    "product_images" JSONB NOT NULL,
    "user_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commment" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "upvote" INTEGER NOT NULL DEFAULT 0,
    "downvote" INTEGER NOT NULL DEFAULT 0,
    "product_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Product.product_slug_unique" ON "Product"("product_slug");

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commment" ADD FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
