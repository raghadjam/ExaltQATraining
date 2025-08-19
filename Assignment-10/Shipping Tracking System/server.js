const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const stagesTemplate = [
    { name: 'Order Received', status: 'pending', cause: '' },
    { name: 'Order Shipped', status: 'pending', cause: '' },
    { name: 'Order Received to Destination Country', status: 'pending', cause: '' },
    { name: 'Order Clearance Completed', status: 'pending', cause: '' },
    { name: 'Order in Delivery Stage', status: 'pending', cause: '' },
    { name: 'Order Delivered', status: 'pending', cause: '' }
];

let data = {};

fs.readFile('data.txt', 'utf8', (err, content) => {
    if (err) throw err;
    data = JSON.parse(content);
});

app.post('/track', (req, res) => {
    const { trackingId, password } = req.body;
    if (data[trackingId] && data[trackingId].password === password) {
        res.status(200).json({ success: true, stages: data[trackingId].stages });
    } else {
        res.status(401).json({ success: false });
    }
});

app.post('/update', (req, res) => {
    const { trackingId, stageIndex, status, cause } = req.body;
    if (data[trackingId]) {
        const stages = data[trackingId].stages;

        if (stages[stageIndex].status === 'done') {
            res.status(400).json({ success: false });
        } else {
            stages[stageIndex].status = status;
            stages[stageIndex].cause = status === 'rejected' ? cause : '';
            data[trackingId].stages = stages;
            fs.writeFile('data.txt', JSON.stringify(data), err => {
                if (err) throw err;
                res.status(200).json({ success: true, stages });
            });
        }
    } else {
        res.status(401).json({ success: false });
    }
});

app.post('/addOrder', (req, res) => {
    const { trackingId, password } = req.body;
    if (!trackingId || !password) {
        return res.status(400).json({ success: false, message: 'Missing trackingId or password' });
    }
    if (data[trackingId]) {
        return res.status(409).json({ success: false, message: 'Order already exists' });
    }
    data[trackingId] = {
        password,
        stages: JSON.parse(JSON.stringify(stagesTemplate))
    };
    fs.writeFile('data.txt', JSON.stringify(data), err => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to save order' });
        res.status(201).json({ success: true, stages: data[trackingId].stages });
    });
});
 
app.delete('/deleteOrder', (req, res) => {
    const { trackingId, password } = req.body;
    if (!trackingId || !password) {
        return res.status(400).json({ success: false, message: 'Missing trackingId or password' });
    }
    if (!data[trackingId]) {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }
    if (data[trackingId].password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    delete data[trackingId];
    fs.writeFile('data.txt', JSON.stringify(data), err => {
        if (err) return res.status(500).json({ success: false, message: 'Failed to delete order' });
        res.status(200).json({ success: true, message: 'Order deleted' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
