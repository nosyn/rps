DO $$ BEGIN
 CREATE TYPE "public"."reference_source_enum_status" AS ENUM('uploaded', 'in_progress', 'active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "reference_source_table" ADD COLUMN "status" "reference_source_enum_status" NOT NULL;