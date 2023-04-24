const router = require("express").Router();
const room = require("../models/room");
const jwt = require("jsonwebtoken");
const hotel = require("../models/hotel");

///  verify token 


const isAdmin = (req , res , next) => {

    const token = req.cookies.access_token; /// on cherche le token
    if(token) { // si existe

            const data = jwt.verify(token , "YOUR_SECRET_KEY") /// verify pour decodage du token 
            req.Admin= data.isAdmin ; /// verifier si le user est admin
            if(req.Admin == true ) { // si c vraie
                return next(); // on continue le traitement
            }else {
               next("you are not admin") // sinon on lui renvoie error
            }
     
    }else { // sinon error
        next('you are not connected')
    }

  }



router.get("/" , async (req , res , next) => { 

    try {
        const oneRoom =  await room.find();
        res.status(200).json(oneRoom);

    } catch (error) {
       res.status(500).json("there some erros")
    }

})

router.post("/:hotelId" , async (req , res , next)=> { 

    const newRoom = room(req.body)
    const hotelId = req.params.hotelId // id de l'hotel a partir du paramas
    try {
        const oneRoom = await newRoom.save(); // on ajoute la chambre
        try {
            await hotel.findByIdAndUpdate( hotelId ,{$push: {rooms: oneRoom._id }}) // on cherche l'hotel par son id et apres on update la case room on ajoutant id de la chambre
        }catch(err) {
            next(err)
        }
        res.status(200).json(oneRoom);
    }   catch (error) {
        next(error)
    }
})

//// UPDATE THE DETAILS ROOM

router.put('/:id' , async (req , res , next)=> { 

    const requete = req.params.id
    try {
        const update = await room.findByIdAndUpdate(requete , {$set: req.body } , {new:true})
        res.status(200).json( `the room has been updated ${update}` )
    }catch(err){
        next(error)
    }

})

/// delete one hotel 

router.delete('/:id/:hotelId' , isAdmin , async (req , res , next)=> { 

    const requete = req.params.id  /// id du room
    const hotelId = req.params.hotelId ; // id de l'hotel 
    try {
        const deleteOne = await room.findByIdAndDelete(requete); /// on supprime la chambre 
        try {
            await hotel.findByIdAndUpdate(hotelId , {$pull: {rooms: requete }}) // on supprime la chambre a partir de l'hotel
        } catch (error) {
                next(err)
        }
        res.status(200).json(`the room ${deleteOne.title} has been deleted`) // la chambre est bien supprimer
        
    } catch (error) {
        next(error)
    }
})

/// delete all hotels 

router.delete('/:hotelId', isAdmin , async (req , res , next)=> { 

    const hotelId = req.params.hotelId ;
    const oneHotel = hotel(req.body)

    try {
         await room.deleteMany();
         try {
            console.log(oneHotel.rooms[0])
            await hotel.findByIdAndUpdate(hotelId , {$pull : {rooms : oneHotel.rooms[0]} })
            console.log(oneHotel)
         } catch (error) {
             next(error)
         }
        res.status(200).json(`all rooms has been deleted`)
        
    } catch (error) {
        next(error)
    }
})


/// update availability in rages dates

router.put('/availability/:id' , async (req , res , next)=> { 

    try {
         await  room.updateOne({"roomNumbers._id": req.params.id} , /// on va mettre a jour la chambre avec qui a le id dans le params

        { $push: { /// on rajoute les nouvelles dates pour cette chambre
             "roomNumbers.$.unavailableDates": req.body.dates
         }}
         
         ) 
         res.status(200).json("room has benn updated")
    }
    catch(err) {
        next(err)
    }

})









module.exports = router  /// pour exporter les fonctions