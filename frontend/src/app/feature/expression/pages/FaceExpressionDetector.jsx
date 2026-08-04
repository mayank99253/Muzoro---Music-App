import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import { useExpression } from "../hook/useExpression.js";
import toast from "react-hot-toast";

export default function FaceExpressionDetector() {
  const { handleMoodPlaylist } = useExpression()

  const webcamRef = useRef(null);
  const requestRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [landmarker, setLandmarker] = useState(null);
  const [expression, setExpression] = useState("Neutral 😐");

  // Initialize MediaPipe Face Landmarker
  useEffect(() => {
    async function initMediaPipe() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        const lmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
            delegate: "CPU"
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO"
        });
        setLandmarker(lmarker);
      } catch (err) {
        console.error("MediaPipe init failed:", err); // ab error dikhega, silent fail nahi hoga
      }
    }
    initMediaPipe();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // // Frame processing loop
  // useEffect(() => {
  //   if (!landmarker) return;

  //   const detectFrame = () => {
  //     if (webcamRef.current && webcamRef.current.video.readyState === 4) {
  //       const video = webcamRef.current.video;
  //       const timestamp = performance.now();
  //       const result = landmarker.detectForVideo(video, timestamp);

  //       if (result && result.faceBlendshapes && result.faceBlendshapes.length > 0) {
  //         interpretExpressions(result.faceBlendshapes[0].categories);
  //       }
  //     }
  //     requestRef.current = requestAnimationFrame(detectFrame);
  //   };

  //   requestRef.current = requestAnimationFrame(detectFrame);
  // }, [landmarker]);


  const detectOnce = () => {
    if (!landmarker || !webcamRef.current || webcamRef.current.video.readyState !== 4) {
      toast.error("Camera/model not ready yet");
      return;
    }
    setIsDetecting(true);

    setTimeout(() => {
      const video = webcamRef.current.video;
      const result = landmarker.detectForVideo(video, performance.now());

      if (result?.faceBlendshapes?.length > 0) {
        interpretExpressions(result.faceBlendshapes[0].categories);
      } else {
        toast.error("No face detected");
      }

      setIsDetecting(false);
    }, 100);
  };

  // Map blendshapes to recognizable emotions
  const interpretExpressions = async (blendshapes) => {
  const shapes = {};
  blendshapes.forEach((item) => {
    shapes[item.categoryName] = item.score;
  });

  let detected = "Neutral";

  if (shapes["jawOpen"] > 0.4 && shapes["mouthSmileLeft"] < 0.2) {
    detected = "Surprised";
  } else if (shapes["mouthSmileLeft"] > 0.4 && shapes["mouthSmileRight"] > 0.4) {
    detected = "Happy";
  } else if (shapes["browDownLeft"] > 0.4 && shapes["browDownRight"] > 0.4) {
    detected = "Focused";
  } else if (shapes["eyeLookDownLeft"] > 0.1 || shapes["eyeLookDownRight"] > 0.1) {
    detected = "Sad";
  }

  setExpression(detected);
  await handleMoodPlaylist(detected); 
};

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h2>Current Expression: {expression}</h2>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
        style={{ borderRadius: "10px", width: "100%", maxWidth: "640px" }}
      />
      <button
        onClick={detectOnce}
        disabled={isDetecting}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold disabled:opacity-50 active:scale-[0.9]"
      >
        {isDetecting ? "Detecting..." : "Detect Expression"}
      </button>
    </div>

  );
}
