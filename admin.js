const { kafka } = require('./client');

async function init() {
    const admin = kafka.admin();
    console.log('Connecting to Kafka...');
    await admin.connect();
    console.log('Connected to Kafka');

    console.log('Creating topics...');
    await admin.createTopics({
        topics: [
            {
                topic: 'rider-updates',
                numPartitions: 2,
            },
        ],
    });
    console.log('Topics created successfully');

    console.log("Disconnecting from Kafka...");
    await admin.disconnect();
    console.log("Disconnected from Kafka");
}

init().catch(console.error);