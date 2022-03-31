const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const path = require('path');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth.router');
const stockRouter = require('./routes/stock.router');


const app = express();
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const swaggerOptions={
  definition:{
      openapi:'3.0.0',
      info:{
          title:'Stock quotes API',
          version:'1.0.0',
          description:'A simple API with Node.js + Express, to allow users to query stock quotes.',
          contact:{
              name:'Sarahaime Rodriguez',
              email:'sarardz095@gmail.com'
          },
          servers:["http://localhost:3001"]
      }
  },
  apis:[`${__dirname}/routes/auth.router.js`, `${__dirname}/routes/stock.router.js`]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/stock', stockRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({});
  next(createError(404));
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
