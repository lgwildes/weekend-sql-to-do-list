const express = require('express');
const router = express.Router();
const pool = require('./pool');


router.post('/', (req, res) => {
 
    const sqlText = `
    INSERT INTO "list"
    ("task")
    VALUES
    ($1);`; //safety measure to stop sneaky behavior
   
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
    ORDER BY "id" ASC;` //keeps tasks in order added even after clicking buttons
    )
    .then((dataBaseResult) => {
        res.send(dataBaseResult.rows); //we just need to send the table row data
    })
    .catch((err) => {
        console.log('in /list router GET error', err);
        res.sendStatus(500);
    })
})

router.put('/:id', (req, res) => {
    console.log('in list PUT with id of', req.params.id);
    let queryParams = [req.params.id];

    let queryText = `UPDATE "list" 
                    SET "completed" = NOT "completed" 
                    WHERE "id" = $1;`

    pool   
        .query(queryText, queryParams)
        .then((result) => {
            console.log('task saved as completed!');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error completing task', err);
            res.sendStatus(500);
        })
})

router.delete('/:id', (req, res) => {
    console.log('in delete with id: ', req.params.id);
    const taskID = req.params.id;
    const sqlText =`DELETE FROM "list" WHERE "id" = $1;`
    const sqlParams = [taskID];

    pool
        .query(sqlText, sqlParams)
        .then((databaseResult) =>{
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('DELETE failed', err);
            res.sendStatus(500);
        })
})



module.exports = router;