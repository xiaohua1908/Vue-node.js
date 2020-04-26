const mongoose = require('mongoose')

// Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection

const schema = new mongoose.Schema({
    name: { type: String },
// 要指定类型为 ObjectId，在声明中使用 Schema.Types.ObjectId    
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

module.exports = mongoose.model('Category', schema)