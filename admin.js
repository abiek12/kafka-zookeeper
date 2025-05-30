const { Kafka, Kafka } = require('kafkajs');

const Kafka = new Kafka({
    clientId: 'admin-app',
    brokers: ['192.168.29.98:9092'],
})

async function init() {
    const admin = Kafka.admin();
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