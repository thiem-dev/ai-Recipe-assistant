import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const apiPort = process.env.PORT || 3000;
const app = express();

const pool = new Pool({
    connectionString: process.env.DB_URL,
});

//  ------------------------------------------------------------ MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.static('public'))


//  ------------------------------------------------------------ API ROUTES

//get all person
app.get('/api/person', async (req, res) => {
    
    try{
        const result = await pool.query(
            `SELECT * FROM person`
        );
        if(result.rows.length === 0){
            return res.status(400).send(`no rows in person`);
        }
        res.status(201).send(result.rows);
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});

//get one person
app.get('/api/person/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const result = await pool.query(
            `SELECT * FROM person
            WHERER id=$1;`, [id]
        );
        if(result.rows.length === 0){
            return res.status(400).send(`Could not find person ${id}`);
        }
        res.status(201).send(result.rows);
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});

//new user created
app.post('/api/person', async (req, res) => {
    const { name } = req.body
    try{
        const result = await pool.query(
            `INSERT INTO person (name) VALUES
            ($1)
            RETURNING *`, [name]
        );
        if(result.rows.length === 0){
            return res.status(400).send(`Could not create person ${name}`)
        }
        res.send(result.rows)
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});

//put person - change username? (not necessary)
//delete person - removes account? (not necessary)

// book routes ****************************************
//get person's bookS
app.get('/api/:personId/book', async (req, res) => {
    const { personId } = req.params
    try{
        const result = await pool.query(
            `SELECT * FROM book
            WHERE person_id = $1`, [personId]
        )
        if(result.rows.length === 0){
            return res.status(400).send(`Could not create book from person ${id}`)
        }
        res.send(result.rows)
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});

// recipe route

//get recipes from book id
app.get('/api/:personId/book', async (req, res) => {
    const { personId } = req.params
    try{
        const result = await pool.query(
            `SELECT * FROM book
            WHERE person_id = $1`, [personId]
        )
        if(result.rows.length === 0){
            return res.status(400).send(`Could not create book from person ${id}`)
        }
        res.send(result.rows)
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});


//  ------------------------------------------------------------ CATCH ALL ROUTE
app.use('/', (req, res, next) => {
    next({message: "The path you are looking for does not exist", status: 404})
})

app.use((err, req, res, next) => {
    res.status(err.status).json({ error: err })
})


//  ------------------------------------------------------------ LISTENER METHOD


app.listen(apiPort, () => {
    console.log(`api server listening on port ${apiPort}`)
});

//  ------------------------------------------------------------ UTIL FUNCTIONS