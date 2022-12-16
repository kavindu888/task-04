const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({

    firstName:{type:String,require:true},
    lastName:{type:String},
    email:{type:String,require:true},
    password:{type:String,require:true},
    mobile:{type:String,require:true,minLength:10,maxLength:12},
    verified:{type:Boolean}




})
module.exports=mongoose.model('User',UserSchema);


 