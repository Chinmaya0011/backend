// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const tokenRoutes = require('./routes/tokenRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Agora Token Generation Server');
});

app.use('/api', tokenRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
