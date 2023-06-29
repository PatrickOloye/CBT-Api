require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const indexRoute = require('./routes/user.routes');
const adminRoute = require('./routes/admin.routes');
const examRoute = require('./routes/answers.routes');
const connectDB = require('./database/cbt.database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggers/docs.swaggers');

const app = express();
connectDB();

const port = process.env.PORT || 3079;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/cbt', indexRoute );
app.use('/api/admin', adminRoute);
app.use('/api/exams', examRoute);

app.listen(port, () => { console.log(`CBT App running on port: http://localhost:${port}`) });