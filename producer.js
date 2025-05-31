const { kafka } = require('./client');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function produceMessage() {
    const producer = kafka.producer();

    console.log("Connecting producer...");
    await producer.connect();
    console.log("Producer connected.");

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async (line) => {
        if (line.trim() === "exit") {
            console.log("Exiting producer...");
            await producer.disconnect();
            console.log("Producer disconnected.");
            rl.close();
            return;
        }

        try {
            const [riderName, status, location] = line.split(" ");
            const result = await producer.send({
                topic: 'rider-updates',
                messages: [
                    {
                        partition: location.toLowerCase() === "north" ? 0 : 1,
                        key: 'location-update',
                        value: JSON.stringify({
                            riderId: riderName,
                            status: status,
                            location: location,
                            timestamp: new Date().toISOString(),
                        }),
                    },
                ],
            });
            console.log("Message produced:", result);
        } catch (error) {
            console.error("Error producing message:", error);
        }
    }).on("close", async () => {
        console.log("Producer interface closed.");
        console.log("Producer disconnected.");
        await producer.disconnect();
    });
}

produceMessage().catch(console.error);