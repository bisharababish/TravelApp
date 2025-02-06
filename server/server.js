import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the Travel App API');
});

app.use((req, res) => {
  res.status(404).send('Route not found');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server };
