const express = require('express');
const router = express.Router();
const pool = require('./pool');


router.post('/', (req, res) => {
 
    const sqlText = `
    INSERT INTO "list"
    ("task")
    VALUES
    ($1);`;
   
    const sqlParams = [
        req.body.task
    ]
    console.log('sqlParams is',sqlParams);
   
    pool.query(sqlText, sqlParams)
        .then((dataBaseResult) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('POST /list error', err)
            res.sendStatus(500);
        })
})

router.get('/', (req,res) => {
    console.log('in /list GET');

    pool.query(`
    SELECT * FROM "list"
    ORDER BY "id" ASC;`
    )
    .then((dataBaseResult) => {
        res.send(dataBaseResult.rows);
    })
    .catch((err) => {
        console.log('in /list router GET error', err);
        res.sendStatus(500);
    })
})



module.exports = router;