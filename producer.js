const { kafka } = require('./client');


async function produceMessage() {
    const producer = kafka.producer();

    console.log("Connecting producer...");
    await producer.connect();
    console.log("Producer connected.");

    try {
        const result = await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: 0,
                    key: 'location-update',
                    value: JSON.stringify({
                        riderId: 'rider1',
                        status: 'on-the-way',
                        location: { lat: 37.7749, lng: -122.4194 },
                        timestamp: new Date().toISOString(),
                    }),
                },
                {
                    partition: 0,
                    key: 'location-update',
                    value: JSON.stringify({
                        riderId: 'rider2',
                        status: 'arrived',
                        location: { lat: 37.7749, lng: -122.4194 },
                        timestamp: new Date().toISOString(),
                    }),
                },
            ],
        });
        console.log("Message produced:", result);
    } catch (error) {
        console.error("Error producing message:", error);
    } finally {
        await producer.disconnect();
        console.log("Producer disconnected.");
    }
}

produceMessage().catch(console.error);