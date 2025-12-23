# 🚀 AWS 3-Tier Full Stack Authentication Application

This project demonstrates a **production-style 3-tier architecture** deployed on AWS using **React (frontend)**, **Node.js + Express (backend)**, and **MariaDB on Amazon RDS (database)**. The focus of this project is not just functionality, but **real-world deployment, debugging, and operations**.

---

## 🧱 Architecture Overview

**Frontend (Presentation Layer)**

* React application
* Built using `npm run build`
* Hosted on **Amazon S3**
* Delivered globally via **Amazon CloudFront**

**Backend (Application Layer)**

* Node.js + Express REST API
* Runs on EC2 instances in **private subnets**
* Managed by **Auto Scaling Group (ASG)**
* Fronted by an **Application Load Balancer (ALB)**
* Process management using **PM2**

**Database (Data Layer)**

* **Amazon RDS (MariaDB)**
* Private subnet only
* Access restricted via Security Groups

---

## 🗺️ Network Design

* Custom VPC
* 2 Availability Zones
* Public Subnets:

  * Application Load Balancer
  * NAT Gateway
* Private Subnets:

  * Backend EC2 (ASG)
  * RDS (MariaDB)

---

## 🔐 Security Groups (Conceptual Explanation)

* **ALB SG**: Allows HTTP/HTTPS from the internet
* **Backend SG**: Allows traffic **only from ALB SG** on port `3200`
* **DB SG**: Allows traffic **only from Backend SG** on port `3306`

This ensures **least privilege access** between layers.

---

## 📁 Project Structure

```
Fullstack-Authentication-system/
├── backend/
│   ├── index.js
│   ├── app.js
│   ├── ecosystem.config.js
│   ├── configs/
│   │   └── db.js
│   ├── routes/
│   │   └── auth.js
│   ├── package.json
│   └── .env (not committed)
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── build/ (uploaded to S3)
└── README.md
```

---

## 🔧 Backend Setup

### Environment Variables (`.env`)

```env
DB_HOST=<RDS_ENDPOINT>
DB_USER=appuser
DB_PASSWORD=********
DB_NAME=MYDB
PORT=3200
```

> `.env` is **never committed**. It is securely pulled from S3 via IAM Role during instance boot.

---

### Database Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Start Backend (Manual)

```bash
cd backend
npm install
node index.js
```

### Start Backend (Production)

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## ⚙️ Auto Scaling Group – User Data Script

```bash
#!/bin/bash
set -xe
exec > /var/log/user-data.log 2>&1

dnf update -y
dnf install -y git nodejs npm
npm install -g pm2

mkdir -p /opt/apps
cd /opt/apps

git clone https://github.com/<your-repo>/Fullstack-Authentication-system.git
chown -R ec2-user:ec2-user /opt/apps

aws s3 cp s3://<bucket>/.env /opt/apps/Fullstack-Authentication-system/backend/.env
chown ec2-user:ec2-user /opt/apps/Fullstack-Authentication-system/backend/.env

cd /opt/apps/Fullstack-Authentication-system/backend
npm install

pm2 start ecosystem.config.js
pm2 save
env PATH=$PATH:/usr/bin pm2 startup systemd -u ec2-user --hp /home/ec2-user
```

---

## 🧪 API Endpoints

### Health Check

```
GET /health
```

Response:

```json
{ "status": "UP" }
```

### Register

```
POST /api/register
```

```json
{
  "name": "Alice",
  "email": "alice@test.com",
  "password": "123456"
}
```

### Login

```
POST /api/login
```

```json
{
  "email": "alice@test.com",
  "password": "123456"
}
```

---

## 🧠 Debugging Commands Used

### PM2

```bash
pm2 status
pm2 logs
pm2 logs backend --lines 100
```

### Cloud-init

```bash
sudo cat /var/log/cloud-init-output.log
```

### Network

```bash
ss -tulnp | grep 3200
curl http://localhost:3200/health
```

### Database

```bash
mariadb -h <RDS_ENDPOINT> -u appuser -p MYDB
SHOW GRANTS FOR 'appuser'@'%';
```

---

## 🐞 Common Issues Faced & Fixes

| Issue                 | Root Cause                 | Fix                       |
| --------------------- | -------------------------- | ------------------------- |
| Backend not starting  | Missing PM2 / npm          | Install via user-data     |
| DB access denied      | Wrong user host            | GRANT on `%`              |
| ASG instance broken   | User-data permission issue | chown `/opt/apps`         |
| 504 Gateway Timeout   | Backend down               | Check PM2 + health        |
| Blank CloudFront page | SPA routing                | Error page → `index.html` |

---

## 📦 Frontend Deployment

```bash
cd frontend
npm install
npm run build
```

Upload `build/` contents to S3 and invalidate CloudFront cache.

---

## ✅ Final Validation Checklist

* [x] ALB target group healthy
* [x] `/health` returns UP
* [x] Register stores user in DB
* [x] Login validates credentials
* [x] Frontend loads via CloudFront
* [x] Backend auto-recovers via PM2

---

## 🧩 Key Learnings

* Importance of IAM Roles over static credentials
* Why ASG user-data must be **idempotent**
* How PM2 behaves differently in boot vs SSH sessions
* Debugging real production issues (timeouts, permissions, pooling)

---


