"use client";

import { useEffect, useRef, useState } from "react";

const IWSDK_SRC = "https://iwsdk.dev/sdk/iwsdk.js";

export default function HomeScene() {
  const canvasRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const existingScript = document.querySelector(`script[src="${IWSDK_SRC}"]`);
    const script = existingScript || document.createElement("script");

    if (!existingScript) {
      script.src = IWSDK_SRC;
      script.async = true;
      script.onload = () => {
        script.setAttribute("data-loaded", "true");
        setStatus("ready");
      };
      script.onerror = () => setStatus("error");
      document.body.appendChild(script);
    } else if (existingScript.getAttribute("data-loaded") === "true") {
      setStatus("ready");
    } else {
      existingScript.addEventListener("load", () => setStatus("ready"));
    }

    return () => {
      if (!existingScript && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (status !== "ready") {
      return;
    }

    if (window.IWSDK && typeof window.IWSDK.createScene === "function") {
      window.IWSDK.createScene({
        canvas: canvasRef.current,
        environment: "home",
        lighting: "evening"
      });
    }
  }, [status]);

  const statusCopy =
    status === "ready"
      ? "IWSDK connected"
      : status === "error"
      ? "Unable to load IWSDK"
      : "Connecting to IWSDK";

  return (
    <section className="panel iwsdk-shell">
      <div className="status-pill">{statusCopy}</div>
      <div className="canvas-shell">
        <canvas ref={canvasRef} aria-label="3D home canvas" />
        {status !== "ready" && (
          <p style={{ color: "var(--text-muted)" }}>
            Loading your 3D home experience...
          </p>
        )}
      </div>
      <p style={{ color: "var(--text-muted)" }}>
        This scene is powered by IWSDK. Once the script loads, the home
        environment initializes inside the canvas.
      </p>
    </section>
  );
}
