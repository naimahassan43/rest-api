const express = require('express');
const app = express();

//Basic Routes
app.get('/',(req,res) => {
   res.send('Hello, world!');
})

const products = [
   { id: '1', name: 'Mango', price: 123},
   { id: '2', name: 'Banana', price: 150}

]
/******Show list of Products*****/
 //route
   app.get('/api/products',(req,res) => {
      res.json(products);
   })
/******Show a specific Product******/
   app.get('/api/products/:id',(req,res) => {
      const {id} = req.params;
      const product = products.find(prod => prod.id === id);
      if(!product) {
         return res.status(404).json({error:'No product found with this ID'})
      }
   return res.json(product);
   })
/*******Insert a Product*****/

/******Update a specific Product (PUT)******/

/******Update a specific Product (PATCH)******/

/******Delete a specific Product ******/
/******Delete all Products******/ 



app.listen(3000,()=>{
   console.log('server is running')
});