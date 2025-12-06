const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models');
const app = express();

app.use(cors())  //connect the backend with front end req
app.use(express.json()); //access to data and let express read json req coming

//auth/task routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({message: 'server error', error: err.message});
});

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server is running on  http://localhost:${PORT}`);
  });
}).catch((err)=>{
  console.log('Data base sync error:' , err);
});
module.exports = app ;
