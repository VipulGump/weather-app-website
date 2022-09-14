const request = require('postman-request');

const forecast= ( latitude , longitude , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=dc142f872920ea8d2162eaf0a4939655&query='+ latitude + ',' + longitude;
    
    request( url , {json:true},(error,{ body })=>{
        const { error:responseError , current } = body;
        if(error){
            callback('Unable to connect to weather service',undefined);
        }else if (responseError){
            callback('Unable to find location', undefined);
        } else{
            callback(undefined, `The temperature is ${current.temperature} . It feels like ${current.feelslike} `);
        }
    })
};

module.exports = forecast;

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
