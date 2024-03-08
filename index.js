const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const userRouter = require('./routes/user.router.js');
const itemsRouter=require('./routes/item.router.js')
const adminRouter=require('./routes/admin.router.js')

app.use("/api/item",itemsRouter);
app.use('/api/user',userRouter);
app.use('/api/admin',adminRouter);

// Connect to MongoDB with error handling
mongoose.connect('mongodb://localhost:27017/CourierItems')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

 app.put('/api/ubdatestatus',async(req,res)=>{
    const {body}=req
    const itemId=body._id
    const newupdate=body.order_status
    console.log(itemId)
    const updatedItem = await ItemModel.findByIdAndUpdate(
      itemId,
      { $set: { order_status: newupdate } },
      { new: true } // Return the updated document
    );
    if (!updatedItem) {
      return res.status(404).send('Item not found');
    }

    res.status(200).json(updatedItem);
 })

app.listen(3001,()=>{
  console.log("Server Is Runnig At:localhost:3001");
})
