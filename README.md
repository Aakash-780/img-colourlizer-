---
title: ChromaRestore AI
emoji: 🎨
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
license: mit
---

# 🎨 AI Image Colorizer using DeOldify

This project is a modern AI-powered image colorizer built using the **DeOldify** library and the concept of **GANs (Generative Adversarial Networks)**. The application transforms old black-and-white photos into vibrant realistic colored images using Deep Learning.

The frontend is built using **React.js** with both **Dark & Light Theme support**, while the backend uses **Flask** and the **DeOldify AI model**.

---

# 🧠 What is DeOldify?

[DeOldify](https://github.com/jantic/DeOldify?utm_source=chatgpt.com) is an open-source deep learning project used for:

- Image colorization
- Video colorization
- Restoring old photographs

It is built using:
- PyTorch
- FastAI
- GAN (Generative Adversarial Network)

DeOldify became popular because it generates highly realistic and vibrant colors for grayscale images.

---

# 🤖 GAN Concept Used in This Project

This project works on the concept of a **GAN (Generative Adversarial Network)**.

A GAN mainly contains two neural networks:

---

## 1️⃣ Generator

The Generator creates realistic colored images from black-and-white images.

### Work:
- Takes grayscale image as input
- Predicts suitable colors
- Generates a colorized image

---

## 2️⃣ Discriminator

The Discriminator checks whether the generated image looks real or fake.

### Work:
- Compares generated image with real colored images
- Gives feedback to Generator
- Helps improve image quality

---

## 🔁 Working of GAN

1. User uploads a black-and-white image
2. Generator adds colors
3. Discriminator checks realism
4. Generator improves using feedback
5. Final realistic colorized image is produced

This continuous competition between Generator and Discriminator helps the AI learn realistic colorization.

---

# 🏗️ Project Structure

```bash
img-colourlizer/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── DeOldify/
│
└── README.md
```

---

# ⚙️ Technologies Used

## Frontend
- React.js
- Tailwind CSS
- Lucide React Icons
- Vite

## Backend
- Python
- Flask
- Flask-CORS

## AI / Deep Learning
- DeOldify
- PyTorch
- FastAI
- GAN

---

# 📥 Installation Guide

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/img-colourlizer.git
```

---

## 2️⃣ Move into Project Folder

```bash
cd img-colourlizer
```

---

# ⚛️ Frontend Setup (React)

## 3️⃣ Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 4️⃣ Install Required React Packages

```bash
npm install lucide-react
```

---

## 5️⃣ Run React Frontend

```bash
npm run dev
```

Frontend will start on:

```bash
http://localhost:5173
```

---

# 🐍 Backend Setup (Flask + DeOldify)

## 6️⃣ Open Backend Folder

```bash
cd backend
```

---

## 7️⃣ Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 8️⃣ Install Python Dependencies

```bash
pip install flask
pip install flask-cors
pip install torch torchvision fastai pillow opencv-python
```

---

## 9️⃣ Install Backend Requirements

```bash
pip install -r requirements.txt
```

---

## 🔟 Run Backend Server

```bash
python app.py
```

Backend will start on:

```bash
http://127.0.0.1:5001
```

---

# ▶️ How the Application Works

1. User uploads an old black-and-white image
2. React frontend sends image to Flask backend
3. DeOldify model processes the image
4. GAN generates realistic colors
5. Final colorized image is returned
6. User can preview and download the image

---

# 📄 License

This project is made for learning and educational purposes.
