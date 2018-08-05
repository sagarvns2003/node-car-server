# node-car-server

## Getting Started
A Node RESTful API server to create a persistent storage (in <b>node-cache</b>) where to handle car information.

### Prerequisites

* NodeJS
* Terminal/Any Command prompt
```
e.g. CMD, CMDER
```

### Installing

* Clone 'node-car-server' repository (master branch) to your local machine.
* Jump to 'node-car-server' folder.
* Issue <b>npm install</b> command to build ready.
* Issue <b>npm start</b> command to start server. Should show console like below...
```
$ npm start

> node-car-server@1.0.0 start C:\Users\vidya\git\node-car-server
> nodemon server.js

[nodemon] 1.18.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node server.js`
node-car-server started on port: 3000
```

### Hitting RESTfull APIs

#### _api_v1/car/{licensePlate} - GET (Ready only)
```
http://localhost:3000/_api_v1/car/abcds

Response...
{
    "model": "Honda",
    "year": "2018",
    "vin": "123456",
    "licensePlate": "abcds"
}

Note* Returns 404 if no license plate is present
{
    "error": "License plate is not present!"
}
```

#### _api_v1/car/{licensePlate} - POST (Create only, if not present)
```
http://localhost:3000/_api_v1/car/abcds

Request body...
{
    "model": "Honda",
    "year": "2018",
    "vin": "123456",
    "licensePlate": "abcds"
}

Response...
{
    "message": "New car information created."
}

Note* Return 403 if already present
{
    "message": "Car details already present."
}
```

#### _api_v1/car/{licensePlate} - PUT  (Create if not present or update only)
```
http://localhost:3000/_api_v1/car/abcds

1) Request body...
  {
    "model": "Honda",
    "year": "2018",
    "vin": "123456",
    "licensePlate": "abcds"
  }

  Response...
  {
    "message": "New car information created."
  }

2) Request body to update only
   { 
      "model": "Honda1", 
      "vin": "12345" 
   }
   
   Response...
   {
    "message": "Car information updated."
   }
```

#### _api_v1/car/{licensePlate} - PATCH  (Update only. Doesn't Create if not present)
```
http://localhost:3000/_api_v1/car/abcd111

1) Request body...
  {
    "model": "Honda",
    "year": "2018",
    "vin": "123456",
    "licensePlate": "abcd111"
  }

  Response...
  {
    "error": "License plate is not present!"
  }

2) Hit the above request with POST method
3) Now again hit with request to update only
   Request body...
   { 
      "model": "Honda1", 
      "year": "2020"
   }
   
   Response...
   {
    "message": "Car information updated."
   }
```


## Authors

* **Vidya Sagar Gupta** - *Initial work* - [My Github Account](https://github.com/sagarvns2003)
