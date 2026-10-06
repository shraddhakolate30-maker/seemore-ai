import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Layers,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Eye,
  Check,
  Focus,
} from 'lucide-react';
import {
  Difficulty,
  ConcreteDifficulty,
  PublicChallenge,
  AnswerEvaluationResult,
  SystemStatus,
} from '../types.js';
import { SAMPLE_PHOTOS, svgToJpegBase64 } from '../data/sampleImages.js';

interface ObservationViewProps {
  onNavigateToProgress: () => void;
  systemStatus: SystemStatus | null;
}

export const ObservationView: React.FC<ObservationViewProps> = ({
  onNavigateToProgress,
  systemStatus,
}) => {
  // Image state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMimeType, setSelectedMimeType] = useState<string>('image/jpeg');
  const [imageTitle, setImageTitle] = useState<string>('Uploaded Photo');

  // Challenge state
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [challenge, setChallenge] = useState<PublicChallenge | null>(null);
  const [challengeError, setChallengeError] = useState<string | null>(null);

  // User Answer state
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<AnswerEvaluationResult | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Image zoom/inspection state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step indicator sequence for loading state
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating) {
      setLoadingStep(1); // "Looking closely at your image..."
      timer = setTimeout(() => {
        setLoadingStep(2); // "Finding an observation challenge..."
        setTimeout(() => {
          setLoadingStep(3); // "Preparing your clue..."
        }, 2200);
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearTimeout(timer);
  }, [isGenerating]);

  // Handle local file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setChallengeError('Please select a JPG, PNG, or WEBP image.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setChallengeError('Image size exceeds 15MB limit. Please choose a smaller photo.');
      return;
    }

    setChallengeError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setSelectedImage(event.target.result);
        setSelectedMimeType(file.type);
        setImageTitle(file.name);
        setChallenge(null);
        setEvaluation(null);
        setUserAnswer('');
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setChallengeError('Please upload a JPG, PNG, or WEBP image.');
      return;
    }

    setChallengeError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setSelectedImage(event.target.result);
        setSelectedMimeType(file.type);
        setImageTitle(file.name);
        setChallenge(null);
        setEvaluation(null);
        setUserAnswer('');
        setZoomLevel(1);
        setPanOffset({ x: 0, y: 0 });
      }
    };
    reader.readAsDataURL(file);
  };

  // Select a preset sample photo
  const handleSelectSample = async (sample: typeof SAMPLE_PHOTOS[0]) => {
    try {
      setChallengeError(null);
      const dataUrl = await svgToJpegBase64(sample.svgContent);
      setSelectedImage(dataUrl);
      setSelectedMimeType('image/jpeg');
      setImageTitle(sample.title);
      setChallenge(null);
      setEvaluation(null);
      setUserAnswer('');
      setZoomLevel(1);
      setPanOffset({ x: 0, y: 0 });
    } catch (err: any) {
      setChallengeError('Failed to load sample image: ' + err.message);
    }
  };

  // Generate Challenge API Call
  const handleGenerateChallenge = async () => {
    if (!selectedImage) return;

    setIsGenerating(true);
    setChallengeError(null);
    setEvaluation(null);
    setUserAnswer('');

    try {
      const response = await fetch('/api/challenges/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          mimeType: selectedMimeType,
          difficulty,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong while creating your challenge.');
      }

      setChallenge(data);
    } catch (err: any) {
      setChallengeError(err.message || 'Something went wrong while creating your challenge. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Submit User Answer API Call
  const handleSubmitAnswer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!challenge || !userAnswer.trim() || isEvaluating) return;

    setIsEvaluating(true);
    setEvalError(null);

    try {
      const response = await fetch(`/api/challenges/${challenge.id}/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: userAnswer.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to evaluate your answer at this moment.');
      }

      setEvaluation(data);
    } catch (err: any) {
      setEvalError(err.message || 'Unable to evaluate your answer. Please try again.');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Zoom and Pan controls for inspecting photo
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5EE7F2]">
            <Eye className="h-4 w-4" />
            Active Observation Studio
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F7FA]">
            Look Closer. Spot the Detail.
          </h1>
          <p className="mt-1 text-sm text-[#A8B0C0]">
            The AI generates an indirect clue from your photo. Inspect the image carefully before answering.
          </p>
        </div>

        {selectedImage && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedImage(null);
                setChallenge(null);
                setEvaluation(null);
                setUserAnswer('');
              }}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#A8B0C0] hover:text-[#F5F7FA] hover:bg-white/[0.08] transition"
            >
              Change Photo
            </button>
          </div>
        )}
      </div>

      {/* STAGE 1: NO IMAGE SELECTED YET */}
      {!selectedImage && (
        <div className="space-y-10">
          {/* Upload Drag & Drop Area */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="relative rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.02] p-8 sm:p-14 text-center transition hover:border-[#5EE7F2]/40 hover:bg-white/[0.04]"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#5EE7F2]/10 text-[#5EE7F2] mb-5">
              <Upload className="h-8 w-8" />
            </div>

            <h2 className="text-xl font-bold text-[#F5F7FA]">
              Upload a photo of your surroundings
            </h2>
            <p className="mt-2 text-sm text-[#A8B0C0] max-w-md mx-auto">
              Take a photo of your room, a street scene, your desk, or architecture. Real-world complexity makes for rich observation challenges.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] px-6 py-3 text-sm font-semibold text-[#080B12] shadow-sm transition hover:opacity-95"
              >
                Browse Files
              </button>
            </div>

            <div className="mt-4 text-xs text-[#A8B0C0] flex items-center justify-center gap-3">
              <span>JPG, PNG, or WEBP</span>
              <span aria-hidden="true">·</span>
              <span>Max 15MB</span>
              <span aria-hidden="true">·</span>
              <span>Processed ephemerally</span>
            </div>

            {challengeError && (
              <div className="mt-6 mx-auto max-w-md rounded-lg bg-red-950/40 border border-red-500/30 p-3 text-xs text-red-300">
                {challengeError}
              </div>
            )}
          </div>

          {/* Quick Start Presets (For instant zero-setup demonstration) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-[#F5F7FA]">
                  Or try a sample observation scene
                </h3>
                <p className="text-xs text-[#A8B0C0]">
                  Immediate 1-click test scenes featuring varied objects, patterns, and infrastructure.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SAMPLE_PHOTOS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] text-left transition hover:border-[#5EE7F2]/40 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#5EE7F2]"
                >
                  <div
                    className="h-36 w-full bg-[#080B12] overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: sample.svgContent }}
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-sm font-semibold text-[#F5F7FA] group-hover:text-[#5EE7F2] transition-colors">
                      {sample.title}
                    </span>
                    <span className="mt-1 text-xs text-[#A8B0C0] line-clamp-2">
                      {sample.description}
                    </span>
                    <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#5EE7F2]">
                      <span>Load scene</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2 & 3: PHOTO LOADED */}
      {selectedImage && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: LARGE IMAGE VIEWER (Col 1-7 on desktop) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-2xl border border-white/10 bg-black/40 overflow-hidden shadow-2xl">
              {/* Image Inspection Toolbar */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#080B12]/80 backdrop-blur-md px-2 py-1 text-xs text-[#A8B0C0]">
                <button
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-1 hover:text-[#5EE7F2] transition"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-1 hover:text-[#5EE7F2] transition"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  title="Reset View"
                  className="p-1 hover:text-[#5EE7F2] transition"
                  aria-label="Reset View"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <span className="ml-1 text-[11px] font-mono text-white/60">
                  {Math.round(zoomLevel * 100)}%
                </span>
              </div>

              {/* Title overlay */}
              <div className="absolute top-3 left-3 z-20 rounded-md bg-[#080B12]/70 backdrop-blur-md px-2.5 py-1 text-xs text-[#F5F7FA] border border-white/10">
                {imageTitle}
              </div>

              {/* Viewport & Image Canvas */}
              <div
                className={`w-full h-[360px] sm:h-[460px] md:h-[520px] overflow-hidden flex items-center justify-center select-none ${
                  zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : ''
                }`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={selectedImage}
                  alt="Observation scene"
                  draggable={false}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                    transition: isDragging ? 'none' : 'transform 0.15s ease-out',
                  }}
                  className="max-h-full max-w-full object-contain pointer-events-none"
                />
              </div>

              {/* Bottom viewer footer */}
              <div className="border-t border-white/10 bg-[#080B12]/60 px-4 py-2.5 flex items-center justify-between text-xs text-[#A8B0C0]">
                <span>
                  {zoomLevel > 1 ? 'Drag to pan around zoomed photo' : 'Use zoom controls to inspect fine details'}
                </span>
                <span className="font-mono text-[11px]">
                  Inspect Mode
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CHALLENGE CARD & ANSWER FLOW (Col 8-12 on desktop) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* If challenge is not generated yet */}
            {!challenge && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 shadow-xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5EE7F2] mb-3">
                  <Sparkles className="h-4 w-4" />
                  Step 1: Configure Observation
                </div>
                <h2 className="text-xl font-bold text-[#F5F7FA]">
                  Ready to observe?
                </h2>
                <p className="mt-2 text-sm text-[#A8B0C0] leading-relaxed">
                  Select your desired observation depth. The AI engine will analyze this photo and formulate an indirect clue.
                </p>

                {/* Difficulty Selector Tabs */}
                <div className="mt-6">
                  <label className="block text-xs font-semibold text-[#F5F7FA] mb-2">
                    Observation Depth
                  </label>
                  <div className="grid grid-cols-4 gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/10">
                    {(['easy', 'medium', 'hard', 'mixed'] as Difficulty[]).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDifficulty(d)}
                        className={`py-2 px-2 text-xs font-medium rounded-lg capitalize transition ${
                          difficulty === d
                            ? 'bg-[#5EE7F2] text-[#080B12] font-semibold shadow-sm'
                            : 'text-[#A8B0C0] hover:text-[#F5F7FA]'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* Difficulty Description */}
                  <div className="mt-3 text-xs text-[#A8B0C0] min-h-[36px]">
                    {difficulty === 'easy' && (
                      <span><strong>Easy:</strong> Prominent visible objects, straightforward functional clues.</span>
                    )}
                    {difficulty === 'medium' && (
                      <span><strong>Medium:</strong> Repeated patterns, structural relationships, smaller details.</span>
                    )}
                    {difficulty === 'hard' && (
                      <span><strong>Hard:</strong> Subtle visual cues, contextual reasoning, indirect inferences.</span>
                    )}
                    {difficulty === 'mixed' && (
                      <span><strong>Mixed:</strong> Dynamically adapts between levels for an unexpected challenge.</span>
                    )}
                  </div>
                </div>

                {/* Generate Button / Loading */}
                <div className="mt-6">
                  <button
                    onClick={handleGenerateChallenge}
                    disabled={isGenerating}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] py-3.5 px-6 text-sm font-semibold text-[#080B12] shadow-md transition hover:opacity-95 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Analyzing with Gemma...
                      </>
                    ) : (
                      <>
                        <Focus className="h-4 w-4" />
                        Generate Challenge
                      </>
                    )}
                  </button>
                </div>

                {/* Animated loading step indicator without fake percentages */}
                {isGenerating && (
                  <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#5EE7F2]/10 text-[#5EE7F2] mb-3 animate-pulse">
                      <Eye className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-[#F5F7FA] transition-all duration-300">
                      {loadingStep === 1 && 'Looking closely at your image...'}
                      {loadingStep === 2 && 'Finding an observation challenge...'}
                      {loadingStep === 3 && 'Preparing your clue...'}
                    </p>
                    <p className="mt-1 text-xs text-[#A8B0C0]">
                      Gemma open model analyzing scene geometry & context
                    </p>
                  </div>
                )}

                {challengeError && (
                  <div className="mt-4 rounded-lg bg-red-950/40 border border-red-500/30 p-3 text-xs text-red-300 flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span>{challengeError}</span>
                      <button
                        onClick={handleGenerateChallenge}
                        className="block mt-1 font-semibold underline text-red-200"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* If challenge is generated: show clue and answer form */}
            {challenge && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7 shadow-xl">
                {/* Challenge Card Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-mono font-semibold text-[#5EE7F2]">
                      Observation Challenge
                    </span>
                  </div>
                  <div className="text-xs text-[#A8B0C0] capitalize">
                    Difficulty: <span className="font-semibold text-[#F5F7FA]">{challenge.difficulty}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span className="capitalize">{challenge.reasoning_category}</span>
                  </div>
                </div>

                {/* THE CLUE: Large, readable typography */}
                <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <span className="text-xs uppercase tracking-widest text-[#A8B0C0] font-semibold block mb-2">
                    Your Indirect Clue
                  </span>
                  <p className="text-lg sm:text-xl font-medium text-[#F5F7FA] leading-relaxed">
                    "{challenge.clue}"
                  </p>
                </div>

                {/* STAGE A: Before answer submission */}
                {!evaluation && (
                  <form onSubmit={handleSubmitAnswer} className="space-y-4">
                    <div>
                      <label
                        htmlFor="user-answer-input"
                        className="block text-sm font-semibold text-[#F5F7FA] mb-2"
                      >
                        What do you notice?
                      </label>
                      <input
                        id="user-answer-input"
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Type what you think you found..."
                        disabled={isEvaluating}
                        autoFocus
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-[#F5F7FA] placeholder-[#A8B0C0]/60 focus:border-[#5EE7F2] focus:outline-none focus:ring-1 focus:ring-[#5EE7F2]"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!userAnswer.trim() || isEvaluating}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] py-3.5 px-6 text-sm font-semibold text-[#080B12] shadow-md transition hover:opacity-95 disabled:opacity-50"
                      >
                        {isEvaluating ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Evaluating observation...
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4" />
                            Submit Answer
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-center text-[11px] text-[#A8B0C0] pt-1">
                      Target identity remains concealed until you submit your answer.
                    </p>

                    {evalError && (
                      <div className="rounded-lg bg-red-950/40 border border-red-500/30 p-3 text-xs text-red-300">
                        {evalError}
                      </div>
                    )}
                  </form>
                )}

                {/* STAGE B: After answer submission — Evaluation & Score Reveal */}
                {evaluation && (
                  <div className="space-y-6 pt-2">
                    {/* Status Header Banner */}
                    <div
                      className={`rounded-xl p-4 border flex items-start gap-3 ${
                        evaluation.status === 'correct'
                          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                          : evaluation.status === 'almost'
                          ? 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                          : 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {evaluation.status === 'correct' ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : evaluation.status === 'almost' ? (
                          <AlertCircle className="h-5 w-5 text-amber-400" />
                        ) : (
                          <HelpCircle className="h-5 w-5 text-indigo-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-base font-bold">
                          {evaluation.feedbackTitle}
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-[#F5F7FA]/90">
                          {evaluation.feedbackMessage}
                        </p>
                      </div>
                    </div>

                    {/* SeeMore Observation Score Card */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#A8B0C0] font-semibold">
                            SeeMore Observation Score
                          </span>
                          <span className="block text-[11px] text-[#A8B0C0]/70">
                            In-app observation indicator
                          </span>
                        </div>
                        <div className="text-2xl font-bold font-mono text-[#5EE7F2]">
                          {evaluation.score}
                          <span className="text-sm font-normal text-[#A8B0C0]">/100</span>
                        </div>
                      </div>

                      {/* Score Breakdown */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                        <div className="rounded-lg bg-white/[0.02] p-2.5">
                          <span className="text-[#A8B0C0] block text-[11px]">Target Match</span>
                          <span className="font-mono font-semibold text-[#F5F7FA]">
                            {evaluation.scoreBreakdown.correctness} / 50
                          </span>
                        </div>
                        <div className="rounded-lg bg-white/[0.02] p-2.5">
                          <span className="text-[#A8B0C0] block text-[11px]">Detail Awareness</span>
                          <span className="font-mono font-semibold text-[#F5F7FA]">
                            {evaluation.scoreBreakdown.detailDetection} / 20
                          </span>
                        </div>
                        <div className="rounded-lg bg-white/[0.02] p-2.5">
                          <span className="text-[#A8B0C0] block text-[11px]">Reasoning</span>
                          <span className="font-mono font-semibold text-[#F5F7FA]">
                            {evaluation.scoreBreakdown.reasoning} / 20
                          </span>
                        </div>
                        <div className="rounded-lg bg-white/[0.02] p-2.5">
                          <span className="text-[#A8B0C0] block text-[11px]">Challenge Difficulty</span>
                          <span className="font-mono font-semibold text-[#F5F7FA]">
                            {evaluation.scoreBreakdown.difficultyBonus} / 10
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Revealed Target & Detailed Explanation */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-xs text-[#A8B0C0]">
                      <div className="mb-2">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#5EE7F2] block">
                          Intended Target
                        </span>
                        <span className="text-base font-bold text-[#F5F7FA]">
                          {evaluation.revealedTarget}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#F5F7FA]/80">
                        {evaluation.explanation}
                      </p>
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                        <span>Your answer: <strong className="text-[#F5F7FA] font-medium">"{userAnswer}"</strong></span>
                        <span className="font-mono text-[#5EE7F2]">Rank: {evaluation.userLevel}</span>
                      </div>
                    </div>

                    {/* Actions: Next Challenge or Dashboard */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={handleGenerateChallenge}
                        className="flex-1 rounded-xl bg-gradient-to-r from-[#5EE7F2] to-[#8B7CFF] py-3 px-4 text-xs font-semibold text-[#080B12] text-center transition hover:opacity-95"
                      >
                        Another Clue (Same Photo)
                      </button>
                      <button
                        onClick={() => {
                          setSelectedImage(null);
                          setChallenge(null);
                          setEvaluation(null);
                          setUserAnswer('');
                        }}
                        className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] py-3 px-4 text-xs font-medium text-[#F5F7FA] hover:bg-white/[0.08] text-center transition"
                      >
                        New Photo
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={onNavigateToProgress}
                        className="w-full text-center text-xs font-semibold text-[#5EE7F2] hover:underline"
                      >
                        View Full Observation Progress →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
