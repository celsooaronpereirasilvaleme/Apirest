const Spot = require('../models/Spot');

const  show = async(req, res) => {
        const {user_id} = req.headers
  
        const spots = await Spot.find({user: user_id})

        return res.json(spots);
}

module.exports = {
    show
}