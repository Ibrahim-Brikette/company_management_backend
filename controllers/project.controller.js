const { log } = require("console");
const Project = require("../models/project.model");
const { createBoard, deleteBoard, deleteProjectBoard } = require("./board.controller");
const fs = require('fs');
const path = require('path');

const createProject = async (req,res,fileNames)=>{
    try{
        let data = req.body;

        if (!req.body.clientId) {
            return res.status(400).json({ message: 'clientId is required' });
        }
        let project = new Project(data);
        project.date = new Date();
        
        project.team = JSON.parse(data.team);
        project.files =  fileNames ;
        
        let newProject = await project.save();
        createBoard(newProject._id)
        res.status(200).send(newProject);
    }
    catch(err){
        res.status(400).send({message : 'error'});
        console.log(err);
        
    }

}
const byId = async(req,res)=>{
    try{
        res.status(200).send(await Project.findById( { _id : req.params.id } ));
    }
    catch(err){
        res.status(400).send({message : 'error'});
        console.log(err);
        
    }
    
}
const updateProject = async ( req,res,fileNames ) => {
    try{
        console.log(req.body);
        
        let data = req.body ;
        if(fileNames.length > 0) data.files = fileNames ;
        data.team = JSON.parse(data.team);
        let toupdateProject = await Project.findByIdAndUpdate({ _id : req.params.id },data);
        res.status(200).send(toupdateProject);
    }
    catch(err){
        res.status(400).send({message : 'error'});
        console.log(err);
        
    }
}
const deleteProject = async ( req,res ) => {
    try{    
        let board = await deleteProjectBoard(req.params.id,res);
        let project = await Project.findByIdAndDelete({ _id : req.params.id });
        res.send(200).json({
            success : true,
            message : 'Project and its board deleted successfully',
            project,
            board
        })
        
    }
    catch(err){
        res.status(400).send({message : 'error'});
        console.log(err);
        
    }
}
const preview = async( req,res )=>{
    try{
        let id = req.params.id ; 
        let project = await Project.findById({ _id : id }).populate({
            path : 'clientId',
            model : 'Client'
        }).populate({

            path : 'team',
            model : 'User'
        }).exec();
        res.status(200).send(project);
        
    }
    catch(err){
        res.status(400).send({message : 'error'});
        console.log(err);
        
    }

}
const list = async( req,res )=>{
    try{
         
        let projects = await Project.find().populate({
            path : 'clientId',
            model : 'Client'
        }).populate({

            path : 'team',
            model : 'User'
        }).exec();
        res.status(200).send(projects);
        
        
        
    }
    catch(err){
        res.status(400).send({message : 'error'});
        console.log(err);
        
    }

}
const downloadFile = (req, res) => {
  try {
    const fileName = req.params.filename;
    const filePath = "./uploads/files/" + fileName;

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Send file to user
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).json({
          success: false,
          message: 'Failed to download file one'
        });
      }
    });

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download file two',
      error: error.message
    });
  }
}
const deleteFile = async (req, res) => {
  try {
    const fileName = req.params.filename;
    const filePath = "./uploads/files/" + fileName;
    const projectId = req.params.id;
    project = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { files: fileName } },
      { new: true }
    );

    // Check if file exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Send file to user
    res.status(200).send(project);

  } catch (error) {
    console.error('delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file two',
      error: error.message
    });
  }
}
const upploadFile = async (req,res,fileName)=>{
    try {
        if(!req.file){
            return res.status(400,404).json({
                success : false,
                message : "there is an upload error",
                 

            })

        }

        const project = await Project.findByIdAndUpdate({_id : req.params.id},
            {$push: {files : fileName}},
            {new : true}
            
        );
        fileName = "";
        if(!project){
            return res.status(400).json({
                success : false,
                message : "there is an upload error",
                
            })
        }
        res.status(200).json({
            success : true,
            message : 'File uploaded successfully',
            project
        });
        
    }catch (error) {
        console.error('Upload error:', error);
        res.status(400).json({
          success: false,
          message: 'Failed to upload file',
           
        });
    }

}
const previewUserId = async (req, res) => {
  try {
    const id = req.params.id;

    const projects = await Project.find({ team: id })
      .populate({ path: "clientId", model: "Client" })
      .populate({ path: "team", model: "User" })
      .exec();

    console.log(projects);
    res.status(200).send(projects);
    
  } catch (err) {
    res.status(400).send({ message: "error" });
    console.log(err);
    
  }
};

module.exports = { createProject , byId , updateProject , deleteProject , preview , list, upploadFile, deleteFile,downloadFile,previewUserId } ;