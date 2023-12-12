const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/submitForm', (req, res) => {
    const { username, email, phone, time, message } = req.body;

    const subject = 'New Contact Form Submission';
    const to = 'ranishppk@gmail.com';

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ranishppk@gmail.com',
            pass: 'exqn dhst pbtp oiar'
        }
    });

    const mailOptions = {
        from: email,
        to: to,
        subject: subject,
        text: `Username: ${username}\nEmail: ${email}\nPhone: ${phone}\nTime to Contact: ${time}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('Error: Unable to send email');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).send('Thank you for contacting us!');
    });
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error('Internal Server Error:', err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
