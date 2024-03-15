// index() listagem de session // list
// show() lista 1 session // 
// store() criar 1 session // create / insert
// update() alterar 1 session // update
// destroy() exclui 1 session // delete / remove

const User = require('../models/User');

module.exports = {
    async store(req, res){
        const { email } = req.body;
        // const email = req.body.email;

        if(email){
            let user = await User.findOne({ email }) // verifica se usuário existe

            if (!user){
                user = await User.create( { email } );
            }
            return res.json(user)
        }else{
            return res.json({message: 'Nenhum email enviado !!!'})
        }

      

    },

    async index(req, res){
        user = await User.find();

        return res.json(user);
    }

}

