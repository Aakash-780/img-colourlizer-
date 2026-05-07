from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import ssl
import torch
import functools

# Bypass SSL certificate verification for torch model downloads (macOS issue)
ssl._create_default_https_context = ssl._create_unverified_context

# Monkey-patch torch.load for Torch 2.6+ compatibility with legacy fastai pickles
import torch.serialization
original_load = torch.load
def patched_load(*args, **kwargs):
    if 'weights_only' not in kwargs:
        kwargs['weights_only'] = False
    return original_load(*args, **kwargs)
torch.load = patched_load
# Also patch the internal reference used by torch.serialization
torch.serialization.load = patched_load

# Ensure PYTHONPATH includes the DeOldify folder
import sys
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEOLDIFY_DIR = os.path.join(BASE_DIR, "DeOldify")
if DEOLDIFY_DIR not in sys.path:
    sys.path.append(DEOLDIFY_DIR)

# DeOldify imports
from deoldify import device
from deoldify.device_id import DeviceId
from deoldify.visualize import *

from pathlib import Path

app = Flask(__name__)
CORS(app)

# Absolute paths for reliability
BASE_DIR = Path("/Users/aakashsrivastava/Desktop/ai-image-colorizer")
DEOLDIFY_DIR = BASE_DIR / "DeOldify"
UPLOAD_FOLDER = BASE_DIR / "uploads"
OUTPUT_FOLDER = BASE_DIR / "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

device.set(device=DeviceId.CPU)

import matplotlib
matplotlib.use('agg') # Fix for macOS GUI issues

# Initialize colorizer with fixed root_folder
colorizer = get_image_colorizer(root_folder=DEOLDIFY_DIR, artistic=True)

@app.route("/colorize", methods=["POST"])
def colorize():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Save input image
    input_path = UPLOAD_FOLDER / file.filename
    file.save(str(input_path))

    # Process image using get_transformed_image instead of plot
    # This returns a PIL image and avoids Matplotlib GUI issues
    try:
        result_img = colorizer.get_transformed_image(
            path=input_path,
            render_factor=35,
            post_process=True,
            watermarked=True
        )
        
        # Save output image
        output_path = OUTPUT_FOLDER / file.filename
        # Convert to RGB if needed to save as JPEG safely
        if result_img.mode in ("RGBA", "P"):
            result_img = result_img.convert("RGB")
        result_img.save(str(output_path), format="JPEG", quality=95)

        return send_file(str(output_path), mimetype='image/jpeg')
    except Exception as e:
        print(f"Error during colorization: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)