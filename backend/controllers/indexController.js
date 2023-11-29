// Import user types
const Talent = require('../models/talentsModel');
const Manager = require('../models/managersModel');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const transporter = require('../emailConfig');

// Find user from db 
const findUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const talent = await Talent.findOne({ username });
        if (talent) {
            //Compare if the password is equal
            const passwordMatchTalent = await bcrypt.compare(password, talent.password);
            if (passwordMatchTalent) {
                const token = jwt.sign({
                    employee_id: talent.employee_id,
                    user_level: talent.user_level
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '15m'
                });

                // Respond with the token and additional user information
                res.status(200).json({
                    token,
                    employee_id: talent.employee_id,
                    user_level: talent.user_level
                });
            }
            else {
                console.log("Login failed Password Not Match");
                res.status(401).json({ message: 'Login failed Password Not Match' });
            }
        }
        else {
            // Insert code for other user types
            const manager = await Manager.findOne({ username });
            const passwordMatchManager = await bcrypt.compare(password, manager.password);

            console.log('Input Password:', password);
            console.log('Stored Password:', manager.password);
            console.log('Password Match:', passwordMatchManager);

            if (passwordMatchManager) {
                // Your existing code for successful password match
                const token = jwt.sign({
                    employee_id: manager.employee_id,
                    user_level: manager.user_level
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '15m'
                });

                res.status(200).json({
                    token,
                    employee_id: manager.employee_id,
                    user_level: manager.user_level
                });
            } else {
                // Log additional information if needed
                console.error('Password does not match.');
                res.status(401).json({ message: 'User not found or incorrect password' });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        console.log("Successfully connected to the forgot password route.");
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
            text: `Click the link to reset your password: https://cesphl-github-io-backend.vercel.app/reset-password/${token}`,
        };
        console.log("Trying to send email...");
        async function sendEmail() {
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent: ' + info.response);
            } catch (error) {
                console.log('Error sending email: ' + error);
            }
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
    const { password } = req.body;
    const token = req.params.token;

    try {
        const user = await Talent.findOne({ resetPasswordToken: token });
        if (!user) {
            return res.status(400).json({ message: 'User not found with this token.' });
        }
        if (user.resetPasswordToken !== token) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        if (Date.now() > user.resetPasswordExpiry) {
            return res.status(400).json({ message: 'Token expired' });
        }
        if (Date.now() < user.resetPasswordExpiry && token === user.resetPasswordToken) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            console.log(user.password);
            user.resetPasswordToken = '';
            user.resetPasswordExpiry = null;
            await user.save();
            return res.status(200).json({ message: 'Password reset.' });
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