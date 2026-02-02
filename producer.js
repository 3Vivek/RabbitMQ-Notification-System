// const { getChannel, connectRabbitMQ } = require("./rabbitmq");
// const { APPOINTMENT_QUEUE } = require("./queue");

// async function sendAppointmentMessage(data) {
//   const channel = getChannel();
//   await channel.assertQueue(APPOINTMENT_QUEUE, { durable: true });
//   channel.sendToQueue(APPOINTMENT_QUEUE, Buffer.from(JSON.stringify(data)), {
//     persistent: true,
//   });
//   console.log("📨 Message sent:", data);
// }

// async function main() {
//   await connectRabbitMQ();

//   await sendAppointmentMessage({
//     appointmentId: "123",
//     patientId: "P456",
//     doctorId: "D789",
//     date: "2026-02-02",
//     time: "10:30 AM",
//   });

//   setTimeout(() => process.exit(0), 500);
// }

// main().catch(console.error);


const { APPOINTMENT_QUEUE } = require("./queue");
const { connectRabbitMQ, getChannel, closeRabbitMQ } = require("./rabbitmq");


async function sendMessages() {
  await connectRabbitMQ();
  const channel = getChannel();

  await channel.assertQueue(APPOINTMENT_QUEUE, { durable: true });

  for (let i = 1; i <= 10; i++) {
    const message = {
      id: i,
      type: "APPOINTMENT_CREATED",
      patient: `Patient-${i}`,
      time: new Date().toISOString(),
    };

    channel.sendToQueue(
      APPOINTMENT_QUEUE,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );

    console.log("📤 Sent:", message);
  }

  setTimeout(async () => {
    await closeRabbitMQ();
    process.exit(0);
  }, 500);
}

sendMessages();