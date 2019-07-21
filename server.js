const express = require('express');
const app = express();
const PointsTable = require('./model').PointsTable;
const ApiKeyTable = require('./ApiKeyModel').ApiKeyModel;
app.use(express.json());

//Validare
app.use((req,res,next)=>{
   
    let token = req.headers.authentication;
    if(token == undefined)res.status(401).send();
    if(token.length == 0)res.status(401).send();
    if(!token.startsWith('Bearer ')){
       res.status(401).send();
    }

    token = token.slice(7,token.length);

    ApiKeyTable.findAll({
        where : {
            api_key : token
        }
    }).then(pts => {
        pts = JSON.parse(JSON.stringify(pts, null, 4));
       if(pts.length > 0){
          next();
       }else{
          res.status(401).send();
       }
    });
    
});
app.get('/GetPoints',(req,res)=>{

    PointsTable.findAll().then(pts => {
        res.send(pts);
    });
});

app.get('/GetPoint/:id1',(req,res)=>{

    let { id1 } = req.params;
    PointsTable.findAll({
        where : {
            id: id1
        }
    }).then(pts => {
        res.send(pts);
    });
});

app.post('/CreatePoint',(req,res)=>{
    let data = req.body;
    
    let point = { type: 'Point', coordinates: [data.lat,data.long]};

    PointsTable.create({ description : data.description, coordonates : point }).then(pt => {
        res.status(200).send();
      });
});

app.put('/UpdatePoint/:id1',(req,res)=>{
    let { id1 } = req.params;
    let data = req.body;
    let point = { type: 'Point', coordinates: [data.lat,data.long]};
    PointsTable.update({ description : data.description,  coordonates: point}, {
        where: {
         id: id1
        }
      }).then(() => {
       res.status(200).send();
      });
});

app.delete('/DeletePoint/:id',(req,res)=>{
    let { id } = req.params;

    PointsTable.destroy({
        where: {
          id : id
        }
      }).then(() => {
        res.status(200).send();
      });
});
app.listen(3443);