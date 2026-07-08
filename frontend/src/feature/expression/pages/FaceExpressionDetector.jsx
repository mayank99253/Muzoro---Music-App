import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";

export default function FaceExpressionDetector() {
  const webcamRef = useRef(null);
  const requestRef = useRef(null);
  const [landmarker, setLandmarker] = useState(null);
  const [expression, setExpression] = useState("Neutral 😐");

  // Initialize MediaPipe Face Landmarker
  useEffect(() => {
    async function initMediaPipe() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://jsdelivr.net"
      );
      const lmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://googleapis.com",
          delegate: "GPU"
        },
        outputFaceBlendshapes: true, // Crucial for expression tracking
        runningMode: "VIDEO"
      });
      setLandmarker(lmarker);
    }
    initMediaPipe();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Frame processing loop
  useEffect(() => {
    if (!landmarker) return;

    const detectFrame = () => {
      if (webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const timestamp = performance.now();
        const result = landmarker.detectForVideo(video, timestamp);

        if (result && result.faceBlendshapes && result.faceBlendshapes.length > 0) {
          interpretExpressions(result.faceBlendshapes[0].categories);
        }
      }
      requestRef.current = requestAnimationFrame(detectFrame);
    };

    requestRef.current = requestAnimationFrame(detectFrame);
  }, [landmarker]);

  // Map blendshapes to recognizable emotions
  const interpretExpressions = (blendshapes) => {
    // Convert array format to a quick key-value lookup map
    const shapes = {};
    blendshapes.forEach((item) => {
      shapes[item.categoryName] = item.score;
    });

    // Simple threshold rules to extract expressions
    if (shapes["jawOpen"] > 0.4 && shapes["mouthSmileLeft"] < 0.2) {
      setExpression("Surprised 😮");
    } else if (shapes["mouthSmileLeft"] > 0.45 && shapes["mouthSmileRight"] > 0.45) {
      setExpression("Happy 😊");
    } else if (shapes["browDownLeft"] > 0.4 && shapes["browDownRight"] > 0.4) {
      setExpression("Angry/Focused 😠");
    } else if (shapes["mouthFrownLeft"] > 0.3 || shapes["mouthFrownRight"] > 0.3) {
      setExpression("Sad 😢");
    } else {
      setExpression("Neutral 😐");
    }
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
    </div>
  );
}
