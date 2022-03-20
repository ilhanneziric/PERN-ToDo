const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/todo', todoRoutes);
app.use('/api/user', userRoutes);

app.use('/', async (req,res) => {
    try {
        res.json("Hello PERN TODO");
    } catch (err) {
        console.error(err.message);
    }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));