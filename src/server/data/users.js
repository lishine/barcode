import { db } from '../db'

export function insert({ name, email, password }) {
	const query = `
        INSERT INTO users
        (name, email, password)
        VALUES (${name}, ${email}, ${password})
        RETURNING *`
	return db.one(query, { name, email, password })
}

export function create() {
	const query = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL, 
            email VARCHAR(255) NOT NULL UNIQUE, 
            password TEXT NOT NULL
        )`
	return db.none(query)
}

export function drop() {
	const query = `DROP TABLE users`
	return db.none(query)
}
