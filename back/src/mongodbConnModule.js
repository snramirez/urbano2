var mongoose = require('mongoose');

const uri = "mongodb://127.0.0.1:27017/urbano";
// const uri = "mongodb+srv://GCBA:Mjggc3160@gcbalicitaciones.bteiv.mongodb.net/?retryWrites=true&w=majority";

module.exports.connect = function() {
	mongoose.connect(uri, {});
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "MongoDB Connection Error"));
	db.once("open", function(callback){
	  console.log("MongoDB Connection Succeeded"); 
	});
	return db;
}