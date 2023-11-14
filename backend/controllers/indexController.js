// Import user types
const Talent = require('../models/talentsModel');
const crypto = require('crypto');

const transporter = require('../emailConfig');

// Find user from db
const findUser = async(req, res) => {
    const {username, password} = req.body;

    try {
        const user = await Talent.findOne({ username, password });

        if (user) {
            res.status(200).json({ message: 'Login successful' });
        }
        else {
            // Insert code for other user types
            res.status(401).json({ message: 'Login failed' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const forgotPassword = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await Talent.findOne({ email });
        const token = crypto.randomBytes(20).toString('hex');
        const expirationTime = Date.now() + 30 * 60 * 1000;
        user.resetPasswordToken = token;
        user.resetPasswordExpiry = expirationTime;
        await user.save();


        const mailOptions = {
            from: 'miniertmailer@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `Click the link to reset your password: http://localhost:3000/reset-password?token=${token}`,
        };

        function sendEmail() {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log('Error sending email: ' + error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        }

        if (user) {
            res.status(200).json({ message: 'Password instructions sent to your email.' });
            sendEmail();
        }
        else {
            // Insert code for other user types
            res.status(401).json({ message: 'Email not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const resetPass = async (req, res) => {
    const { newPassword } = req.body;
    const token = req.params.token;

    try {
        const user = await Talent.findOne({ resetPasswordToken: token });
        if (!user) {
            console.log("Eval1");
            return res.status(400).json({ message: 'User not found with this token.' });
        }
        if (user.resetPasswordToken !== token) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        if (Date.now() > user.resetPasswordExpiry) {
            return res.status(400).json({ message: 'Token expired' });
        }
        if (Date.now() < user.resetPasswordExpiry && token === user.resetPasswordToken) {
            user.password = newPassword;
            user.resetPasswordToken = '';
            user.resetPasswordExpiry = null;
            await user.save();
            return res.status(200).json({ message: 'Password reset.'});
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    findUser,
    forgotPassword,
    resetPass
}