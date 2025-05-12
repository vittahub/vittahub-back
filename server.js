require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');
const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));