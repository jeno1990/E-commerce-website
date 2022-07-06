const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{type:String, required:true},
    desc: {type:String},
    img: {type:String},
    size:{type:String},
    catagory : {type:Array},
    color: {type: String},
    price : {type:Number} 

},{timestamps:true}); 

module.exports = mongoose.model('products',ProductSchema);

