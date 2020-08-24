const express = require('express');
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production';

const app = next({dev});
const handle = app.getRequestHandler(app);

app.prepare().then(()=>{
    const server = express();
    server.all('*',(req, res) => {
        return handle(req, res);
    })


    const port = process.env.PORT || 3000;
    server.listen(port, (err) => {
        if (err) {console.log(err)}
        console.log(`> Ready on Port :${port}`)
    })
})