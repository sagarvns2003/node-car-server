'use strict';

var Car = require("../models/Car");
var NodeCache = require("node-cache");
var carCache = new NodeCache();

//Get Car details based on license number plate
exports.getCarDetails = function(req, res) {
  const licensePlate = req.params.licensePlate;
  console.log("licensePlate: " + licensePlate);
  const car = carCache.get(licensePlate);
  if(car) {
    res.json(car);
  } else {
    res.status(404).send({"error": "License plate is not present!"});
  }
}

//Create Car details based on license number plate
exports.createNewCar = function(req, res) {
  const licensePlate = req.params.licensePlate;
  console.log("licensePlate: " + licensePlate);
  console.log("Request Body..." + JSON.stringify(req.body));

  //New car object
  var carObj = new Car(req.body.model, req.body.year, req.body.vin, licensePlate);
  const car = carCache.get(licensePlate);
    if(car) {
      res.status(403).send({"message": "Car details already present."});
    } else {
      carCache.set(licensePlate, carObj, function(err, success){
        if( !err && success ){
          console.log("Car information created..." + JSON.stringify(carObj));
          res.status(200).send({"message": "New car information created."});
        }
      });
    }
}

//Create or update car details
exports.createOrUpdateCar = function(req, res) {
  const licensePlate = req.params.licensePlate;
  console.log("licensePlate: " + licensePlate);
 
  var carFromCache = carCache.get(licensePlate);
  if(carFromCache) { //Update existing
    carFromCache.model = req.body.model;
    carFromCache.year = req.body.year;
    carFromCache.vin = req.body.vin;
    carFromCache.licensePlate = licensePlate;

    //Overwrite cache for same licensePlate
    carCache.set(licensePlate, carFromCache, function(err, success) {
      if( !err && success ){
        console.log("Car information updated..." + JSON.stringify(carFromCache));
        res.status(200).send({"message": "Car information updated."});
      }
    });

  } else { //Create new car object
    var carObj = new Car(req.body.model, req.body.year, req.body.vin, licensePlate);
    carCache.set(licensePlate, carObj, function(err, success){
      if( !err && success ){
        console.log("Car information created..." + JSON.stringify(carObj));
        res.status(200).send({"message": "New car information created."});
      }
    });
  }
}

//Update car details
exports.updateCar = function(req, res) {
  const licensePlate = req.params.licensePlate;
  const carFromCache = carCache.get(licensePlate);
  if(carFromCache) {  //Update existing

    if(req.body.model) carFromCache.model = req.body.model;
    if(req.body.year)  carFromCache.year = req.body.year;
    if(req.body.vin)   carFromCache.vin = req.body.vin;
      
    //Overwrite cache for same licensePlate
    carCache.set(licensePlate, carFromCache, function(err, success) {
      if( !err && success ){
        console.log("Car information updated..." + JSON.stringify(carFromCache));
        res.status(200).send({"message": "Car information updated."});
      }
    });

  } else {
    res.status(404).send({"error": "License plate is not present!"});
    //res.json(car);
    //res.json({"message": req.body});
  }
}