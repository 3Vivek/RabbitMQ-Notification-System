// Create RabbitMQ connection
const amqp = require("amqplib");
let connection;
let channel;


//connect to MQ
async function connectRabbitMQ() {
  connection = await amqp.connect("amqp://localhost:5672");
  channel = await connection.createChannel();
  console.log("Rabbit MQ connected");
}

function getChannel() {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
}

//close the channel and connection
async function closeRabbitMQ() {
    await channel.close();
    await connection.close();
}


module.exports = {
  connectRabbitMQ,
  getChannel,
  closeRabbitMQ
};
