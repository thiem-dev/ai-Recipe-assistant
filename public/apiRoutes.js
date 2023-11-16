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


app.get('/api/person', async(req, res) => {
    
    try{
        const result = await pool.query(
            `SELECT * FROM person`
        );
        res.status(201).send(result.rows)
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
})


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