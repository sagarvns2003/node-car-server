//Constructor
function Car(model, year, vin, licensePlate) {
    this.model = model;
    this.year = year;
    this.vin = vin;
    this.licensePlate = licensePlate;
}

Car.prototype.setModel = function(model) {
    this.model = model;
};

Car.prototype.setYear = function(year) {
    this.year = year;
};

Car.prototype.setVin = function(vin) {
    this.vin = vin;
};

Car.prototype.setVin = function(licensePlate) {
    this.licensePlate = licensePlate;
};

module.exports = Car;