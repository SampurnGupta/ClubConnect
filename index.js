const express = require('express');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // Removed
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Added
const routes = require('./routes/routes'); // Added

const app = express();

// Define Attendance Schema
const attendanceSchema = new mongoose.Schema({
    eventName: String,
    venue: String,
    date: Date,
    status: String
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Added to parse URL-encoded data
app.use(cors());
app.use(express.static('public'));
app.use('/scripts', express.static(path.join(__dirname, 'scripts'))); // Ensure scripts are served correctly

// Ensure 'public' directory is used for static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'data')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Added

// ...existing code...

// Connect to MongoDB
mongoose.connect('mongodb+srv://sampurngupta:6MM60rLT8TQ4l7sK@cluster0.pwm05.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error:", err));

// Use Routes
app.use('/', routes);

// API Routes for CRUD operations
app.get('/api/attendance', async (req, res) => {
    try {
        const records = await Attendance.find();
        res.json(records);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/api/attendance/:id', async (req, res) => { // Ensure this route exists
    try {
        const record = await Attendance.findById(req.params.id);
        res.json(record);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/attendance', async (req, res) => {
    try {
        const newRecord = new Attendance(req.body);
        await newRecord.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.put('/api/attendance/:id', async (req, res) => {
    try {
        await Attendance.findByIdAndUpdate(req.params.id, req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/api/attendance/:id', async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/attendance', async (req, res) => {
    try {
        const records = await Attendance.find();
        res.render('attendance', { attendance: records });
    } catch (err) {
        res.status(500).send(err);
    }
});

// ...existing code...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
