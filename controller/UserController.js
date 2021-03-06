const UsertSchema=require('../model/UserSchema');
const bcrypt=require('bcrypt')
const jwtToken=require('jsonwebtoken')

const signUp=(req,res)=>{
    bcrypt.hash(req.body.password,10,function (err,hash){
        const user=new UsertSchema({
            email:req.body.email,
            password:hash,
            name:req.body.name,

        });
        user.save().then(result=>{
            const token=jwtToken.sign({
                email:req.body.email,
                name:req.body.name,
            },'key')
            res.status(201).json({result:token,message:'saved'})

        }).catch(erro=>{
            res.status(500).json({error:erro,message:"hukapan"})
        })

    })


}
const login=(req,resp)=> {
    UsertSchema.findOne({email: req.body.email}).then(existsUser => {
        if (existsUser != null) {

            bcrypt.compare(req.body.password, existsUser.password, function (err, result) {
                if (result) {
                    const token = jwtToken.sign({
                        email: req.body.email,
                        name: req.body.name,

                    }, 'key');
                    resp.status(200).json({result: token})
                } else {
                    resp.status(401).json({message: "UnAuthorize Attept"})
                }
            });


        } else {
            resp.status(404).json({message: "Not FGound"})
        }

    });



}
module.exports={
    signUp,login
}