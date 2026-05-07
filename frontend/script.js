const imageInput = document.getElementById('imageInput');
const dropZone = document.getElementById('dropZone');
const colorizeBtn = document.getElementById('colorizeBtn');
const resultsArea = document.getElementById('resultsArea');
const originalPreview = document.getElementById('originalPreview');
const resultImage = document.getElementById('resultImage');
const loader = document.getElementById('loader');
const downloadBtn = document.getElementById('downloadBtn');

// Handle image preview
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        showPreview(file);
    }
});

// Drag & Drop handling
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('active');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('active');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('active');
    const file = e.dataTransfer.files[0];
    if (file) {
        imageInput.files = e.dataTransfer.files;
        showPreview(file);
    }
});

function showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        originalPreview.src = e.target.result;
        resultsArea.style.display = 'grid'; // Just show original first
        colorizeBtn.disabled = false;
        resultImage.src = ''; // Clear previous result
        downloadBtn.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

async function uploadImage() {
    const file = imageInput.files[0];
    if (!file) return;

    // UI state: Processing
    colorizeBtn.disabled = true;
    loader.style.display = 'flex';
    colorizeBtn.style.display = 'none';

    const formData = new FormData();
    formData.append('image', file);

    try {
        // Updated API port
        const response = await fetch('http://127.0.0.1:5001/colorize', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Colorization failed on the server.');
        }

        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);

        // Show result
        resultImage.src = imageObjectURL;

        // Prepare download
        downloadBtn.style.display = 'block';
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = imageObjectURL;
            link.download = `colorized_${file.name}`;
            link.click();
        };

    } catch (error) {
        console.error('Error:', error);
        alert('Oops! Something went wrong while colorizing. Please try again or check the backend.');
    } finally {
        // UI state: Reset
        loader.style.display = 'none';
        colorizeBtn.style.display = 'block';
        colorizeBtn.disabled = false;
    }
}