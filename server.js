const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.get('/internal/healthcheck', (req, res) => {
        res.json({
            status: 'hiit'
        });
    });

    server.get('/api/internal/healthcheck', (req, res) => {
        res.json({
            status: 'Success'
        });
    });

    server.all('*', (req, res) => {
        return handle(req, res)
    });

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    });
});