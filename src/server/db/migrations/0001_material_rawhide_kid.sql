UPDATE "contacts" SET "phoneNumber" = '000-000-0000' WHERE "phoneNumber" IS NULL;
ALTER TABLE "contacts" ALTER COLUMN "phoneNumber" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "photoId" text;