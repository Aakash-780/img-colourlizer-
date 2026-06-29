<div align="center">

# 🎨 AI Image Colorizer using DeOldify

### Transform Old Black & White Photos into Vibrant Color Images using AI

<p>
An AI-powered web application built with <b>React</b>, <b>Flask</b>, <b>PyTorch</b>, and <b>DeOldify</b> that restores and colorizes vintage photographs using <b>Generative Adversarial Networks (GANs)</b>.
</p>

<p>
<a href="https://img-colourlizer.vercel.app">🌐 Live Demo</a> •
<a href="https://github.com/your-username/img-colourlizer">📂 Repository</a>
</p>

<p>
<img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white" />

        
<img src="https://img.shields.io/badge/Flask-000000?logo=flask&logoColor=white" />


<img src="https://img.shields.io/badge/PyTorch-EE4C2C?logo=pytorch&logoColor=white" />
<img src="https://img.shields.io/badge/FastAI-0D96F6" />
<img src="https://img.shields.io/badge/GAN-Based-success" />
<img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
</p>

</div>

---

## 📖 Overview

This project colorizes grayscale photographs using the **DeOldify Deep Learning model**.

The application combines a modern **React.js frontend** with a **Flask backend** that runs the trained DeOldify model to generate realistic colors for historical and black-and-white images.

---

## ✨ Features

| Feature               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| 🎨 AI Colorization    | Convert grayscale images into realistic color images |
| 🧠 DeOldify Model     | Uses state-of-the-art Deep Learning                  |
| ⚡ Fast UI             | Built with React + Vite                              |
| 🌙 Dark / Light Theme | Modern responsive interface                          |
| 📥 Download Images    | Save generated results instantly                     |
| 🔄 Flask API          | Backend communicates through REST APIs               |
| 📱 Responsive Design  | Works on desktop and mobile                          |

---

## 🛠️ Tech Stack

| Frontend     | Backend    | AI / ML  |
| ------------ | ---------- | -------- |
| React.js     | Flask      | DeOldify |
| Tailwind CSS | Flask-CORS | PyTorch  |
| Vite         | Python     | FastAI   |
| Lucide React | REST API   | GAN      |

---

## 🤖 GAN Architecture

A **Generative Adversarial Network (GAN)** consists of two neural networks.

### 🟢 Generator

* Accepts grayscale images
* Predicts realistic colors
* Produces a colorized image

### 🔴 Discriminator

* Compares generated images with real images
* Detects unrealistic colors
* Helps the Generator improve through feedback

Together, they produce highly realistic image colorization.

---

## 🔄 Application Workflow

```text
        Upload Image
              │
              ▼
     React Frontend (Vite)
              │
              ▼
      Flask REST API
              │
              ▼
      DeOldify AI Model
              │
              ▼
     Colorized Prediction
              │
              ▼
 Preview & Download Image
```

---

## 📁 Project Structure

```bash
img-colourlizer/
│
├── frontend/
│   ├── src/
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

## 🚀 Installation

<details>

<summary><b>📦 Frontend Setup</b></summary>

```bash
cd frontend

npm install

npm install lucide-react

npm run dev
```

Runs on

```
http://localhost:5173
```

</details>

<details>

<summary><b>🐍 Backend Setup</b></summary>

Create virtual environment

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run

```bash
python app.py
```

Backend

```
http://127.0.0.1:5001
```

</details>

---

## 📸 How It Works

1. Upload a black-and-white image.
2. The React frontend sends it to the Flask API.
3. DeOldify processes the image using a trained GAN.
4. The AI predicts realistic colors.
5. The colorized image is returned.
6. Download the final result.

---

## 🎯 Future Improvements

* ✅ Drag & Drop Upload
* ✅ Batch Image Processing
* ✅ Video Colorization
* ✅ Image History
* ✅ Cloud Storage Integration
* ✅ Multiple AI Models

---

## 📄 License

This project is developed for **educational and learning purposes**.

---

<div align="center">

### ⭐ If you like this project, don't forget to give it a Star!

Made with ❤️ using React, Flask & DeOldify

</div>
