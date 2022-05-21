const mongoos=require('mongoose');
const CustomerSchema=new mongoos.Schema(
    {
        id:{
            type:String,
            requires:true

        },
        name:{
            type:String,
            requires:true

        },
        address:{
            type:String,
            requires:true

        },
        salary:{
            type:String,
            requires:true

        },

    }



);
module.exports=mongoos.model('Customer',CustomerSchema)