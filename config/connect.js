const mongoose = require('mongoose');


// mongoose.connect(process.env.MONGO_LOCAL)
//     .then(
//         ()=>{
//             console.log('connected to the local mongo db');
//         }
//     )
//     .catch(
//         (err)=>{
        
//             console.log(err)



//         }      
//     )
    

 
mongoose.connect(process.env.MONGO_URI)
.then(
    ()=>{
        console.log('connected to the hosted mongo db');
    }
)
.catch(
    (err)=>{       
        console.error('error connecting to the hosted mongo db', err);               
    }   
)