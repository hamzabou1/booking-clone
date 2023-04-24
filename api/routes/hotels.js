const router = require("express").Router();
const Hotel = require('../models/hotel');
const Room = require('../models/room')

router.post('/' , async (req , res) => {

    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);

    }catch(err) {
        res.status(403).json(err)
    }
});

router.get('/find' , async (req , res)=> {

    try {
        const getHotels = await Hotel.find();
        res.status(201).json(getHotels);
    }
    catch(err) {
        console.log(err);
    }

})

// get hotels 

/// gt:  plus que ---- ls: moins que 
/// limit : pour limier le resultat voulu 


router.get("/oneCity" , async(req , res , next) => { 

    const {min , max , ...others} = req.query ;
    try {

        const list = await Hotel.find({

            city: { '$regex': `${req.query.city}`, '$options': 'i' },
            lowPrice : { $gt: min | 1, $lt: max || 999 } 
    }, {}).limit(req.query.limit)
        res.status(200).json(list);
        
    } catch (error) {
        next(error)
    }



})

router.get("/oneName" , async(req , res , next) => { 

    const {min , max , ...others} = req.query ;
    try {

        const list = await Hotel.find({

            name: { '$regex': `${req.query.name}`, '$options': 'i' },
            lowPrice : { $gt: min | 1, $lt: max || 999 } 
    }, {}).limit(req.query.limit)
        res.status(200).json(list);
        
    } catch (error) {
        next(error)
    }



})


/// get a spesefic hotel

router.get('/find/:id' , async (req , res )=> {

    try {
        const getOneHotel = await Hotel.findById(req.params.id);
        res.status(201).json(getOneHotel);
    } catch (error) {
        res.status(500).json(error);
    }

})

// Get count cities 


router.get('/countByCity' , async (req , res  , next)=> {

    const cities = req.query.cities?.split(",")

    try {
        const list = await  Promise.all(cities.map(city => {
                    
            return Hotel.find({city:city})
        }            ))
        res.status(200).json(list)
        
    } catch (error) {
        next(err)
    }

})


/// get bby country 

router.get('/country' , async (req , res , next) => {

     const countries = req.query.countries.split(',') ;

     try {

        const list = await Promise.all(countries.map(country => {
            return Hotel.find({country:country})
            
        }))
        res.status(200).json(list)

     }catch(err) {
        next(err)
     }

})

/// on cherche par rapport le pays loved 
router.get('/countryLoved' , async (req , res , next) => {

    try {

       
            const list =  await Hotel.find();
            const rek =     list.map((item , i) => {
                if(item.country) {

                    return {
                        country:item.country
                    }
                }
            }

                )
       

       const sek = Object.entries(rek)
        let tab = []
            for(let i=0 ; i<sek.length ; i++) {
                    tab.push(rek[i].country)

            }
            const count = {};
            for (const element of tab) {
              if (count[element]) {
              count[element] += 1
              } else {
               count[element] = 1
              }
            }
            const x1 = Object.entries(count)

            res.status(200).json( x1 )

    }catch(err) {
       next(err)
    }

})

/// count by Type

router.get('/countByType' , async (req , res , next)=> {


    try {
            const hotel = await Hotel.countDocuments({ type: { '$regex': `hotel`, '$options': 'i' }}) // permet de calculer les docs qui contient kle type hotel
            const appartement = await Hotel.countDocuments({type: "appartement" ,  '$options': 'i'  })
            const resorts = await Hotel.countDocuments({type: "resort" ,  '$options': 'i'  })
            const Cabins = await Hotel.countDocuments({type: "cabin" ,  '$options': 'i'  })
            const cottages = await Hotel.countDocuments({type: "cottage" ,  '$options': 'i'  })
            const glamping = await Hotel.countDocuments({type: "glamping" ,  '$options': 'i'  })
            const servicedApartments = await Hotel.countDocuments({type:"serviced apartment" ,  '$options': 'i'  })
            const holidayHomes = await Hotel.countDocuments({type:"holiday home" ,  '$options': 'i'  })
            const GuestHouses = await Hotel.countDocuments({type:"guest house" ,  '$options': 'i'  })

            res.status(200).json([
                {type: "Hotels" , count: hotel}, // le resulat
                {type: "Appartements" ,  count: appartement},
                {type: "Resorts" ,  count: resorts},
                {type: "Cabins" , count:  Cabins},
                {type: "Cottages" , count:  cottages},
                {type: "Glamping" , count:  glamping},
                {type: "Serviced apartments" , count:  servicedApartments},
                {type: "Holiday homes" ,  count: holidayHomes},
                {type: "Guest houses" , count:  GuestHouses},

            ])

    }catch(err) {
        next(err)
    }

})

/// delete one hotel 

router.delete('/find/:id' , async (req , res)=> {

    try {
        const deletOneHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(201).json("the hotel has been deleted")
    } catch (error) {
        res.status(500).json("some errors")
    }



})

/// delete all hotels 

router.delete('/' , async (req , res) => {

    try {
        const deleteAllHotels = await Hotel.deleteMany();
        res.status(200).json("all hotels has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }

})


/// update one hotel

router.put('/find/:id' , async (req , res) => {

    try {
            const updateHotel = await Hotel.findByIdAndUpdate(req.params.id , {$set: req.body});
            res.status(201).json(updateHotel);
    } catch (error) {

        res.status(500).json(error)
    }


})

/// 

router.get('/oneRoom/:id' , async (req , res , next)=> {

    const hotelId = req.params.id 

    try {
        const hotel = await Hotel.findById(hotelId); /// on va cherrcher l'hoterl à travers son ID 
        const list = await Promise.all(hotel.rooms.map((room) => { // on va mapper sur l'hotel pour avoir les rooms 
            return Room.findById(room) /// on recoit toutes les chambres dispo au niveau de cet hotel 
        }))
        res.status(200).json(list)
    } catch (error) {
        
    }

})

/// find lows price 


router.get("/lol")

module.exports = router ;
