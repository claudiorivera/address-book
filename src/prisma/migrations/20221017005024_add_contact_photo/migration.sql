-- CreateTable
CREATE TABLE "ContactPhoto" (
    "id" TEXT NOT NULL,
    "cloudinaryId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "ContactPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContactPhoto_cloudinaryId_key" ON "ContactPhoto"("cloudinaryId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactPhoto_contactId_key" ON "ContactPhoto"("contactId");

-- AddForeignKey
ALTER TABLE "ContactPhoto" ADD CONSTRAINT "ContactPhoto_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
