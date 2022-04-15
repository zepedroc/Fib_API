const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/fibonacci_sequence', { useNewUrlParser: true });

// const db = mongoose.connection;
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('Connected to Database!'));

let requests = [];

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

router.get('/fibSeqNum/:position', (req, res) => {
    // save request data
    requests.push({ numberRequested: req.params.position, date: Date.now() })
    res.json({ 'fibNum': getFibPosition(req.params.position) })
});

router.get('/requests', (req, res) => {
    res.json({ 'requests': requests })
});

app.use('/.netlify/functions/api', router);
// app.use(express.json());

module.exports.handler = serverless(app);
