import express from 'express';

const app = express();


app.get('/', (req, res) => {
    res.send('welcome to hot and chills')
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});
