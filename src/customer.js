const express = require('express');
const { RPCObserver, RPCRequest } = require('./rpc');

const PORT = 9000

const app = express();
app.use(express.json());

const fakeCustomerResponse  = {
    _id: "jaskvuih7y83981029ddjfho",
    name: "Deval",
    country: "India"
};

RPCObserver("CUSTOMER_QUEUE", fakeCustomerResponse);

app.get('/', (req, res) => {
    return res.json("Customer service")
})

app.get('/wishlist', async (req, res) => { 

    // set the payload
    const requestPayload = {
        productId: "001",
        customerId: "jaskvuih7y83981029ddjfho"
    };

    try {
        // send the request to PRODUCTS_QUEUE
        const responseData = await RPCRequest("PRODUCTS_QUEUE", requestPayload); 
        console.log("Response Data: ", responseData);
        return res.status(200).json(responseData)
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json(error)
    }

})

app.listen(PORT, () => {
    console.log(`Customer Server is running on port ${PORT}`);
})

