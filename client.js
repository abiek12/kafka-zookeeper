const { Kafka } = require('kafkajs');

exports.Kafka = new Kafka({
    clientId: 'admin-app',
    brokers: ["192.168.29.98:9092"],
})
