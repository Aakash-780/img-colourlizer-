# 🎨 AI Image Colorizer using DeOldify

This project is a small AI-based image colorizer built using the **DeOldify** library and the concept of **GANs (Generative Adversarial Networks)**. The application converts old black-and-white images into realistic colored images.

It includes:
- A simple frontend using HTML, CSS, and JavaScript
- A Python Flask backend
- Integration with the DeOldify deep learning model

---

# 🚀 Features

- Upload black-and-white images
- Automatically generate colorized images
- Simple and beginner-friendly project structure
- Uses Deep Learning and GAN concepts
- Fast and realistic colorization results

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

DeOldify became popular because it can generate very realistic colors for old grayscale images.

---

# 🤖 GAN Concept Used in This Project

This project works on the concept of a **GAN (Generative Adversarial Network)**.

A GAN mainly contains two parts:

## 1️⃣ Generator

The Generator tries to create realistic colored images from black-and-white images.

### Work:
- Takes grayscale image as input
- Predicts realistic colors
- Generates a colorized image

---

## 2️⃣ Discriminator

The Discriminator checks whether the generated image looks real or fake.

### Work:
- Compares generated image with real images
- Gives feedback to Generator
- Helps improve image quality

---

## 🔁 Working of GAN

1. Input black-and-white image
2. Generator adds colors
3. Discriminator checks image quality
4. Generator improves using feedback
5. Final realistic colorized image is produced

This continuous competition between Generator and Discriminator helps the model learn better colorization.

---

# 🏗️ Project Structure

```bash
img-colourlizer/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   └── app.py
│
├── DeOldify/
│
└── README.md
```

---

# ⚙️ Technologies Used

- Python
- Flask
- HTML
- CSS
- JavaScript
- PyTorch
- FastAI
- DeOldify

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

## 3️⃣ Create Virtual Environment

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

## 4️⃣ Install Dependencies

```bash
pip install -r DeOldify/requirements.txt
pip install flask
```

---

# ▶️ How to Run the Project

## Step 1: Start Backend Server

```bash
cd backend
python app.py
```

Backend will start on:

```bash
http://127.0.0.1:5000/
```

---

## Step 2: Open Frontend

Open:

```bash
frontend/index.html
```

in your browser.

---

# 📸 How It Works

1. User uploads an old black-and-white image
2. Image is sent to Flask backend
3. DeOldify model processes the image
4. GAN generates realistic colors
5. Final colorized image is displayed to the user

---

# 🎯 Future Improvements

- Video colorization support
- Drag and drop image upload
- Better UI design
- Cloud deployment
- Real-time preview

---

# 📚 Learning Outcome

Through this project, you can learn:

- Basics of GANs
- Image processing using AI
- Flask backend integration
- Frontend and backend communication
- Deep learning model integration

---

# 🙌 Credits

- DeOldify Open Source Community
- FastAI
- PyTorch

---

# 📄 License

This project is made for learning and educational purposes.
