const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// DB Connection
const { mongoose } = require('./database');

// Server Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

// Routes
routes = require('./routes/employee.routes');
app.use('/api/employees',routes);

// Starting the Server
app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});