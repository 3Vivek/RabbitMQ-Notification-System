const { connectRabbitMQ, getChannel } = require("./rabbitmq");
const { APPOINTMENT_QUEUE } = require("./queue");

async function startConsumer() {
  await connectRabbitMQ();
  const channel = getChannel();

  await channel.assertQueue(APPOINTMENT_QUEUE, { durable: true });
  await channel.prefetch(1);

  console.log("Waiting for messages...");
  channel.consume(APPOINTMENT_QUEUE, async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());
      console.log("Received:", data);

      // simulate work
      await new Promise((res) => setTimeout(res, 2000));

      channel.ack(msg); // ✅ message processed successfully
    } catch (err) {
      console.error("Error:", err.message);

      // put message back in queue
      channel.nack(msg, false, true);
    }
  });
}

startConsumer().catch(console.error);
