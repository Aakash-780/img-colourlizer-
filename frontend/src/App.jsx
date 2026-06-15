// App.jsx

import { useState, useRef, useEffect } from "react";
import {
  Upload,
  Wand2,
  Download,
  Sun,
  Moon,
  Loader2,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  RefreshCw,
  Trash2,
  Columns,
  Layers,
  Monitor,
} from "lucide-react";

export default function App() {
  // Theme Mode can be 'light', 'dark', or 'system'
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("theme-mode") || "system";
  });
  const [resolvedDark, setResolvedDark] = useState(false);

  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [viewMode, setViewMode] = useState("slider"); // "slider" or "side-by-side"

  const fileInputRef = useRef();

  // Handle class list updates and theme changes
  useEffect(() => {
    localStorage.setItem("theme-mode", themeMode);

    const checkDark = () => {
      if (themeMode === "dark") {
        return true;
      } else if (themeMode === "light") {
        return false;
      } else {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    };

    const isDark = checkDark();
    setResolvedDark(isDark);

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Listener for system preference changes
    if (themeMode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = (e) => {
        const darkState = e.matches;
        setResolvedDark(darkState);
        if (darkState) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [themeMode]);

  const handleImage = (file) => {
    if (!file) return;

    const imageURL = URL.createObjectURL(file);

    setImage({
      file,
      name: file.name,
      size: file.size,
      preview: imageURL,
    });

    setResultImage(null);
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const uploadImage = async () => {
    if (!image) return;

    setLoading(true);
    setLoadingStep(0);

    const formData = new FormData();
    formData.append("image", image.file);

    try {
      const response = await fetch("http://127.0.0.1:5001/colorize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to colorize image");
      }

      const blob = await response.blob();
      const resultURL = URL.createObjectURL(blob);

      setResultImage(resultURL);
    } catch (error) {
      console.error(error);
      alert("Colorization failed. Please make sure the backend server is running and try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setImage(null);
    setResultImage(null);
  };

  // Cycle through realistic AI colorization steps for visual feedback
  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }
    const t1 = setTimeout(() => setLoadingStep(1), 1500);
    const t2 = setTimeout(() => setLoadingStep(2), 3200);
    const t3 = setTimeout(() => setLoadingStep(3), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [loading]);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${
      resolvedDark ? "bg-slate-950 text-slate-100" : "bg-slate-50/70 text-slate-800"
    }`}>
      {/* Decorative Glow Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                ChromaRestore AI
              </h1>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">DEEP LEARNING COLORIZER</p>
            </div>
          </div>

          {/* Simple Theme Toggle Button (Light -> Dark -> System) */}
          <button
            onClick={() => {
              setThemeMode((prev) => {
                if (prev === "light") return "dark";
                if (prev === "dark") return "system";
                return "light";
              });
            }}
            className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-2 ${
              resolvedDark 
                ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-indigo-400" 
                : "bg-white border-slate-200 hover:bg-slate-50 text-indigo-600 shadow-sm"
            }`}
            title={`Theme: ${themeMode} (Click to toggle)`}
            aria-label="Toggle Theme"
          >
            {themeMode === "light" && <Sun size={18} />}
            {themeMode === "dark" && <Moon size={18} />}
            {themeMode === "system" && <Monitor size={18} />}
            <span className="text-xs font-bold capitalize select-none mr-0.5">{themeMode}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Intro */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-4">
            <Wand2 size={12} /> Powered by DeOldify GAN
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Colorize Your Memories
          </h2>
          <p className="max-w-lg mx-auto text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Upload vintage grayscale photographs and watch them automatically transform into realistically colored images in seconds.
          </p>
        </div>

        {/* Dashboard Card */}
        <div className={`w-full rounded-3xl p-6 md:p-8 backdrop-blur-xl border transition-all duration-300 ${
          resolvedDark 
            ? "bg-slate-900/60 border-slate-800/80 shadow-2xl shadow-slate-950/50" 
            : "bg-white border-slate-200/60 shadow-xl shadow-slate-200/50"
        }`}>
          
          {/* STEP 1: Upload Dropzone */}
          {!image && !loading && (
            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleImage(e.dataTransfer.files[0]);
              }}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                resolvedDark
                  ? "border-slate-800 hover:border-indigo-500/80 bg-slate-950/40 hover:bg-slate-950/80 text-slate-400"
                  : "border-slate-300 hover:border-indigo-500/80 bg-slate-50/50 hover:bg-slate-50 text-slate-600"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110 duration-300">
                <Upload size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                Drag & Drop vintage photo
              </h3>
              <p className="text-sm text-slate-400 dark:text-slate-500 mb-4 max-w-xs mx-auto">
                Or click to browse files. Supports PNG, JPG, and WEBP formats.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-slate-400">
                Max file size: 10MB
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                hidden
                onChange={(e) => handleImage(e.target.files[0])}
              />
            </div>
          )}

          {/* STEP 2: Image Uploaded State (Before Colorizing) */}
          {image && !resultImage && !loading && (
            <div className="animate-fadeIn">
              {/* Success Banner */}
              <div className="flex items-center justify-between gap-3 p-4 mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold">Image Uploaded Successfully</p>
                    <p className="text-xs opacity-80 truncate">{image.name} ({formatBytes(image.size)})</p>
                  </div>
                </div>
                <button 
                  onClick={resetAll} 
                  className={`p-2 rounded-xl transition-colors ${
                    resolvedDark ? "hover:bg-slate-800 text-slate-400 hover:text-slate-200" : "hover:bg-slate-100 text-slate-500"
                  }`}
                  title="Remove image"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Uploaded Preview Display */}
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-3 relative group rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 bg-slate-950">
                  <img
                    src={image.preview}
                    alt="Uploaded source"
                    className="w-full h-auto max-h-[350px] object-contain mx-auto"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 bg-white/90 text-slate-900 rounded-xl font-semibold text-xs shadow-md flex items-center gap-1.5 hover:scale-105 transition-transform"
                    >
                      <RefreshCw size={14} /> Change Photo
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="rounded-2xl p-5 bg-slate-50/50 dark:bg-slate-950/30 border border-slate-200/40 dark:border-slate-800/30">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">IMAGE INFO</h4>
                    <ul className="text-sm space-y-1 text-slate-500 dark:text-slate-400 font-medium">
                      <li><span className="text-slate-400 dark:text-slate-500">Name:</span> <span className="truncate inline-block max-w-[150px] align-bottom">{image.name}</span></li>
                      <li><span className="text-slate-400 dark:text-slate-500">Size:</span> {formatBytes(image.size)}</li>
                      <li><span className="text-slate-400 dark:text-slate-500">Type:</span> {image.file.type || "Image File"}</li>
                    </ul>
                  </div>

                  <button
                    onClick={uploadImage}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Wand2 size={20} /> Colorize Photo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Loading Progress */}
          {loading && (
            <div className="py-8 text-center max-w-sm mx-auto animate-fadeIn">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-indigo-500 rounded-full animate-spin"></div>
                <div className="absolute inset-3 border-4 border-transparent border-b-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                <div className="absolute inset-6 flex items-center justify-center text-indigo-500">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Processing Image</h3>
              
              {/* Stepper Status list */}
              <div className="space-y-3.5 text-left border border-slate-200/50 dark:border-slate-800 p-4.5 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20">
                {[
                  "Uploading image payload...",
                  "Initializing DeOldify model...",
                  "Generating chrominance mapping layers...",
                  "Finalizing colorized output..."
                ].map((stepText, idx) => {
                  const isDone = loadingStep > idx;
                  const isCurrent = loadingStep === idx;
                  return (
                    <div key={idx} className="flex items-center gap-3 transition-opacity duration-300">
                      {isDone ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-5 h-5 flex items-center justify-center shrink-0">
                          <Loader2 size={13} className="text-indigo-500 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-700 shrink-0"></div>
                      )}
                      <span className={`text-xs font-semibold transition-colors ${
                        isDone 
                          ? "text-slate-400 dark:text-slate-500 line-through" 
                          : isCurrent 
                            ? "text-indigo-600 dark:text-indigo-400" 
                            : "text-slate-300 dark:text-slate-600"
                      }`}>
                        {stepText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Colorized Result with Interactive Comparison Slider */}
          {image && resultImage && !loading && (
            <div className="space-y-6 animate-fadeIn">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/40 pb-5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("slider")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      viewMode === "slider"
                        ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                        : resolvedDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Layers size={14} /> Interactive Slider
                  </button>
                  <button
                    onClick={() => setViewMode("side-by-side")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      viewMode === "side-by-side"
                        ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                        : resolvedDark ? "bg-slate-800 text-slate-300 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Columns size={14} /> Side by Side
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetAll}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      resolvedDark 
                        ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300" 
                        : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-sm"
                    }`}
                  >
                    <RefreshCw size={14} /> Start Over
                  </button>
                  
                  <a
                    href={resultImage}
                    download={`colorized-${image.name}`}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
                  >
                    <Download size={14} /> Download Image
                  </a>
                </div>
              </div>

              {/* View Render */}
              {viewMode === "slider" ? (
                /* INTERACTIVE SLIDER MODE */
                <div className="space-y-2">
                  <div className="relative w-full aspect-[4/3] max-h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-200/50 dark:border-slate-800/80 group">
                    {/* Grayscale Background */}
                    <img
                      src={image.preview}
                      alt="Original Grayscale"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
                    />

                    {/* Colorized Overlay (Clipped) */}
                    <div 
                      className="absolute inset-0 pointer-events-none select-none"
                      style={{ 
                        clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` 
                      }}
                    >
                      <img
                        src={resultImage}
                        alt="Colorized Result"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>

                    {/* Divider Handle Line */}
                    <div
                      className="absolute top-0 bottom-0 w-[3px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] z-10 pointer-events-none"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-indigo-600 shadow-2xl flex items-center justify-center border-2 border-indigo-500/30">
                        <div className="flex gap-[3px] items-center text-xs font-black">
                          <span>◀</span>
                          <span>▶</span>
                        </div>
                      </div>
                    </div>

                    {/* Invisible Interactive Range Input */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPosition}
                      onChange={(e) => setSliderPosition(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                    />

                    {/* Quick Labels */}
                    <div className="absolute bottom-4 left-4 z-10 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider pointer-events-none border border-white/10">
                      Original
                    </div>
                    <div className="absolute bottom-4 right-4 z-10 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider pointer-events-none border border-white/10">
                      Colorized
                    </div>
                  </div>
                  <p className="text-center text-xs text-slate-400 font-medium">
                    Drag the divider bar to compare original and colorized states
                  </p>
                </div>
              ) : (
                /* SIDE BY SIDE MODE */
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 bg-slate-950 aspect-[4/3] flex items-center justify-center">
                      <img
                        src={image.preview}
                        alt="Grayscale original"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-center text-xs font-semibold text-slate-400">ORIGINAL</p>
                  </div>

                  <div className="space-y-2">
                    <div className="rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 bg-slate-950 aspect-[4/3] flex items-center justify-center">
                      <img
                        src={resultImage}
                        alt="Colorized result"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-center text-xs font-semibold text-slate-400">COLORIZED</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Professional Footer */}
      <footer className={`border-t transition-colors duration-300 mt-24 ${
        resolvedDark 
          ? "bg-slate-950/60 border-slate-900 text-slate-400" 
          : "bg-slate-50/80 border-slate-200/80 text-slate-600"
      }`}>
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/10">
                  <Sparkles size={16} />
                </div>
                <span className="font-bold text-slate-900 dark:text-white bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  ChromaRestore
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-500 font-medium">
                Bringing historical black & white photographs back to life using state-of-the-art Generative Adversarial Networks (GANs).
              </p>
            </div>

            {/* Product Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">FEATURES</h4>
              <ul className="text-[11px] space-y-2 font-medium">
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Image Colorizer</a></li>
                <li><span className="text-slate-400 dark:text-slate-650">Video Restore <span className="text-[8px] bg-indigo-500/10 text-indigo-500 px-1.5 py-0.5 rounded-full font-bold ml-1">SOON</span></span></li>
                <li><span className="text-slate-400 dark:text-slate-650">Batch Process <span className="text-[8px] bg-indigo-500/10 text-indigo-500 px-1.5 py-0.5 rounded-full font-bold ml-1">SOON</span></span></li>
              </ul>
            </div>

            {/* Technology Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">POWERED BY</h4>
              <ul className="text-[11px] space-y-2 font-medium">
                <li><a href="https://github.com/jantic/DeOldify" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">DeOldify Library</a></li>
                <li><a href="https://pytorch.org" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">PyTorch Framework</a></li>
                <li><a href="https://fast.ai" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">Fast.AI Library</a></li>
                <li><a href="https://flask.palletsprojects.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">Flask Backend</a></li>
              </ul>
            </div>

            {/* Open Source Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">RESOURCES</h4>
              <ul className="text-[11px] space-y-2 font-medium">
                <li><a href="https://github.com/jantic/DeOldify/blob/master/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">MIT License</a></li>
                <li><a href="https://github.com/jantic/DeOldify" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">DeOldify GitHub</a></li>
                <li><a href="#" className="hover:text-indigo-500 transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200/50 dark:border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400 dark:text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} ChromaRestore AI. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-indigo-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-500 transition-colors">Terms of Service</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}