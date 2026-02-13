const express = require('express');
 const { addUser, signIn, byId, listUsers, deleteUser, udpateUser } = require('../controllers/user.controller');
const { verifyToken } = require('../config/auth/middleware');
const upload = require("../config/multerUser");
const router =  express.Router();
router.post('/createuser', verifyToken ,upload.single('image'),(req,res)=>{
    const imageUrl = req.file ? req.file.path : null;
    addUser(req,res,imageUrl);
});
router.put('/updateuser/:id', verifyToken ,upload.single('image'),(req,res)=>{
    const imageUrl = req.file ? req.file.path : null;
    udpateUser(req,res,imageUrl);
})
router.post('/signin',upload.none(),signIn);
router.get('/userbyid/:id', verifyToken ,byId);
router.get('/listusers',listUsers);
router.delete('/deleteuser/:id', verifyToken ,deleteUser);




module.exports = router;
