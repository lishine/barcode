export const create = `
        CREATE TABLE profile (
            user_id INTEGER PRIMARY KEY,
            CPF INTEGER,
            CEP INTEGER,
            name VARCHAR(255) NOT NULL, 
            phone VARCHAR(55), 
            address VARCHAR(255), 
            state VARCHAR(55), 
            city VARCHAR(55)
        )
    `

export const drop = `DROP TABLE profile`
