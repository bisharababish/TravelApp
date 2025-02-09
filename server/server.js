import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.send('Welcome to the Travel App');
});

export default app;

// Check if the file is being run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}