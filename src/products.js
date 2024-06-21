const express = require('express');
const { RPCObserver, RPCRequest } = require('./rpc');

const PORT = 8000

const app = express();
app.use(express.json());


const fakeProductResponse  = {
    _id: "001",
    title: "Apple",
    price: 50
};

RPCObserver("PRODUCTS_QUEUE", fakeProductResponse);

app.get('/', (req, res) => {
    return res.json("Products service")
})

app.get('/customer', async (req, res) => {

    // set the payload
    const requestPayload = {
        customerId: "jaskvuih7y83981029ddjfho"
    };

    try {
        // send the request to CUSTOMER_QUEUE
        const responseData = await RPCRequest("CUSTOMER_QUEUE", requestPayload); 
        console.log("Response Data: ", responseData);
        return res.status(200).json(responseData)
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json(error)
    }

})

app.listen(PORT, () => {
    console.log(`Products Server is running on port ${PORT}`);
})

