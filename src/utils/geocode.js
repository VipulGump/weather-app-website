const request = require('postman-request');

const geocode = (address,callback) => {

    // ? becomes %3F and  space becomes %20 using encodeuriComponent(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZW5naW5lZXJ2aXB1bCIsImEiOiJjbDdsemxpc2cwd2ZsM25xejdwMnkxMDd5In0.V5H-f-zHv2Xm9_acN9mLJQ&limit=1';

    request(url,{json:true},(error,{body})=>{
        const { features } = body;
        if(error){
            callback('Unable to reach the service.', undefined);
        }else if(features.length === 0){
            callback('No Matching results. Try with different address.',undefined);
        }else{
            const latitude = features[0].center[1];
            const longitude = features[0].center[0];
            const location = features[0].place_name;
            callback(undefined,{
                latitude,
                longitude,
                location
            });
        }
    });
}

module.exports = geocode;