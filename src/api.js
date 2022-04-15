const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

const REACT_APP_URL = 'https://dazzling-cajeta-27b8d9.netlify.app/';

let previousRequests = [];

/**
 * Method that calculates the Fibonacci Sequence and returns the n'th value of the sequence
 * @param {*} pos 
 */
const getFibPosition = (pos) => {
    if (pos === 0) return null;
    if (pos === 1) return 0;
    if (pos === 2) return 1;

    let fibArray = [0, 1];
    let aux1, aux2;

    for (let i = 2; i < pos; i++) {
        aux1 = fibArray[i - 1];
        aux2 = fibArray[i - 2];

        fibArray.push(aux1 + aux2);
    }

    return fibArray[pos - 1];
}

/**
 * Router to get the value of a specific Fibonacci Sequence position
 */
router.get('/fibSeqNum/:position', (req, res) => {
    const result = getFibPosition(req.params.position);

    // save request data
    previousRequests.push({ positionRequested: req.params.position, result, date: Date.now() })

    res.set('Access-Control-Allow-Origin', REACT_APP_URL);
    res.json({ 'fibNum': result });
});

/**
 * Router to get all the previous requests
 */
router.get('/requests', (req, res) => {
    res.set('Access-Control-Allow-Origin', REACT_APP_URL);
    res.json({ 'requests': previousRequests });
});

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
