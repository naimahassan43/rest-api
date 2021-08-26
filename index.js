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
   { id: '2', name: 'Banana', price: 150},
   { id: '3', name: 'Banana', price: 250},
   { id: '4', name: 'Banana', price: 150},

]
/******Show list of Products*****/
 //route
   app.get('/api/products',(req,res) => {
      res.status(200).json(products);
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
   return res.status(200).json(product);
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
   return res.status(201).json(product);
})

/******Update a specific Product (PUT== req.body te entire obj dite hoy)******/
app.put('/api/products/:id',(req,res)=>{
   const {error} = validation(req.body);
   if(error) {
      return res.status(400).json({
         message:error.details[0].message
      })
   }

   const index = products.findIndex(prod=>prod.id ===req.params.id);
   if(index=== -1) {
      return res.status(404).json({
         message: 'Product is not found with this ID'
      })
   }
  products[index].name = req.body.name;
  products[index].price = req.body.price;
  
//   return res.sendStatus(204);== no content only status
  return res.status(200).json({
     product: products[index]
  });

})
/******Update a specific Product (PATCH== only je info update korbo seta dibo)******/

app.patch('/api/products/:id',(req,res)=>{

   const {error} = validationForPatch(req.body);
   if(error) {
      return res.status(400).json({
         message:error.details[0].message
      })
   }

   const index = products.findIndex(prod => prod.id ===req.params.id);

   if(index=== -1) {
      return res.status(404).json({
         message: 'Product not found with this id'
      })
   }

   let updatedProduct = {
      ...products[index],
      ...req.body
   }
   products[index] = updatedProduct;
   return res.status(200).json({updatedProduct})
})

/******Delete a specific Product ******/
app.delete('/api/products/:id',(req,res)=>{
   const product = products.find(prod=> prod.id===req.params.id);
   if(!product){
      return res.status(404).json({
         message: 'Product is not found with this ID'
      })
   }

   const index = products.findIndex(prod=> prod.id===req.params.id);
   products.splice(index, 1);

   return res.status(200).json(product);
})

/******Delete all Products******/ 
app.delete('/api/products', (req,res)=>{
   products.splice(0);
   return res.status(200).json(products);
})



//Validation function
function validation (body) {
   const schema =Joi.object({
      name: Joi.string().min(3).max(20).required(),
      price:Joi.number().required(),
   });

   return schema.validate(body);
}

//Validation function for Update method
function validationForPatch (body) {
   const schema =Joi.object({
      name: Joi.string().min(3).max(20),
      price:Joi.number(),
   });

   return schema.validate(body);
}

app.listen(3000,()=>{
   console.log('server is running')
});