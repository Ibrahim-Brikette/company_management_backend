const express = require('express');
const multer = require('multer')
const { addUser, signIn, byId, listUsers, deleteUser, udpateUser } = require('../controllers/user.controller');
const { verifyToken } = require('../config/auth/middleware');
const router =  express.Router();

let fileName='';
let myStorage = multer.diskStorage({
    destination : './uploads/users',
    filename : (req,file,redirect)=>{
        fileName = Date.now()+'.'+file.mimetype.split('/')[1];
        redirect(null,fileName);
    }
})
let upload = multer({storage : myStorage});


router.post('/createuser', verifyToken ,upload.single('image'),(req,res)=>{
    addUser(req,res,fileName);
    fileName='';
});
router.put('/updateuser/:id', verifyToken ,upload.single('image'),(req,res)=>{
    udpateUser(req,res,fileName);
    fileName = '';
})
router.post('/signin',upload.none(),signIn);
router.get('/userbyid/:id', verifyToken ,byId);
router.get('/listusers',listUsers);
router.delete('/deleteuser/:id', verifyToken ,deleteUser);




module.exports = router;
