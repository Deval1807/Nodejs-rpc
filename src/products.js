const express = require('express');

const PORT = 8000

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    return res.json("Products service")
})

app.get('/products', (req, res) => {
    return res.json("Products service")
})

app.listen(PORT, () => {
    console.log(`Products Server is running on port ${PORT}`);
    console.clear();
})

