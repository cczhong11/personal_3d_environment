"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HomeScene() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio || 1);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0f172a");

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(3.2, 2.2, 4.8);
    camera.lookAt(0, 0.6, 0);

    const ambient = new THREE.AmbientLight("#f3f4f6", 0.8);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight("#93c5fd", 1.1);
    keyLight.position.set(4, 6, 3);
    scene.add(keyLight);

    const floorGeometry = new THREE.CircleGeometry(3.4, 48);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: "#1f2937",
      metalness: 0.1,
      roughness: 0.8
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const roomGeometry = new THREE.BoxGeometry(3.2, 1.8, 2.2);
    const roomMaterial = new THREE.MeshStandardMaterial({
      color: "#475569",
      metalness: 0.2,
      roughness: 0.6
    });
    const room = new THREE.Mesh(roomGeometry, roomMaterial);
    room.position.set(0, 0.9, 0);
    scene.add(room);

    const windowGeometry = new THREE.PlaneGeometry(1.4, 0.7);
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: "#38bdf8",
      emissive: "#38bdf8",
      emissiveIntensity: 0.6,
      metalness: 0.1,
      roughness: 0.2
    });
    const windowPane = new THREE.Mesh(windowGeometry, windowMaterial);
    windowPane.position.set(0, 1.1, 1.11);
    scene.add(windowPane);

    const orbGeometry = new THREE.SphereGeometry(0.22, 32, 32);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: "#f9a8d4",
      emissive: "#f9a8d4",
      emissiveIntensity: 0.35
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(-0.8, 0.5, 0.6);
    scene.add(orb);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) {
        return;
      }
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    setStatus("ready");

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      orb.rotation.y += 0.01;
      room.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };

    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      floorGeometry.dispose();
      floorMaterial.dispose();
      roomGeometry.dispose();
      roomMaterial.dispose();
      windowGeometry.dispose();
      windowMaterial.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  const statusCopy =
    status === "ready" ? "Three.js scene ready" : "Preparing 3D scene";

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
        This scene is powered by Three.js. The lighting and layout are mocked
        to preview your home environment.
      </p>
    </section>
  );
}
