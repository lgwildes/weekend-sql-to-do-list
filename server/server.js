const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const pool = require('./pool');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));

const router = require('./list.router');
app.use('/list', router)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});