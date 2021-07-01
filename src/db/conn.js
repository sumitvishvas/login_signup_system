const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(con=>{
    console.log(`DAtabase Connected`);
}).catch(error=>{
    console.log(`Error ->  ${error}`);
})

module.exports=mongoose;