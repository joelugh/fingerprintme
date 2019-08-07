const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const requestIp = require('request-ip');
const config = require("./config");

const PORT = process.env.PORT || 5000


// app creation code removed for brevity

const stringify = o => {
    // Note: cache should not be re-used by repeated calls to JSON.stringify.
    var cache = [];
    return JSON.stringify(o, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Duplicate reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
}

var IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
var GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

// Create IPGeolocationAPI object. Constructor takes two parameters.
// 1) API key (Optional: To authenticate your requests through "Request Origin", you can skip it.)
// 2) Async (Optional: It is used to toggle "async" mode in the requests. By default, it is true.)
var ipgeolocationApi = new IPGeolocationAPI(config.geolocationApiKey, false);

app.get('/', function(req, res) {

    const clientIp = requestIp.getClientIp(req);

    var geolocationParams = new GeolocationParams();
    geolocationParams.setIPAddress(clientIp);
    ipgeolocationApi.getGeolocation((geo) => {

        const Transform = require('stream').Transform;
        const parser = new Transform();
        parser._transform = function(data, encoding, done) {
            const str = data.toString().replace('</body>', `<script>window.clientIP = '${clientIp}'; window.geolocationData = '${stringify(geo)}'; window.requestData = '${stringify(req)}';</script></body>`);
            this.push(str);
            done();
        };

        res.write('<!-- Begin stream -->\n');
        fs
        .createReadStream(path.join(__dirname, 'build', 'index.html'))
        .pipe(parser)
        .on('end', () => {
            res.write('\n<!-- End stream -->')
        }).pipe(res);


    }, geolocationParams);

});

app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT);