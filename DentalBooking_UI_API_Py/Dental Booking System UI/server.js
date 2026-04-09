const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
const DATA_FILE = 'data.txt';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let users = [];
let appointments = [];

function loadData() {
    if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        const parsedData = JSON.parse(data);
        users = parsedData.users || [];
        appointments = parsedData.appointments || [];
    }
}

function saveData() {
    const data = JSON.stringify({ users, appointments });
    fs.writeFileSync(DATA_FILE, data, 'utf8');
}

function isFutureDate(date, time) {
    const appointmentDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    return appointmentDateTime > now;
}

function isOverlap(start1, end1, start2, end2) {
    return (start1 < end2 && start2 < end1);
}

function isValidDuration(startTime, endTime) {
    const start = new Date(`1970-01-01T${startTime}:00Z`);
    const end = new Date(`1970-01-01T${endTime}:00Z`);
    const duration = (end - start) / (1000 * 60); // convert milliseconds to minutes
    return duration >= 30;
}

loadData();

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
});

app.post('/signup', (req, res) => {
    const { username, password, phone } = req.body;
    const userExists = users.some(u => u.username === username || u.phone === phone);
    if (userExists) {
        res.status(409).json({ success: false, message: 'Username or phone number already exists' });
    } else {
        users.push({ username, password, phone });
        saveData();
        res.status(201).json({ success: true });
    }
});

app.delete('/user', (req, res) => {
    const { username } = req.body;
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        appointments = appointments.filter(a => a.username !== username);
        saveData();
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

app.post('/book', (req, res) => {
    const { username, date, startTime, endTime } = req.body;
    if (!isFutureDate(date, startTime)) {
        res.status(400).json({ success: false, message: 'Cannot book an appointment in the past' });
        return;
    }
    if (!isValidDuration(startTime, endTime)) {
        res.status(400).json({ success: false, message: 'Appointment must be at least 30 minutes' });
        return;
    }
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);
    if (startDateTime >= endDateTime) {
        res.status(400).json({ success: false, message: 'End time must be after start time' });
        return;
    }
    const appointmentExists = appointments.some(a => a.date === date && isOverlap(new Date(`${a.date}T${a.startTime}`), new Date(`${a.date}T${a.endTime}`), startDateTime, endDateTime));
    if (appointmentExists) {
        res.status(409).json({ success: false, message: 'Appointment slot already booked or overlaps with another appointment' });
    } else {
        const newAppointment = { username, date, startTime, endTime };
        appointments.push(newAppointment);
        saveData();
        res.status(201).json({ success: true });
    }
});

app.post('/cancel', (req, res) => {
    const { username, date, startTime, endTime } = req.body;
    const appointmentIndex = appointments.findIndex(a => a.username === username && a.date === date && a.startTime === startTime && a.endTime === endTime);
    if (appointmentIndex !== -1) {
        appointments.splice(appointmentIndex, 1);
        saveData();
        res.status(200).json({ success: true });
    } else {
        res.status(404).json({ success: false, message: 'No appointment found to cancel' });
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
