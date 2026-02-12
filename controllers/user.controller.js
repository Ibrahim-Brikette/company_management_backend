const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addAdmin= async ()=>{
    try{
        let firstAdmin = await User.findOne( {role : 'admin'} );
        if(firstAdmin ) console.log('the admin is already created');
        else{
            let admin = new User();
            admin.fullName = process.env.ADMIN_NAME ;
            admin.email = process.env.ADMIN_EMAIL;
            admin.password =   bcrypt.hashSync(process.env.ADMIN_PASSWORD,10);
            admin.phone = process.env.ADMIN_PHONE;
            admin.image = process.env.ADMIN_IMAGE;
            admin.date = new Date();
            admin.role = 'admin';
            let savedAdmin = await admin.save();
            console.log('congrats the admin is created');
            
           
        }
        
        


    }
    catch(err){
        console.log(err);
        

    }
}

const addUser = async(req,res,fileName)=>{
    try{
        let {fullName,email,password,phone,tools} = req.body;
        let user = new User();
        user.fullName=fullName;
        user.email = email;

        if(fileName.length > 0) user.image = fileName;
        user.tools = JSON.parse(tools);
        user.password = bcrypt.hashSync(password,10);
        user.role = 'user';
        user.phone = phone;
        user.date = new Date();
        let savedUser = await user.save();
        res.status(200,201).send(savedUser);
        
        


    }
    catch(err){
        res.status(500).send({message : 'server error'});
        console.log(err);
        
    }
}

const signIn = async (req,res)=>{
    try{
        let {email, password} = req.body;
        let user= await  User.findOne({email : email});
        if (!user){
            res.status(400,404).send({message : 'email or password invalid'});
              
            
            
             
        }   
        else{
            if(!bcrypt.compareSync(password,user.password)){
                
                    
                res.status(400,404).send({message : 'email or password invalid'});
             
            }
            else{
                let payload = {
                    id : user._id,
                    fullName : user.fullName,
                    email : user.email,
                    role : user.role,
                    phone : user.phone , 
                    image : user.image ,
                    tools : user.tools 
                }
                let token = jwt.sign(payload,process.env.SECRET_KEY);
                res.status(200).send({myToken : token})

            }

        }
        
    }
    catch(err){
        res.status(500).send({message : 'server error'});
        console.log(err);
    }


}




const byId= async (req,res)=>{
    try{
        let user =await  User.findById({_id : req.params.id})
        res.status(200).send(user);
    
    }
    catch(err){
        res.status(400,404).send({message : 'the user with this id no not exist'});
        console.log(err);
        
    }

}


const udpateUser = async(req,res,fileName)=>{
    try{
        let data = req.body;

        if (fileName && fileName.trim().length > 0) {
            data.image = fileName;
        } else {
            delete data.image;
        }
        if (data.tools) {
            if (typeof data.tools === 'string') {
                try {
                    data.tools = JSON.parse(data.tools);
                } catch (e) {
                    console.error('Error parsing tools:', e);
                    delete data.tools;
                }
            }
        }

        if (data.password && data.password.trim() !== "") {
            data.password = bcrypt.hashSync(data.password, 10);
        } else {
            delete data.password; // Prevent overriding in DB
        }
         

        let userToBeUpdated = await User.findByIdAndUpdate({ _id : req.params.id },data);
        let payload = {
            id : userToBeUpdated._id,
            fullName : userToBeUpdated.fullName,
            email : userToBeUpdated.email,
            role : userToBeUpdated.role,
            phone : userToBeUpdated.phone , 
            image : userToBeUpdated.image ,
            tools : userToBeUpdated.tools 
        };
        let token = jwt.sign(payload,process.env.SECRET_KEY);
        res.status(200).send({myToken : token}) 
    
    }
    catch(err){
        res.status(400,404).send({message : 'there is an error'});
        console.log(err);
        
    }

}

const deleteUser = async(req,res)=>{
    try{
        let userToBeDeleted = await User.findByIdAndDelete({ _id : req.params.id });
        res.status(200).send(userToBeDeleted);
    }
    catch(err){
        res.status(400,404).send({message : 'there is an error'});
        console.log(err);

    }

}

const listUsers = async (req,res)=>{
    try{
        let users = await User.find({role : 'user'});
         
        
        res.status(200).send(users);
    }
    catch(err){
        res.status(400,404).send({message : 'there is an error'});
        console.log(err);

    }

}
module.exports = {addAdmin,addUser,signIn,byId,udpateUser,deleteUser,listUsers};