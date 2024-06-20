const express = require('express');

const PORT = 9000

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.json("Customer service")
})

app.get('/profile', (req, res) => {
    return res.json("Customer profile")
})

app.listen(PORT, () => {
    console.log(`Customer Server is running on port ${PORT}`);
    console.clear();
})

