const Subscriber = require('./subscriber.model');

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
        res.status(200).send({ message: "Successfully subscribed", subscriber: newSubscriber });
    } catch (error) {
        console.error("Error subscribing", error);
        res.status(500).send({ message: "Failed to subscribe" });
    }
};

module.exports = {
    subscribe
};
