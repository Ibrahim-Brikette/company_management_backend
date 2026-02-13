const express = require('express');
 
 
const { listClients, byId, deleteClient, createClient, updateClient } = require('../controllers/client.controller');
const { verifyToken } = require('../config/auth/middleware');
const upload = require('../config/multerClient');
const router = express.Router();
router.post('/addclient', verifyToken ,upload.single('image'),(req,res)=>{
    const imageUrl = req.file ? req.file.path : null;
    createClient(req, res, imageUrl);
});
router.put('/updateclient/:id', verifyToken ,upload.single('image'),(req,res)=>{
    const imageUrl = req.file ? req.file.path : null;
    updateClient(req,res,imageUrl);
    

});
router.get('/listclients',listClients);
router.get('/getbyclientid/:id', verifyToken ,byId)
router.delete('/deleteclient/:id', verifyToken ,deleteClient);
module.exports = router ;
 

// let fileName = "";
// const myStrorage= multer.diskStorage({
//     destination : './uploads/clients',
//     filename : (req,file,redirect)=>{
//         fileName = Date.now()+'.'+file.mimetype.split('/')[1];
//         redirect(null,fileName)
//     }
// })
// let upload = multer({storage : myStrorage});
// router.post('/addclient', verifyToken ,upload.single('image'),(req,res)=>{
//     createClient(req,res,fileName);
//     fileName = "";
// });
// router.put('/updateclient/:id', verifyToken ,upload.single('image'),(req,res)=>{
//     updateClient(req,res,fileName);
//     fileName = "";

// });
// router.get('/listclients',listClients);
// router.get('/getbyclientid/:id', verifyToken ,byId)
// router.delete('/deleteclient/:id', verifyToken ,deleteClient);
