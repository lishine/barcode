# Login Full Stack project

Complete login project, ready to be deployed to Heroku, using heroku PostgreSQL

## Technologies being used

- Webpack 4
- React
- Redux-saga
- React-easy-state
- Styled components
- Formik
- Express
- PostgreSQL
- Massive

## In the process

- CSS
- Profile
- Reducing redux boilerplate

## TODO

- Documentation of the project and VSCode config
- Reset store on logout
- Redux dev-tools in production mode

## In the future

- Flow
- Consider saving token in cookie or using session instead of token
- express error log middleware
- Limit express requests number per second
- token expire
- token blacklisting
- SSR
- Separate client and server
- Add webpack for server
- Send email with react render
- HMR and HRR ready

### Thanks for simple-react-full-stack with getting running

### Using

- PostgreSQL pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
- Command line db access: massive -d barcode

### SVGR config - purifying raw svg

- Find svg that you like, pass it through https://svgr.now.sh/ with config set to the bellow and put in a separate file

{ "plugins": [{ "removeTitle": true }, {"removeViewBox": false},{"removeDimensions":true},
{"addClassesToSVGElement": {"className": "svg"}} ] }

### SVGs resources

https://www.zondicons.com/icons.html
http://glyph.smarticons.co/
