var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var id;
var collection;
 var ObjectID = require('mongodb').ObjectID;
//STATIC FILES
app.use(express.static('public'));
app.use(bodyParser.json()); // Body parser use JSON data

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017/BIOM_GENES",function(err,client){
	if(!err){
		console.log("We are connected");
		const db = client.db('BIOM_GENES');
		collection = db.collection('list2');
	}
});
  
  var json1={};
    var user;
  
    app.get('/', function (req, res) {
	res.sendFile( __dirname + "/public" +"/"+ "home.html" );
});
  
  app.get('/input', function(req, res) {
  	res.sendFile(__dirname +"/public/"+"predict-index.html");
	  //res.render('predict-disp.ejs');  
  });
  
  app.put('/predict', function (req, res) {
	  console.log(req.body);
	  var input1 = req.body.input1;
	  var input2 = req.body.input2;
	  var input3 = req.body.input3;
	  var input4 = req.body.input4;
	  var input5 = req.body.input5;
	  var input6 = req.body.input6;
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./RFmodelPredict.py', input1, input2, input3, input4, input5, input6]);

    pyProg.stdout.on('data', function(data) {
		var result = data.toString();
		console.log(result);
		res.send({'data': result});
    });
})

  app.get('/list_index',function (req,res){
	res.sendFile(__dirname + "/public/list.html");
});

  app.put('/list',function(req,res){
	console.log(req.body);
	var biom = req.body.input1;
	var list2 ;
	collection.find({"name":biom}).toArray(function(err,results){
		list2 = results[0];
		console.log(list2);
		res.send({'activated':Object.keys(list2.activated),'inhibited':Object.keys(list2.inhibited)});
})
	
	
});
// Connect to the db
MongoClient.connect('mongodb://localhost', function (err, client) {
  if (err) throw err;

  var db = client.db('prop');
 
  app.get('/biomarkers', function (req, res) {
	console.log("GET Request :: /list");
	  console.log(user);
	 
	var data = {
        "error": 1,
        "products": ""
    };
	
  db.collection('property', function (err, collection) {
        
         collection.find().toArray(function(err, rows) {
            if(err) throw err;    
			if (rows.length !== 0 && !err) {
				json1["error"] = 0;
				data["products"] = rows;
				json1["user"]=user;
				json1['owner']=rows;
							res.json(json1);
				
			} else if (rows.length === 0) {
				data["error"] = 2;
				data["products"] = 'No accounts Found..';
				res.json(data);
			} else {
				data["products"] = 'error while performing query';
				res.json(data);
				console.log('Error while performing Query: ' + err);
			}
        });
	  console.log(json1);
	  });
  });

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("dummy app listening at: " + host + ":" + port);
});
});
