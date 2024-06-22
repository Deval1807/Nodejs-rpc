# Simple Node-Express Application (Microservices)

## Description

This project is a simple server side appliation written in Node.js and Express.js to demonstrate how microservices can communicate with each other through RPC calls.


## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Contribution](#contributing)
6. [Contact](#contact)


## Features

- Efficient communication between microservices through RPC calls.
- Timeout functionality for the API Request.


## Tech Stack

- **Node.js**: Backend Environment
- **Express.js**: Backend Framework
- **RabbitMQ**: Message Broker (for RPC functionality) 


## Getting Started

### Prerequisites

- Node.js
- RabbitMQ 
    - [Either download locally](https://www.rabbitmq.com/docs/download) 
    - [Or use cloud provider](https://www.cloudamqp.com/)


### Installation

1. Clone the Repository:
    ```bash
    git clone https://github.com/Deval1807/Nodejs-rpc
    cd Nodejs-rpc
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    - Create a .env file in the root directory
    - Add your RabbitMQ URL
    ```env
    RABBITMQ_URL = <your_RabbitMQ_URL>
    ```
    - If you are using it locally, the configuration will be:
    ```env
    RABBITMQ_URL = 'amqp://localhost'
    ```

4. Make sure to start your RabbitMQ service before starting the server, if you are using RabbitMQ locally.
    - If you have already installed RabbitMQ, directly search for `RabbitMQ Service - Start` and you will be able to start it.

5. RabbitMQ Management Console
    - Once the service is start, go to `http://localhost:15672` for the accessing the management console
    - If you are unable to access it, you will need to add a plugin for it
    - Open RabbitMQ command prompt and run the following command
        ```bash
        rabbitmq-plugins enable rabbitmq_management
        ```
    - Restart your service and it should be working 😄

6. Start the server
    - Start products.js
        ```bash
        node src/products.js
        ```
    - Start customer.js in a new terminal
        ```bash
        node src/customer.js
        ```


## Usage

- Once the Server is running,

- Visit the following link for Customer server
    - `/` : `http://localhost:9000`
    - `/wishlist` : `http://localhost:9000/wishist`

- Visit the following link for Products server
    - `/` : `http://localhost:8000`
    - `/customer` : `http://localhost:8000/customer`


## Contributing

We welcome contributions from the community. To contribute, please fork the repository, create a new branch, and submit a pull request. Make sure to follow the coding standards and ethical practices.

## Contact

For questions or support, please contact Deval Darji by following ways:

1. LinkedIn: [Deval Darji](https://www.linkedin.com/in/deval-darji-a15002226/)

2. Email: [deval135darji@gmail.com](mailto:deval135darji@gmail.com)