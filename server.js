var express = require('express'),
    app = express(),
    router = express.Router(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000;

var carController = require('./api/controllers/CarController');
var validate = require('./utils/Validate');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
   
//Request entry point
router.use(function (req, res, next) {
  console.log('Request intercepted here.');
  if(validate.validateLicensePlate(req)){
    next();
  } else {
    res.status(400).send({"error": "Invalid license plate! Only letters and number are allowed in license plate."});
  }
});

//Read only
router.route('/car/:licensePlate').get(function (req, res) {
  res.json(carController.getCarDetails(req, res));
});

//Create only (if not present)
router.route('/car/:licensePlate').post(function (req, res) {
  res.json(carController.createNewCar(req, res));
});

//Create (if not present) or update only
router.route('/car/:licensePlate').put(function (req, res) {
  res.json(carController.createOrUpdateCar(req, res));
});

//Update only. Don't Create (if not present)
router.route('/car/:licensePlate').patch(function (req, res) {
  res.json(carController.updateCar(req, res));
});


app.use(cors());
app.use('/_api_v1', router);
app.listen(port);
console.log('node-car-server started on port: ' + port);


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found!'})
});