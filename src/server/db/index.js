const pgp = require('pg-promise')({})
const config = {
	host: 'localhost',
	port: 5432,
	database: 'barcode',
	user: 'admin',
}

export const db = pgp(config)

const sql = require('./sql').users

export function initDB() {
	db.none(sql.create)
}
export function createDB() {
	db.none(sql.create)
}
export function deleteDB() {
	db.none(sql.drop)
}

// app.get('*.js', function(req, res, next) {
//     req.url = req.url + '.gz';
//     res.set('Content-Encoding', 'gzip');
//     res.set('Content-Type', 'text/javascript');
//     next();
//   });

//   app.get('*.css', function(req, res, next) {
//     req.url = req.url + '.gz';
//     res.set('Content-Encoding', 'gzip');
//     res.set('Content-Type', 'text/css');
//     next();
//   });
