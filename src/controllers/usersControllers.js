const path = require('path');
const fs = require('fs');
const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
<<<<<<< HEAD
const db =require("../../database/models")
=======
const db = require("../database/models");
>>>>>>> c5b9f373af1853917b4fe75840e89a89ab085b67


module.exports = {
    register: (req, res) => {
        res.render('register');  
    },

    renderUserList: (req, res) => {
        db.Users.findAll()
            .then((users)=>{
                return res.render("listUsers",{ users });
            }).catch((error)=>{
                return res.send(error)
            })
    },
    
    store (req, res) {
        db.Users.create({
            first_name:req.body.firstname,
            last_name:req.body.lastname,
            email:req.body.email,
            avatar:req.file.filename,
            password:bcrypt.hashSync(req.body.password, 10),
        })
            .then(()=>{
                res.redirect('/')
            }).catch((error)=>{
                res.send(error)
            })
    },
    
    loginView: (req, res) => {
        res.render('login');
    },
    login: (req, res) => {        
        for(let i = 0; i< users.length; i++){
            if ( users[i].email == req.body.email){
                if(bcrypt.compareSync(req.body.password, users[i].password)){
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
        
    },
    viewUpdateUser:(req,res)=>{
        db.Users.findByPk(req.params.id)
            .then((user)=>{
                return res.render("updateUser",{user});
            })
        
    },
    updateUser: (req,res) =>{
        
        db.Users.update({
            first_name:req.body.firstname,
            last_name:req.body.lastname,
            email:req.body.email,
            avatar:req.file.filename,
            password:bcrypt.hashSync(req.body.password, 10),

<<<<<<< HEAD
        
        console.log(req.file)
        users.forEach(user => {
            if (user.id == req.params.id) {
                
                user.firstname = req.body.firstname;
                user.lastname = req.body.lastname;
                user.image = req.file ? req.file.image : user.image;
            }
=======
        },{
            where:{id:req.params.id}
        }).then(()=>{
            return res.redirect("/");
        }).catch((error)=>{
            return res.send(error)
>>>>>>> c5b9f373af1853917b4fe75840e89a89ab085b67
        })
        
    },
    deleteUser:(req,res)=>{
        db.Users.destroy({
            where:{id:req.params.id},
        }).then(()=>{
            return res.redirect("/")
        })
    }

    
    
}



