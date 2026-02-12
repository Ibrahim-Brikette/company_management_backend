const express = require('express');
const multer = require('multer');
const { createProject, byId, updateProject, deleteProject ,preview,list, deleteFile, upploadFile, previewUserId} = require('../controllers/project.controller');
const { verifyToken } = require('../config/auth/middleware');
 const router = express.Router();


fileNames = [];
fileName = "";
const myStrorage = multer.diskStorage({
    destination : './uploads/files',
    filename : (req,file,redirect)=>{
        fyle= Date.now()+'.'+file.mimetype.split('/')[1];
        fileNames.push(fyle);
        redirect(null,fyle)
    }
});
let upload = multer({ storage : myStrorage })

const myFileStrorage = multer.diskStorage({
    destination : './uploads/files',
    filename : (req,file,redirect)=>{
        fileName= Date.now()+'.'+file.mimetype.split('/')[1];
        redirect(null,fileName) 
    }
});
let uploadFile = multer({ storage : myFileStrorage })

router.post('/addproject', verifyToken ,upload.any('files'),(req,res)=>{
    createProject(req,res,fileNames);
    fileNames = [];
})

router.put('/updateproject/:id', verifyToken ,upload.any('files'),(req,res)=>{
    updateProject(req,res,fileNames);
    fileNames = [];
})



router.get('/projectbyid/:id',byId);
router.get('/previewproject/:id',preview);
router.get('/listprojects',list);

router.delete('/deleteproject/:id', verifyToken ,deleteProject);


router.delete('/deletefile/:id/:filename', verifyToken ,deleteFile );
router.post('/addfile/:id', verifyToken ,uploadFile.single('file'),(req,res)=>{
    upploadFile(req,res,fileName);
    fileName = "";
});
router.get('/previewemployee/:id',verifyToken,previewUserId);
 

module.exports = router ;
