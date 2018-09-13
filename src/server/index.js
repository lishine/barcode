import express from 'express'
const expressStaticGzip = require('express-static-gzip')
const path = require('path')

const os = require('os')

const app = express()

const dist = path.resolve(__dirname, '../../dist')
app.use(expressStaticGzip(dist))
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }))
app.get('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
app.use('*', (req, resp) => resp.sendFile(path.resolve(dist, 'index.html')))
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening on port', PORT))
