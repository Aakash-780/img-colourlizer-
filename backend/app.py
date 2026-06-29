import collections
import collections.abc
collections.Sized = collections.abc.Sized
collections.Iterable = collections.abc.Iterable
collections.Mapping = collections.abc.Mapping
collections.MutableMapping = collections.abc.MutableMapping
collections.Sequence = collections.abc.Sequence
collections.MutableSequence = collections.abc.MutableSequence
collections.Callable = collections.abc.Callable

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import ssl
import torch
import sys
from pathlib import Path

# =========================
# SSL Fix for Torch Downloads
# =========================
ssl._create_default_https_context = ssl._create_unverified_context

# =========================
# Torch Compatibility Patch
# =========================
import torch.serialization
import inspect

original_load = torch.load

# Determine if 'weights_only' is supported by the installed torch version
try:
    has_weights_only = 'weights_only' in inspect.signature(original_load).parameters
except Exception:
    # Safe fallback checking PyTorch version
    import torch
    parts = torch.__version__.split('.')
    has_weights_only = False
    if parts and parts[0].isdigit():
        major = int(parts[0])
        minor = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 0
        has_weights_only = (major > 1) or (major == 1 and minor >= 13)

def patched_load(*args, **kwargs):
    if has_weights_only and 'weights_only' not in kwargs:
        kwargs['weights_only'] = False
    return original_load(*args, **kwargs)

torch.load = patched_load
torch.serialization.load = patched_load

# Ensure PYTHONPATH includes the DeOldify folder
import sys
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEOLDIFY_DIR = os.path.join(BASE_DIR, "backend", "DeOldify")
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
BASE_DIR = Path(__file__).resolve().parent.parent
DEOLDIFY_DIR = BASE_DIR / "backend" / "DeOldify"
UPLOAD_FOLDER = BASE_DIR / "uploads"
OUTPUT_FOLDER = BASE_DIR / "outputs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# =========================
# Add DeOldify to PYTHONPATH
# =========================
if str(DEOLDIFY_DIR) not in sys.path:
    sys.path.append(str(DEOLDIFY_DIR))

# =========================
# DeOldify Imports
# =========================
from deoldify import device
from deoldify.device_id import DeviceId
from deoldify.visualize import *

# =========================
# Flask App
# =========================
app = Flask(__name__)
CORS(app)

# =========================
# Use CPU
# =========================
device.set(device=DeviceId.CPU)

# =========================
# Matplotlib Fix
# =========================
import matplotlib
matplotlib.use('agg')

# =========================
# Initialize Colorizer
# =========================
colorizer = get_image_colorizer(
    root_folder=DEOLDIFY_DIR,
    artistic=True
)

# =========================
# Routes
# =========================
@app.route("/")
def home():
    return jsonify({
        "message": "AI Image Colorizer Backend Running Successfully 🚀"
    })

@app.route("/colorize", methods=["POST"])
def colorize():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    try:
        # Save Uploaded Image
        input_path = UPLOAD_FOLDER / file.filename
        file.save(str(input_path))

        # Colorize Image
        result_img = colorizer.get_transformed_image(
            path=input_path,
            render_factor=35,
            post_process=True,
            watermarked=False
        )

        # Save Output
        output_path = OUTPUT_FOLDER / f"colorized_{file.filename}"

        if result_img.mode in ("RGBA", "P"):
            result_img = result_img.convert("RGB")

        result_img.save(
            str(output_path),
            format="JPEG",
            quality=95
        )

        return send_file(
            str(output_path),
            mimetype="image/jpeg"
        )

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({
            "error": str(e)
        }), 500

# =========================
# Render Deployment
# =========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
