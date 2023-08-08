-- CreateTable
CREATE TABLE "user_User" (
    "id" SERIAL NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "user_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "product_Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_Image" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMPTZ,

    CONSTRAINT "product_Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_User_login_key" ON "user_User"("login");

-- AddForeignKey
ALTER TABLE "product_Image" ADD CONSTRAINT "product_Image_ibfk_1" FOREIGN KEY ("productId") REFERENCES "product_Product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
