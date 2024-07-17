const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connection = require('./config/db'); 
const allRoutes = require('./routes/allRoutes')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api', allRoutes); 

const PORT = process.env.PORT || 5000;

connection
.then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to the database. Server not started.', err);
    });
