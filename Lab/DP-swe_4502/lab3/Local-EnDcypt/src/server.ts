require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// PORT
const PORT = process.env.APP_PORT || 5000;

// Import Routes
const endcyptRouter = require('./routes/EndcyptRoute');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req: any, res: any) => {
    console.log(req.url);
    res.send('Goodbye TypeScript from us');
});

// Use Routes
app.use('/', endcyptRouter);


// Listen to the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});