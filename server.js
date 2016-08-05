var express = require('express');
//instance of app 
var app = express();
var mWare = {
	reqAuth: function(req, res, next){
		console.log('Private route hit!');
		next();
	}, 
	logger:function (req, res, next ){
		console.log('Request: ' + new Date().toString() + ' '+ req.method + ' ' + req.originalUrl);
		next();
	}
}
//Http Request to GET
//if I comment out the get with root /, it will default to index.html if no other file is 
//specified.
// app.get('/',function(req,res){
// 	res.send('Hello Express!');
// });
//application level middleware
app.use(mWare.logger);

app.get('/about',mWare.reqAuth, function(req, res){
	res.send('About us!');
})

//__dirname variable is nodejs provided variable that exposes the current directory
//console.log(__dirname);

//serving static html pages  - express.static is the method.
//Exposing public folder containing resources. 
app.use(express.static(__dirname + '/public'));

//tells the browser at which port to listen the application 
var port = 2999;
app.listen(port, function(){
	console.log('Express server started at:' + port)
});

