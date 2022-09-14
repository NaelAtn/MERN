const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


exports.register = async(req,res) => {
    try { 
        const {name,email,password,phone} = req.body;
        const foundUser = await User.findOne({email})
        if (foundUser){
            return res.status(400).send({errors : [{msg : "e-mail already used"}]})
        }
        const saltRounds = 10 ;
        const hashedPassword = await bcrypt.hash(password , saltRounds)

        const newUser = new User({...req.body})
        newUser.password = hashedPassword

        await newUser.save()

        const token = jwt.sign(
            {id : newUser._id} ,
            process.env.SECRET_KEY ,
            { expiresIn : "24h"}           
            )
        res.status(200).send({msg : "register success" , user : newUser , token })
        
    } catch (error) {
        return res.status(400).send({errors : [{msg : "can not register"}]})
    }
}


exports.login= async(req,res) => {
   try {
    const {email , password} = req.body
    const foundUser = await User.findOne({email}) ;

    if (!foundUser) {
        return res.status(400).send({errors : [{msg : " bad credential !!!"}]})
    }
    const checkPassword = await bcrypt.compare(password , foundUser.password )

    if (!checkPassword) {
        return res.status(400).send({errors : [{msg : " bad credential !!!"}]})
    }
    
    const token = jwt.sign(
        {id : foundUser._id} ,
        process.env.SECRET_KEY ,
        { expiresIn : "24h"}           
        )

    res.status(200).send ({msg:"login success" , user:foundUser ,token })

   } catch (error) {
        return res.status(400).send({errors : [{msg : " can not login ... please verify your infos!!!"}]})
   }
}