const path = require('path');
const fs = require('fs');
const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const saltRounds = 10;

const jsonUsers = fs.readFileSync(path.resolve(__dirname, '../db/users.json'), 'utf-8');
const users = JSON.parse(jsonUsers); 




const nuevoUserId = () => {
    let ultimo = 0;
    users.forEach(user => {
        if (user.id > ultimo) {
            ultimo = user.id;
        }
    });
    return ultimo + 1;
}

module.exports = {
    home: (req, res) => {

        res.render('users');
    }
    ,
    register: (req, res) => {
        res.render('register');  
    },

    store (req, res) {
       
        let userImage = req.file.filename
       
        let newUser = {
            id: nuevoUserId(),
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            image: userImage || "default-image2.png"
        }
        console.log(req.file);
        if(req.file){
            users.push(newUser);
            let jsonUsers = JSON.stringify(users, null, 4);
            fs.writeFileSync(path.resolve(__dirname, '../db/users.json'), jsonUsers);
            res.redirect('/');
        }else{
            res.render("/")
        }    
    },
    
    loginView: (req, res) => {
        res.render('login');
    },
    login: (req, res) => {        
        for(let i = 0; i< users.length; i++){
            if ( users[i].email == req.body.email){
                if(bcrypt.hashSync(req.body.password, users[i].password)){
                    var userToLog = users[i];
                    break;
                }
            }
        }
        if(userToLog == undefined){
            return res.render("login",{errors :[
                {msg: "La contraseña o el email son incorrectas, revisa los campos y logueate de nuevo"}
            ]})
        }
        req.session.loggedUser = userToLog;
        res.redirect("/users/profile");
    },

    profileView:(req, res)=> {
        let user = req.session.loggedUser
        
        res.render("profile",{"user":user})
        //+res.send(user)
    }
}


// if (bcrypt.compareSync(req.body.password)
