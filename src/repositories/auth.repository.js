import { db } from "../database/databaseConnection.js";

export async function CreateUser(username, profileUrl, email, hash) {
    const result = await db.query(`INSERT INTO users(username, "profileUrl", email, hash) VALUES ($1, $2, $3, $4) RETURNING id`, [username, profileUrl, email, hash]);

    return result.rows[0].id;
};

export async function ReadUserById(userId) {
    const result = await db.query(`SELECT * FROM users WHERE id = $1`, [userId]);
    
    if(result.rowCount === 0) return null;
    return result.rows[0];
};

export async function ReadUserByEmail(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    
    if(result.rowCount === 0) return null;
    return result.rows[0];
};

export async function CreateSession(userId) {
    await db.query(`INSERT INTO sessions("userId", token) VALUES ($1, null)`, [userId]);
};

export async function UpdateSession(userId, token) {
    await db.query(`UPDATE sessions SET token = $2 WHERE "userId" = $1`, [userId, token]);
};
