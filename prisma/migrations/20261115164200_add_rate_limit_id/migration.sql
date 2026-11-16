ALTER TABLE "RateLimit" ADD COLUMN "id" TEXT;

UPDATE "RateLimit"
SET "id" = "key"
WHERE "id" IS NULL;

ALTER TABLE "RateLimit" ALTER COLUMN "id" SET NOT NULL;

ALTER TABLE "RateLimit" DROP CONSTRAINT "RateLimit_pkey";
ALTER TABLE "RateLimit" ADD CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("id");

CREATE UNIQUE INDEX "RateLimit_key_key" ON "RateLimit"("key");
