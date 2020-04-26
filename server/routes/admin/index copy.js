module.exports = app =>{
  const express = require('express')
  const router = express.Router()
  const Category = require('../../models/Category')
  router.post('/categorites' , async(req , res)=>{
     const model = await Category.create(req.body)
     res.send(model)
  })

  router.put('/categorites/:id' , async(req , res)=>{
    const model = await Category.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
 })

 router.delete('/categorites/:id' , async(req , res)=>{
    await Category.findByIdAndDelete(req.params.id,req.body)
  res.send({
    success: true
  })
})

  router.get('/categorites', async(req,res) =>{
    const items = await Category.find().populate('parent').limit(10)
    res.send(items)

  })

  router.get('/categorites/:id', async(req,res) =>{
    const model = await Category.findById(req.params.id)
    res.send(model)

  })

    app.use('/admin/api/',router)
}