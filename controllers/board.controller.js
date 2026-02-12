const Board = require("../models/board.model")


createBoard = async(projectId,res)=>{
    try{
        let board = new Board();
        board.projectId = projectId;
        let savedBoard = await board.save();
        return savedBoard
    }
    catch(err){
        console.log(err);
        res.status(400).send({ message : 'error' })
    }
}


byId= async(req,res)=>{
    try{
         
        let id = req.params.id;
         
        let board = await Board.findOne({ projectId : id }).populate({
            path : 'projectId',
            model : 'Project'
        }).exec();
         
        
        res.status(200).send( board )
    }
    catch(err){
        console.log(err);
        res.status(400).send({ message : 'error' })
    }

}

deleteProjectBoard = async(projectid)=>{
    try{
        return await Board.findOneAndDelete({ projectId : projectid })
    }
    catch(err){
        console.log(err);
        res.status(400).send({ message : 'error' })
    }
}
updateBoard = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    res.status(200).send(await Board.findByIdAndUpdate({_id : id},data));
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Server error' });
  }
};
deleteTaskBoard = async(req,res)=>{
    try{
        const id = req.params.id;
        const status = req.body.status;

        const statusMap = { 
        backlog: 'backlog', 
        inprogress: 'inprogress', 
        completed: 'done', 
        inhold: 'inhold', 
        };
        const field = statusMap[status];
         
        if(!field){
            return res.status(400).json({ message : 'invalid status' })
        }
        let board = await Board.findByIdAndUpdate(
            {_id : id},
            {$pull : {[field] : req.body}}
        )
        if(!board){
            return res.status(404).send({ message : 'board not found' })
        }
        res.status(200).send(board)
    }
    catch(err){
        console.log(err);
        res.status(400).send({ message : 'error' })
    }
}


module.exports = { createBoard, byId  , deleteProjectBoard , updateBoard, deleteTaskBoard };
