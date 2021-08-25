const express = require('express');
const app = express();
const Joi = require('joi');

const { v4: uuidv4 } = require('uuid');


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
         return res.status(404).json({
            error:'No product found with this ID'
         })
      }
   return res.json(product);
   })

/*******Insert a Product*****/
app.use(express.json());

app.post('/api/products',(req,res)=>{

   const {error} = validation(req.body)

   if(error) {
      return res.status(400).json({
         message:error.details[0].message
      });
   }

   const product = {
      id:uuidv4(),
      name:req.body.name,
      price:req.body.price,
   }
   products.push(product);
   return res.json(product);
})

/******Update a specific Product (PUT)******/

/******Update a specific Product (PATCH)******/

/******Delete a specific Product ******/
/******Delete all Products******/ 


//Validation function
function validation (body) {
   const schema =Joi.object({
      name: Joi.string().min(3).max(20).required(),
      price:Joi.number().required(),
   });

   return schema.validate(body);
}


app.listen(3000,()=>{
   console.log('server is running')
});