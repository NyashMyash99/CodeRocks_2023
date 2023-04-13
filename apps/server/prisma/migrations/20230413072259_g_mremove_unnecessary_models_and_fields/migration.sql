/*
  Warnings:

  - You are about to drop the column `category` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.
  - You are about to alter the column `deadline` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "category",
DROP COLUMN "price",
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "maxPrice" INTEGER NOT NULL,
ADD COLUMN     "minPrice" INTEGER NOT NULL,
ALTER COLUMN "deadline" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Review";

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateTable
CREATE TABLE "_Performers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Performers_AB_unique" ON "_Performers"("A", "B");

-- CreateIndex
CREATE INDEX "_Performers_B_index" ON "_Performers"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Performers" ADD CONSTRAINT "_Performers_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Performers" ADD CONSTRAINT "_Performers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
