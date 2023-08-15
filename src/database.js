import pg from "pg"
import dotenv from "dotenv"

const { Pool } = pg;
dotenv.config();

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

export const db = new Pool(configDatabase);