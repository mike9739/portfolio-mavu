const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const {connect} = require('./DB')


const portfoliosRoutes = require('./routes/portfolios');
const blogsRoutes = require('./routes/blogs');

async function runServer() {
    await connect();
    server.use(bodyParser.urlencoded({extended:false}));
    server.use(bodyParser.json());
    server.use('/api/v1/portfolios',portfoliosRoutes);
    server.use('/api/v1/blogs',blogsRoutes)

    const PORT = parseInt(process.env.PORT,10) || 3001;

    server.listen(PORT,(err) => {
        if (err) console.log(err);
        console.log(`Server running on port ${PORT}`);
    });
}
runServer();





