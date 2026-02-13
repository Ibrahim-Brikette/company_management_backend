const express = require('express');
const multer = require('multer');
const { createProject, byId, updateProject, deleteProject ,preview,list, deleteFile, upploadFile, previewUserId, downloadFile} = require('../controllers/project.controller');
const { verifyToken } = require('../config/auth/middleware');
const router = express.Router();
const upload = require("../config/multerProject")
router.post('/addproject', verifyToken ,upload.array('files'),(req,res)=>{
    createProject(req,res);
    
})

router.put('/updateproject/:id', verifyToken ,upload.array('files'),(req,res)=>{
    updateProject(req,res);
    
})



router.get('/projectbyid/:id',byId);
router.get('/previewproject/:id',preview);
router.get('/listprojects',list);

router.delete('/deleteproject/:id', verifyToken ,deleteProject);


router.delete('/deletefile/:id', verifyToken ,deleteFile );
router.post('/addfile/:id',verifyToken,upload.single('file'),(req,res)=>{
    upploadFile(req,res);
});
router.get('/previewemployee/:id',verifyToken,previewUserId);
router.post('/downloadfile',downloadFile);

module.exports = router ;
