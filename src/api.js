const express = require('express');
const serverless = require('serverless-http');

const app = express();

const router = express.Router();

console.log('server file loaded!!!!!');
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
    console.log('Get position:', req.params.position);
    res.json({ 'fibNum': getFibPosition(req.params.position) })
});

// app.listen(5000, () => {
//     console.log('Server started!');
// })

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
