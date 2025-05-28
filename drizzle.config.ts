import { defineConfig } from "drizzle-kit";

// Local development database URL (hardcoded)
const url = 'postgresql://app:secret@127.0.0.1:5433/db';

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
});
