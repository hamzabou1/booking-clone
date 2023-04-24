const router = require('express').Router();
const jwt = require("jsonwebtoken");
const user = require('../models/user')
const bcrypt =  require('bcryptjs');


const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(500).json("error");
    }
    try {
      const data = jwt.verify(token, "YOUR_SECRET_KEY");
            req.userId = data.id;
            req.userRole = data.role;
      return next();
    } catch {
      return res.status(500).json("error");
    }
  };

  const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token;
    try {
        const data = jwt.verify(token, "YOUR_SECRET_KEY");
        req.userId = data.id;
        if(req.userId === req.params.id) {
            return next();
        }
        else {
        next(`you dont have the permission to delete this user with the ${req.params.id}`)
        }

    } catch (error) {
        next('you are not connected')
    }

  }

  const isAdmin = (req , res , next) => {

    const token = req.cookies.access_token;
    if(token) {

        try {   
            const data = jwt.decode(token , "YOUR_SECRET_KEY")
            req.Admin= data.isAdmin ;
            if(req.Admin == true ) {
                return next();
            }else {
               next("you are not admin")
            }
        } catch (error) {
            console.log(err)
        }
    }else {
        next('you are not connected')
    }

  }


router.post('/register' , async (req, res , next)=>  {
    const newUser = user(req.body)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password , salt);
    try {
        const savedUser = new user ({
            username:req.body.username ,
            email:req.body.email,
            password:hash
        })
        await savedUser.save();
        res.status(201).json(savedUser)
        window.location.reload(false)

    }catch(err) {
        next(err)
    }
})

router.post('/login' , async (req , res , next)=>  { 

    const Finduser = await user.findOne({ email: req.body.email });
          if (!Finduser) return next("User not found!");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      Finduser.password
    );
    if (!isPasswordCorrect)
    return next( "Wrong password or username!");

    const token = jwt.sign({ id: Finduser._id , isAdmin:Finduser.isAdmin }, "YOUR_SECRET_KEY");
           const { password, isAdmin, ...otherDetails } = Finduser._doc;   
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.JWT_SECRETE === "production",
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  });

//// get method

router.get('/'  , isAdmin , authorization ,   async (req , res)=>  {


    try {
        const getUsers = await user.find();
        res.status(201).json(getUsers)

    }catch(err){
        res.json(err).status(500);
    }

})
//// get by ID 


router.get('/:id'  , verifyUser ,  async (req , res )=>  {
    
  
    try {
        const OneUser = await user.findById(req.params?.id );
        res.status(201).json(OneUser);

    }catch(err){
        res.status(500).json("impossible de faire cet requete");
    }


}    )


//// delete method 

router.delete('/:id' , verifyUser  , async (req , res , next)=>  { 

    try {   
        const deleteOneUser = await user.findByIdAndDelete(req.params?.id);
      
        res.clearCookie("access_token").status(201).json(`user ${deleteOneUser.username} has been deleted`)
    }catch(err) {
        next(err);    }


})
/// delete all users
router.delete('/' , isAdmin ,  async (req , res)=>  { 

    try {   
        const deleteOneUser = await user.deleteMany();
        res.clearCookie('access_token').status(201).json(" all users has been deleted")
    }catch(err) {
        res.status(500).json("impossible de supprimer cet utulisateur");
    }

})

/// update user 

router.put('/:id', verifyUser ,  async (req , res)=>  {


    try {
        const update = await user.findByIdAndUpdate(req.params?.id  , {$set: req.body } ,  { new: true });
        res.clearCookie(req.cookies.access_token).status(201).json(update)

    } catch (error) {
        res.status(500).json("you are not connected")
    }



})
module.exports = router 