require('dotenv').config();
const express = require('express');
const { addAdmin } = require('./controllers/user.controller');
const cors = require('cors');
require('./config/connect');



const userRoute = require('./routes/user.route');
const clientRoute = require('./routes/client.route');
const boardRoute = require('./routes/board.route');
const projectRoute = require('./routes/project.route');
// const { downloadFile } = require('./controllers/project.controller');









const app = express();
app.use(express.json());
app.use(cors());


app.use('/user',userRoute);
app.use('/client',clientRoute);
app.use('/board',boardRoute);
app.use('/project',projectRoute);








app.use('/images/users',express.static('./uploads/users'));
app.use('/images/clients',express.static('./uploads/clients'));
app.use('/files',express.static('./uploads/files'));
app.get('/', (req, res) => {
  res.send('API is running 🚀');
});
// app.get('/files/projects/:filename', downloadFile);

// ============================================
// ROUTE 3: DELETE FILE
// ============================================
/**
 * DELETE /api/projects/files/:filename
 * Deletes a file from the server and removes it from project
 * 
 * Parameters:
 * - filename: name of the file to delete
 * 
 * Request body:
 * - projectId: ID of the project
 */
// router.delete('/files/:filename', async (req, res) => {
//   try {
//     const fileName = req.params.filename;
//     const projectId = req.body.projectId;
//     const filePath = path.join(__dirname, '../uploads/projects', fileName);

//     // Remove file from database
//     await Project.findByIdAndUpdate(
//       projectId,
//       { $pull: { files: fileName } },
//       { new: true }
//     );

//     // Delete physical file
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     res.json({
//       success: true,
//       message: 'File deleted successfully'
//     });

//   } catch (error) {
//     console.error('Delete error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to delete file',
//       error: error.message
//     });
//   }
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('the app is working little boy');
    addAdmin();
})