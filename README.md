# 🐰 RabbitMQ Demo (Node.js)

This project demonstrates how to use **RabbitMQ with Node.js** to handle background tasks like appointments, notifications, or jobs in a **reliable and scalable way**.

It uses:
- **Producer** → sends messages
- **RabbitMQ** → stores messages safely
- **Consumer** → processes messages one by one

---

## 📌 Why RabbitMQ?

Without RabbitMQ:
- API gets slow when traffic increases
- Requests fail during peak load
- Background tasks block users

With RabbitMQ:
- User gets instant response
- Heavy work runs in background
- No data loss if server crashes
- Easy to scale later

Think of RabbitMQ as a **waiting room** between users and your workers.

---


---

## ⚙️ Prerequisites

- Node.js (v18+ recommended)
- Docker
- Basic knowledge of JavaScript

---

## 🐳 Run RabbitMQ using Docker

```bash
docker run -d \
  --hostname rabbitmq \
  --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management