const port = 8010;
const express=require('express');     
const app= express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('assets'));
var bodyParser = require('body-parser')
// setup view engin
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(cookieParser());
app.use('/', require('./routes'));
const MongoStore = require('connect-mongo');

app.use(session({
    name: 'Article',
    secret: 'your-secret-key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({

        mongoUrl: 'mongodb+srv://mrunknown0086:TDBgZIIYtZI584fL@cluster0.xbxgs0v.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: 'disabled'

    },
        function (err) {
            console.log(err || 'error in connect - mongodb setup ok');
        }
    )
}));
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);
app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port} `);
})