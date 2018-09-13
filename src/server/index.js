import express from 'express'
const path = require('path')

const os = require('os')

const app = express()

app.use(express.static('dist'))
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }))

app.get('*.js', function(req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });

app.use('*', (req, resp) => resp.sendFile(path.resolve(__dirname, '../../dist/index.html')))
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening on port', PORT))
