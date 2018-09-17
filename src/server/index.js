import express from 'express'
const path = require('path')

const os = require('os')

const app = express()

app.use(express.static('dist'))
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }))


app.use('*', (req, resp) => resp.sendFile(path.resolve(__dirname, '../../dist/index.html')))
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening on port', PORT))








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
  