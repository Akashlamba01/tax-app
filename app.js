const express = require('express');
const connection = require('./db')
const bodyParser = require('body-parser');

const app = express();

const taxPayerRouter = require('./modules/taxPayer/taxPayerRoute')
const adminRouter = require('./modules/admin/adminRoute')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     console.log('hello world');
// })

app.use('/taxPayer', taxPayerRouter)
app.use('/admin', adminRouter)

app.listen(8000, () => {
    console.log('Surver is running on the port:', 8000);
})
