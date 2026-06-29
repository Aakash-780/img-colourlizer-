# 🎨 AI Image Colorizer using DeOldify

> An AI-powered web application that restores and colorizes old black-and-white images using **DeOldify**, **PyTorch**, and **GANs**.

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask)
![PyTorch](https://img.shields.io/badge/AI-PyTorch-EE4C2C?logo=pytorch)
![License](https://img.shields.io/badge/License-Educational-blue)

🌐 **Live Demo:** [Open Application](https://img-colourlizer.vercel.app)

---

## 📖 Overview

This project is a modern AI-powered image colorizer built using **DeOldify** and **Generative Adversarial Networks (GANs)**. It transforms old grayscale photographs into realistic, vibrant color images using deep learning.

The frontend is developed with **React.js** and supports both **Light** and **Dark** themes, while the backend is powered by **Flask** and the **DeOldify** model.

---

## ✨ Features

* 🎨 AI-powered image colorization
* 🧠 Deep Learning with DeOldify
* ⚡ Fast React + Vite frontend
* 🌙 Dark & Light theme support
* 📥 Download colorized images
* 📷 Supports old grayscale photographs
* 🔄 Flask REST API integration

---

## 🧠 What is DeOldify?

DeOldify is an open-source deep learning project used for:

* Image colorization
* Video colorization
* Restoration of old photographs

Built using:

* PyTorch
* FastAI
* GAN (Generative Adversarial Network)

It is widely known for producing highly realistic and vibrant colorized images.

---

## 🤖 GAN Architecture

This project is based on a **Generative Adversarial Network (GAN)** consisting of two neural networks.

### Generator

The Generator receives a grayscale image and predicts realistic colors to create a colorized version.

**Responsibilities**

* Accept grayscale input
* Predict color information
* Generate realistic colored images

---

### Discriminator

The Discriminator evaluates whether the generated image appears real or fake.

**Responsibilities**

* Compare generated images with real color images
* Provide feedback to the Generator
* Improve colorization quality during training

---

## 🔄 Workflow

1. Upload a black-and-white image.
2. React sends the image to the Flask backend.
3. DeOldify processes the image.
4. The GAN predicts realistic colors.
5. The colorized image is returned.
6. Preview and download the final result.

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

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Lucide React

### Backend

* Python
* Flask
* Flask-CORS

### AI / Deep Learning

* DeOldify
* PyTorch
* FastAI
* GAN

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/your-username/img-colourlizer.git
cd img-colourlizer
```

---

### Frontend

```bash
cd frontend
npm install
npm install lucide-react
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

### Backend

Create a virtual environment.

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux**

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Start the server.

```bash
python app.py
```

Runs on:

```
http://127.0.0.1:5001
```

---

## 📸 How It Works

```
Upload Image
      │
      ▼
 React Frontend
      │
      ▼
 Flask Backend
      │
      ▼
 DeOldify AI Model
      │
      ▼
 Colorized Image
      │
      ▼
 Preview & Download
```

---

## 📄 License

This project is intended for **learning and educational purposes**.

---

⭐ If you found this project helpful, consider giving it a **star** on GitHub!
