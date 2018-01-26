const express = require('express');                      
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('../routes');
//const renderer = require('./renderer');
const app = express();  
const mainConfig = require('../../../package.json');
const config = require('../../config.json');
const serveStatic = () => app.use('/assets',express.static(path.join(__dirname, '../../../public/assets')));
const db = require('../db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/robots.txt',express.static(path.join(__dirname, '../../../public/robots.txt')));
app.use('/sitemap.xml',express.static(path.join(__dirname, '../../../public/sitemap.xml')));
app.use('/favicon.ico',express.static(path.join(__dirname, '../../../public/favicon.ico')));
if (config.serveStatic && process.env.NODE_ENV !== 'dev') {
    serveStatic();
}

if (process.env.NODE_ENV === 'dev') {

    serveStatic();  
    
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
        if (req.method === 'OPTIONS') {
            return res.send(200);
        } else {
            return next();
        }
    });
}

app.use('', routes);
//app.use('/', renderer);
app.get('*',function(req,res){
    res.sendFile(path.resolve(__dirname, '../../../public/', 'index.html'));
});

db.connect();
app.listen(config.port, ()=> console.log(`Server ${mainConfig.name} on ${config.port}`));

module.exports = app;