-- DropForeignKey
ALTER TABLE "ContactPhoto" DROP CONSTRAINT "ContactPhoto_contactId_fkey";

-- AddForeignKey
ALTER TABLE "ContactPhoto" ADD CONSTRAINT "ContactPhoto_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
