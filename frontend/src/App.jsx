// App.jsx

import { useState, useRef } from "react";
import {
  Upload,
  Wand2,
  Download,
  Sun,
  Moon,
  Loader2,
} from "lucide-react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  const darkMode = theme === "dark";

  const handleImage = (file) => {
    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    setImage({
      file,
      preview: imageURL,
    });

    setResultImage(null);
  };

  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image.file);

    try {
      const response = await fetch("http://127.0.0.1:5001/colorize", {
        method: "POST",
        body: formData,
      });

      const blob = await response.blob();
      const resultURL = URL.createObjectURL(blob);

      setResultImage(resultURL);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-slate-950 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Navbar */}
      <div className="flex items-center justify-between px-6 py-5">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          AI Image Colorizer
        </h1>

        <button
          onClick={() =>
            setTheme(darkMode ? "light" : "dark")
          }
          className="p-3 rounded-xl bg-indigo-500 text-white"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div
          className={`rounded-3xl p-10 backdrop-blur-lg border ${
            darkMode
              ? "bg-slate-900/70 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="text-center">
            <h2 className="text-5xl font-extrabold mb-4">
              Bring Old Memories Back to Life
            </h2>

            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
              }`}
            >
              Upload your black & white photos and let AI
              transform them into vibrant masterpieces using
              DeOldify GAN technology.
            </p>
          </div>

          {/* Upload Box */}
          <div className="mt-10">
            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleImage(e.dataTransfer.files[0]);
              }}
              className={`border-2 border-dashed rounded-3xl p-14 text-center cursor-pointer transition-all ${
                darkMode
                  ? "border-slate-700 hover:border-indigo-500 bg-slate-900"
                  : "border-slate-300 hover:border-indigo-500 bg-slate-50"
              }`}
            >
              <Upload
                className="mx-auto mb-4 text-indigo-500"
                size={50}
              />

              <h3 className="text-2xl font-semibold mb-2">
                Drag & Drop Your Image
              </h3>

              <p
                className={
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }
              >
                JPG, PNG, WEBP supported
              </p>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                hidden
                onChange={(e) =>
                  handleImage(e.target.files[0])
                }
              />
            </div>

            {/* Button */}
            <div className="flex justify-center mt-8">
              <button
                disabled={!image || loading}
                onClick={uploadImage}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg flex items-center gap-3 hover:scale-105 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 />
                    Colorize Now
                  </>
                )}
              </button>
            </div>

            {/* Reloading Animation */}
            {loading && (
              <div className="flex flex-col items-center justify-center mt-10">
                <div className="relative w-28 h-28">
                  <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>

                  <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>

                  <div className="absolute inset-4 border-4 border-transparent border-b-purple-500 rounded-full animate-spin"></div>
                </div>

                <p className="mt-5 text-lg text-indigo-500 font-medium">
                  AI is colorizing your memory...
                </p>
              </div>
            )}

            {/* Result */}
            {(image || resultImage) && (
              <div className="grid md:grid-cols-2 gap-8 mt-14">
                {/* Original */}
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Original Image
                  </h3>

                  <img
                    src={image?.preview}
                    className="rounded-2xl w-full shadow-2xl"
                  />
                </div>

                {/* Result */}
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    Colorized Result
                  </h3>

                  {resultImage ? (
                    <>
                      <img
                        src={resultImage}
                        className="rounded-2xl w-full shadow-2xl"
                      />

                      <a
                        href={resultImage}
                        download="colorized-image.png"
                        className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500 text-white font-semibold"
                      >
                        <Download size={18} />
                        Download
                      </a>
                    </>
                  ) : (
                    <div
                      className={`rounded-2xl h-[350px] flex items-center justify-center ${
                        darkMode
                          ? "bg-slate-800"
                          : "bg-slate-200"
                      }`}
                    >
                      <p className="text-slate-400">
                        Generated image will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-slate-500">
          Powered by DeOldify & GAN Deep Learning
        </div>
      </div>
    </div>
  );
}