import { query } from "express";
import { db as connection } from "../database/databaseConnection.js";

export async function searchUsersRepository(string) {
  return connection.query(
    `SELECT * FROM users WHERE "userName" ILIKE $1`,
    [`%${string}%`]
  );
}
