const Client = require("../models/client.model");
const cloudinary = require("../config/cloudinary");


const createClient = async (req,res,imageUrl)=>{


    try{
        let data = req.body;
        data.image = imageUrl
        const imageId = req.file ? req.file.filename : null ;
        data.publicId = imageId
        data.date = new Date();
        const client = await (new Client(data)).save();     
        res.status(200).send(client);
        console.log(client);
        
    }
    catch(err){
        res.status(400).send(err);
        console.log( err );
        
    }


}
const updateClient = async(req,res,imageUrl)=>{
    try{
        const client = await Client.findById({ _id : req.params.id})
        let data = req.body;
        if(!client)
            return res.status(400).json({
                message : "client doesn't exist"
            });
        if(req.file){
            if(client.publicId){
                await cloudinary.uploader.destroy(client.publicId)
            }
            data.image = imageUrl;
            data.publicId = req.file.filename
        }
        
     
        const updatedClient = await Client.findByIdAndUpdate({ _id : req.params.id },data,{ new: true });
        console.log(updatedClient);
        res.status(200).send(updatedClient);
        
    }
    catch(err){
        res.status(400).send( { message : 'error' } );
        console.log(err);
        
    }


}

const byId = async (req,res)=>{
    try{
        res.status(200).send(await Client.findById({ _id : req.params.id }));
    }
    catch(err){
        res.status(400).send( { message : 'error' } );
        console.log(err);
        
    }

}
const listClients = async (req,res)=>{
    try{
        const users = await Client.find(); 
        res.status(200).send( users );
    }
    catch(err){
        res.status(400).send( { message : 'error' } );
        console.log(err);
        
    }


}
const deleteClient = async (req,res)=>{
    try{
        const client = await Client.findById({ _id : req.params.id })
        if(!client) return res.status(400).json({
            message : "client not found"
        })
        if(client.publicId){
            await cloudinary.uploader.destroy(client.publicId)
        }
        res.status(200).send(await Client.findByIdAndDelete({ _id : req.params.id }));
    }
    catch(err){
        res.status(400).send( { message : 'error' } );
        console.log(err);
        
    }

}
module.exports = { createClient, updateClient , deleteClient , listClients, byId}