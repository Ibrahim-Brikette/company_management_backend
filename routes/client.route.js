const express = require('express');
const multer = require('multer');
const { listClients, byId, deleteClient, createClient, updateClient } = require('../controllers/client.controller');
const { verifyToken } = require('../config/auth/middleware');
const router = express.Router();

let fileName = "";
const myStrorage= multer.diskStorage({
    destination : './uploads/clients',
    filename : (req,file,redirect)=>{
        fileName = Date.now()+'.'+file.mimetype.split('/')[1];
        redirect(null,fileName)
    }
})
let upload = multer({storage : myStrorage});
router.post('/addclient', verifyToken ,upload.single('image'),(req,res)=>{
    createClient(req,res,fileName);
    fileName = "";
});
router.put('/updateclient/:id', verifyToken ,upload.single('image'),(req,res)=>{
    updateClient(req,res,fileName);
    fileName = "";

});
router.get('/listclients',listClients);
router.get('/getbyclientid/:id', verifyToken ,byId)
router.delete('/deleteclient/:id', verifyToken ,deleteClient);



module.exports = router ;
 