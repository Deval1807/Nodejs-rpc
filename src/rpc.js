const amqplib = require('amqplib');
const { v4: uuid4 } = require('uuid');
require('dotenv').config();

// RabbitMQ connection
let amqplibConnection = null;

/**
 * Funciton to create (if not already) and return a channel
 */
const getChannel = async () => {
    if(amqplibConnection === null) {
        amqplibConnection = await amqplib.connect(process.env.RABBITMQ_URL)
    }
    return await amqplibConnection.createChannel();
};

const expensiveDBOperation = (payload, fakeResponse) => {
    console.log(payload);
    console.log(fakeResponse);

    return new Promise((res, rej) => {
        setTimeout(() => {
            res(fakeResponse)
        }, 3000);
    });
}

/**
 * This function will observer all the activities
 */
const RPCObserver = async (RPC_QUEUE_NAME, fakeResponse) => {
    const channel = await getChannel();

    await channel.assertQueue(RPC_QUEUE_NAME, {
        durable: false      // the queue wont stay forever
    });

    // find the max no of unacknowledged deliverires
    channel.prefetch(1);

    // channel will consume any message that comes from RPC_QUEUE_NAME
    // if the message has some content: perform some operations
    channel.consume(
        RPC_QUEUE_NAME,
        async (msg) => {
            if(msg.content) {
                // do the specified DB operation
                const payload = JSON.parse(msg.content.toString());
                const response = await expensiveDBOperation(payload, fakeResponse) // call fake DB operations

                // send response to whoever is making the request
                channel.sendToQueue(
                    msg.properties.replyTo,        // replyTo queue name will be there in the properties
                    Buffer.from(JSON.stringify(response)),
                    {
                        correlationId: msg.properties.correlationId
                    }
                );

                channel.ack(msg);
            }
        },
        {
            noAck: false,
        }
    );

};


// Helper function for RPCRequest
const requestData = async(RPC_QUEUE_NAME, requestPayload, uuid) => {
    const channel = await getChannel();

    const q = await channel.assertQueue(
        "",
        { 
            exclusive: true 
        }
    );

    // send the payload to the RPC_QUEUE_NAME
    channel.sendToQueue(
        RPC_QUEUE_NAME, 
        Buffer.from(JSON.stringify(requestPayload)), 
        {
            replyTo: q.queue,
            correlationId: uuid
        }
    );

    // check if the service got our request or not by their response
    return new Promise((resolve, reject) => {
        
        // timeout
        // wait for n seconds, if the response does not arrive - close the channel
        const timeout = setTimeout(() => {
            channel.close();
            resolve('Request Timed out!! API could not fulfill the request')
        }, 7000);

        channel.consume(
            q.queue,
            (msg) => {
                if(msg.properties.correlationId === uuid) {
                    resolve(JSON.parse(msg.content.toString()));
                    clearTimeout(timeout);
                } else {
                    reject("Data not found!")
                }
            },
            {
                noAck: true
            }
        );
    });
}

/**
 * Funciton to send requestes from one serivice to other service
 */
const RPCRequest = async (RPC_QUEUE_NAME, requestPayload) => {
    
    // create the correlationId
    const uuid = uuid4();

    // call the helper function
    return await requestData(RPC_QUEUE_NAME, requestPayload, uuid)
};

module.exports = {
    getChannel,
    RPCObserver,
    RPCRequest
}