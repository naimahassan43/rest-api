const express = require('express');
const app = express();

//Basic Routes
app.get('/',(req,res) => {
   res.send('Hello, world!');
})

app.listen(3000,()=>{
   console.log('server is running')
});