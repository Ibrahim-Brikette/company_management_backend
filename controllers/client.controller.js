const Client = require("../models/client.model");



const createClient = async (req,res,fileName)=>{


    try{
        let data = req.body;
        data.image = fileName
        
        const client = await (new Client(data)).save();
        client.date = new Date();
        res.status(200).send(client);
    }
    catch(err){
        res.status(400).send(err);
        console.log( err );
        
    }


}
const updateClient = async(req,res,fileName)=>{
    try{
        let data = req.body;
        if (fileName && fileName.trim().length > 0) {
            data.image = fileName;
        } else {
            delete data.image;
        }
     
        const toUpdateClient = await Client.findByIdAndUpdate({ _id : req.params.id },data);
        res.status(200).send(toUpdateClient);
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
        res.status(200).send(await Client.findByIdAndDelete({ _id : req.params.id }));
    }
    catch(err){
        res.status(400).send( { message : 'error' } );
        console.log(err);
        
    }

}
module.exports = { createClient, updateClient , deleteClient , listClients, byId}