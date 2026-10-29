import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GiftBox3DProps {
  isOpening: boolean;
  onClick: () => void;
}

export const GiftBox3D: React.FC<GiftBox3DProps> = ({ isOpening, onClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const isOpeningRef = useRef(isOpening);
  isOpeningRef.current = isOpening;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLFailed(true);
        return;
      }
    } catch {
      setWebGLFailed(true);
      return;
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 5.8);
    camera.lookAt(0, 0.2, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed', e);
      setWebGLFailed(true);
      return;
    }

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials (Matching palette)
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0xFAF7F2, // Warm ivory
      roughness: 0.35,
      metalness: 0.08,
    });

    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xC88F91, // Dusty rose
      roughness: 0.3,
      metalness: 0.15,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xC6A56B, // Antique gold
      roughness: 0.25,
      metalness: 0.7,
    });

    // Box Body
    const boxGeo = new THREE.BoxGeometry(2.2, 1.8, 2.2);
    const boxMesh = new THREE.Mesh(boxGeo, boxMaterial);
    boxMesh.position.y = 0.9;
    boxMesh.castShadow = true;
    boxMesh.receiveShadow = true;
    rootGroup.add(boxMesh);

    // Ribbons on Box
    const ribbonXGeo = new THREE.BoxGeometry(2.22, 1.82, 0.35);
    const ribbonX = new THREE.Mesh(ribbonXGeo, ribbonMaterial);
    ribbonX.position.y = 0.9;
    rootGroup.add(ribbonX);

    const ribbonZGeo = new THREE.BoxGeometry(0.35, 1.82, 2.22);
    const ribbonZ = new THREE.Mesh(ribbonZGeo, ribbonMaterial);
    ribbonZ.position.y = 0.9;
    rootGroup.add(ribbonZ);

    // Lid Group (Animates open)
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 1.8, 0);

    const lidGeo = new THREE.BoxGeometry(2.32, 0.35, 2.32);
    const lidMesh = new THREE.Mesh(lidGeo, boxMaterial);
    lidMesh.position.y = 0.175;
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Lid Ribbons
    const lidRibbonX = new THREE.Mesh(new THREE.BoxGeometry(2.34, 0.37, 0.35), ribbonMaterial);
    lidRibbonX.position.y = 0.175;
    lidGroup.add(lidRibbonX);

    const lidRibbonZ = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.37, 2.34), ribbonMaterial);
    lidRibbonZ.position.y = 0.175;
    lidGroup.add(lidRibbonZ);

    // Wax Seal Medallion on Lid
    const sealGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.08, 32);
    const sealMesh = new THREE.Mesh(sealGeo, goldMaterial);
    sealMesh.position.y = 0.38;
    lidGroup.add(sealMesh);

    // Bow Loops on top
    const bowGeo = new THREE.TorusGeometry(0.24, 0.07, 16, 32);
    const bowLeft = new THREE.Mesh(bowGeo, ribbonMaterial);
    bowLeft.rotation.z = Math.PI / 4;
    bowLeft.position.set(-0.2, 0.55, 0);
    lidGroup.add(bowLeft);

    const bowRight = new THREE.Mesh(bowGeo, ribbonMaterial);
    bowRight.rotation.z = -Math.PI / 4;
    bowRight.position.set(0.2, 0.55, 0);
    lidGroup.add(bowRight);

    rootGroup.add(lidGroup);

    // Soft Shadow Disc
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(41, 38, 43, 0.35)');
      gradient.addColorStop(0.5, 'rgba(41, 38, 43, 0.12)');
      gradient.addColorStop(1, 'rgba(41, 38, 43, 0)');
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xE8D8C5, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFF9EE, 1.4);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xC88F91, 0.8);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Internal Light (Glows when box opens)
    const innerLight = new THREE.PointLight(0xFFE2A0, 0, 6);
    innerLight.position.set(0, 1.2, 0);
    scene.add(innerLight);

    // Mouse Parallax Interaction
    let targetRotY = 0;
    let targetRotX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let lidProgress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle float & subtle rotation
      rootGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      rootGroup.rotation.y += (targetRotY + 0.35 - rootGroup.rotation.y) * 0.05;
      rootGroup.rotation.x += (targetRotX + 0.15 - rootGroup.rotation.x) * 0.05;

      // Opening Animation
      if (isOpeningRef.current) {
        if (lidProgress < 1) {
          lidProgress += 0.04;
          // Ease lid up and tilt back
          lidGroup.position.y = 1.8 + Math.sin(lidProgress * Math.PI * 0.5) * 1.4;
          lidGroup.position.z = -Math.sin(lidProgress * Math.PI * 0.5) * 0.8;
          lidGroup.rotation.x = -lidProgress * 1.2;
          innerLight.intensity = lidProgress * 4.5;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      boxGeo.dispose();
      ribbonXGeo.dispose();
      ribbonZGeo.dispose();
      lidGeo.dispose();
      sealGeo.dispose();
      bowGeo.dispose();
      shadowGeo.dispose();
      boxMaterial.dispose();
      ribbonMaterial.dispose();
      goldMaterial.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
    };
  }, []);

  if (webGLFailed) {
    // Elegant dimensional fallback
    return (
      <div
        onClick={onClick}
        className="w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-b from-[#FAF7F2] to-[#ECE3D5] rounded-3xl border-2 border-champagne shadow-2xl p-6 flex flex-col items-center justify-center relative cursor-pointer group hover:scale-105 transition-all"
      >
        <div className="absolute inset-x-0 h-8 bg-dustyRose/70" />
        <div className="absolute inset-y-0 w-8 bg-dustyRose/70" />
        <div className="relative z-20 w-16 h-16 rounded-full bg-antiqueGold flex items-center justify-center font-serif text-2xl font-bold text-deepPlum shadow-lg">
          M
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      onClick={onClick}
      className="w-72 h-72 sm:w-80 sm:h-80 cursor-pointer select-none transition-transform duration-500 hover:scale-105 active:scale-98"
      title="Click to open your surprise"
    />
  );
};
