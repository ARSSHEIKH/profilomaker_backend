const mongoose = require("mongoose");

const db = 'mongodb+srv://arsalan:arsalan@cluster0.xleku.mongodb.net/profilomaker?retryWrites=true&w=majority';

mongoose.connect(db,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>console.log("Connected to mongoDB"))
.catch((err)=>console.log("Not Connected to mongoDB", err))