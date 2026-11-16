ALTER TABLE "RateLimit"
ALTER COLUMN "lastRequest" TYPE BIGINT
USING "lastRequest"::BIGINT;
