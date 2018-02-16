const express = require('express');
const bodyParser = require('body-parser');
const massive = require ('massive');
const cors= require('cors');
require('dotenv').config()
const products_controller = require('./products_controller');

const app = express();
app.use(bodyParser.json());
app.use (cors() );


const port = 3000;


app.post( '/api/product', products_controller.create );
app.get( '/api/products', products_controller.getAll );
app.get( '/api/product/:id', products_controller.getOne );
app.put( '/api/product/:id', products_controller.update );
app.delete( '/api/product/:id', products_controller.delete );

massive(process.env.CONNECTION_STRING).then(dbInstance =>{
    app.set('db',dbInstance);
    app.listen(port, () => {
      console.log('Started server on port', port);
    });
  }); 