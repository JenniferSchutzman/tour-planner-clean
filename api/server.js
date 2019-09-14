require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const tourRoute = require('./routes/tours');

app.use(bodyParser.json());
app.use(cors({ credentials: true }));

app.get('/', (req, res) => {
	res.status(200).send('Welcome to book charleston tours');
});

tourRoute(app);

app.listen(PORT, () => console.log('API UP on', PORT));
