const Customer=require('../model/CustomerSchema');

const saveCustomer=(req,res)=>{
    try {
        const customer=new Customer({
            id:req.body.id,
            name:req.body.name,
            address:req.body.address,
            salary:req.body.salary,
        });
        customer.save().then(result=>{
            res.status(200).json({state:true,data:result});

        }).catch(error=>{
            console.log(error)
            res.status(200).json({state:false,error:error})
        })
    }catch (e){

    }


}

const updateCustomer=(req,res)=>{
    try{
        Customer.updateOne({id:req.body.id},{
            $set:{
                name:req.body.name,
                address:req.body.address,
                salary:req.body.salary,
            }

        }).then(updateData=>{
            res.status(200).json({message:'Completed'});
        }).catch(error=>{
            console.log(error);
            res.status(500).json({message:'wrong'})
        })



    }catch (err){
        return res.status(401).send("hfhh")

    }

}

const deleteCustomer = (req,resp) => {
    Customer.deleteOne({id: req.header.id}).then(result => {
        if (result.deletedCount > 0) {
            resp.status(204).json({message: 'Completed'});
        } else {
            console.log(result)
            resp.status(500).json({message: 'wrong'})
        }
    }).catch(error => {
        console.log(error);
        resp.status(404).json({message: 'no yet'});

    })





}
// const getPropertyType =  (req, res) => {
//
//
//     PropertyType.find({'status':true},(error, result) => {
//         console.log(result)
//         if (result != null) {
//             // console.log(result[1].showStatus)
//             res.status(200).json(result[0].status)
//         } else {
//             res.status(200).json({message: "Couldn't find any records ", state: false});
//         }
//     })
// }
const getAllCustomer=(req,res)=>{
    Customer.find((error,results)=>{
        console.log(results)
        if (results!=null){
            res.status(200).json(results)
        }else {
            res.status(200).json({message:"could not find any records",state:false})
        }
    })
}

const searchCustomer=(req,res)=>{
    Customer.find({'name':req.body.name},(error,results)=>{
        console.log(results)
        if (results!=null){
            res.status(200).json(results)
        }else {
            res.status(200).json({message:"could not find any records",state:false})
        }
    })
}
//
// const searchCustomer=(req,res)=>{
//     Customer.findById((error,results)=>{
//         console.log(results)
//         if (results!=null){
//             res.status(200).json(results)
//         }else {
//             res.status(200).json({message:"could not find any records",state:false})
//         }
//     })
// }



module.exports = {
    saveCustomer,
    updateCustomer,
    deleteCustomer,
    getAllCustomer,
    searchCustomer
}