const { kafka } = require('./client');

async function consumeMessages() {
    const consumer = kafka.consumer({ groupId: 'rider-group' });

    console.log("Connecting consumer...");
    await consumer.connect();
    console.log("Consumer connected.");

    console.log("Subscribing to topic 'rider-updates'...");
    await consumer.subscribe({ topic: 'rider-updates', fromBeginning: true });
    console.log("Subscribed to topic.");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = message.value.toString();
            console.log(`Received message: ${value} from topic: ${topic}, partition: ${partition}`);
            // Here you can process the message further if needed
        },
    });
}

consumeMessages().catch(console.error);