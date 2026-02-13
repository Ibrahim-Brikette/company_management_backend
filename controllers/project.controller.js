const Project = require("../models/project.model"); 
const cloudinary = require('../config/cloudinary');
const { createBoard, deleteProjectBoard } = require("./board.controller");

const createProject = async (req,res,fileNames)=>{
    try{
        let data = req.body;

        if (!req.body.clientId) {
            return res.status(400).json({ message: 'clientId is required' });
        }
        let project = new Project(data);
        project.date = new Date();
        
        project.team = JSON.parse(data.team);
        if(req.files && req.files.length > 0){
            project.files = req.files.map(file =>({
                url : file.path,
                publicId : file.filename
            }))
        }
        
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
const updateProject = async ( req,res ) => {
    try{
        console.log(req.body); 
        let data = req.body ;
        // if(req.files && req.files.length > 0){
        //     data.files = req.files.map(file =>({
        //         url : file.path,
        //         publicId : file.filename
        //     }))
        // }
        if (req.files && req.files.length > 0) {
            const newFiles = req.files.map(file => ({
                url: file.path,
                publicId: file.filename
            }));

            data.files.push(...newFiles);
        }
        if(data.team===0) return res.status(400).json({message : "there is no employees"})
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
        let project = await Project.findById({ _id:req.params.id  })
        if(!project) return res.status(400).json({
            message : "project not found"
        })
        if(project.files && project.files.length > 0 )
        for (const file of project.files) {
            await cloudinary.uploader.destroy(file.publicId)
            
        };

        let projectTodelete = await Project.findByIdAndDelete({ _id : req.params.id });
        res.send(200).json({
            success : true,
            message : 'Project and its board deleted successfully',
            projectTodelete,
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
const downloadFile = async (req, res) => {
  try {
    const fileTod = req.body.file;
    const project = Project.findOne({file: fileTod})
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found"
      });
    }
    const file = project.files.find(f => f.publicId === fileTod.publicId);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }

    // Force download using Cloudinary
    const downloadUrl = file.url + "?fl_attachment=true";

    res.status(200).json({
      success: true,
      url: downloadUrl
    });


    // Check if file exists

    // Send file to user
     

  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download file two',
      error: error.message
    });
  }
}
const deleteFile = async(req, res) => {
  try {
    const filename = req.body.publicId;
    console.log(filename);
    const projectId = req.params.id;
    const project = await Project.findById({_id : projectId}) ;
    console.log(project.files);
    
    if(!project) return res.status(400).send({
        messaage : "project not found"
    })
    const file = project.files.find(f=> f.publicId === filename);
    if(!file ) return res.status(400).json({
        message : "failed to find the file"
    })
    console.log(await cloudinary.uploader.destroy(file.publicId,{resource_type : "image"}));
    
    // Remove from database
    project.files=project.files.filter(file => file.publicId !==filename)
    
    res.status(200).send(await project.save());

  } catch (error) {
    console.error('delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file two',
      error: error.message
    });
  }
}
// project.files = req.files.map(file => ({
//   url: file.path,
//   publicId: file.filename,
//   resourceType: file.resource_type
// }));

const upploadFile = async (req,res)=>{
    try {
        if(!req.file){
            return res.status(400,404).json({
                success : false,
                message : "there is an upload error",
            })
        }
        const project = await Project.findByIdAndUpdate({_id : req.params.id},
            {$push: {files : {
                url: req.file.path,
                publicId : req.file.filename
            }}},
            {new : true}
            
        );
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