const Subscriber = require('./subscriber.model');
const nodemailer = require('nodemailer');

const subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).send({ message: "Email is already subscribed" });
        }
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        // Send email notification to Admin
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: 'lvasanth2005@gmail.com',
                subject: 'New Newsletter Subscriber!',
                text: `Great news! You have a new newsletter subscriber.\n\nSubscriber Email: ${email}`
            };

            await transporter.sendMail(mailOptions);
            console.log("Admin notification email sent successfully");
        } catch (emailError) {
            console.error("Failed to send notification email:", emailError);
        }

        res.status(200).send({ message: "Successfully subscribed", subscriber: newSubscriber });
    } catch (error) {
        console.error("Error subscribing", error);
        res.status(500).send({ message: "Failed to subscribe" });
    }
};

module.exports = {
    subscribe
};
