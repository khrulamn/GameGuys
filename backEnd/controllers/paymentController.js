const stripe = require("stripe")('sk_test_51LPdv4KzOPas1PZJ9HPPMuT82waXlJwdVe7Ttawt06I4J9l8rv6Wqj9NPN055GOOvFobe9pCAWlx9Ew0Un5c1n2k006lnN5LPC')

async function getClientSecret(req, res) {
    try {
        const payment = req.body

        const paymentIntent = await stripe.paymentIntents.create({
            amount: payment.total_price * 100,
            currency: 'myr',
            automatic_payment_methods: {
                enabled: true,
            }
        })

        res.send({
            clientSecret: paymentIntent.client_secret
        })
    }
    catch (error) {
        res.send({ error })
    }
}


function paymentProcessing(req, res) {

    const sig = request.headers['stripe-signature'];

    let event = request.body;
    let rawBody = Buffer.from(request.body)

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.created': {
            const paymentIntent = event.data.object;
            console.log({ paymentIntent, message: "created payment intent" })
            // Then define and call a function to handle the event payment_intent.created
            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            console.log({ paymentIntent, message: "payment failed" })
            // Then define and call a function to handle the event payment_intent.payment_failed
            break;
        }
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            console.log({ paymentIntent, message: "payment success" })
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        }
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
}

module.exports = {
    getClientSecret,
    paymentProcessing
}