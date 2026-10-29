import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Cake3DProps {
  isBlown: boolean;
  onBlowOut: () => void;
}

export const Cake3D: React.FC<Cake3DProps> = ({ isBlown, onBlowOut }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const isBlownRef = useRef(isBlown);
  isBlownRef.current = isBlown;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

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

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 7.2);
    camera.lookAt(0, 1.2, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL cake init failed', e);
      setWebGLFailed(true);
      return;
    }

    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    // Materials
    const ivoryMat = new THREE.MeshStandardMaterial({
      color: 0xFAF7F2,
      roughness: 0.35,
      metalness: 0.05,
    });

    const blushMat = new THREE.MeshStandardMaterial({
      color: 0xC88F91,
      roughness: 0.4,
      metalness: 0.1,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xC6A56B,
      roughness: 0.25,
      metalness: 0.75,
    });

    const standMat = new THREE.MeshStandardMaterial({
      color: 0xECE5D8,
      roughness: 0.25,
      metalness: 0.2,
    });

    const candleMat = new THREE.MeshStandardMaterial({
      color: 0xFDFBF7,
      roughness: 0.3,
      metalness: 0.1,
    });

    const wickMat = new THREE.MeshBasicMaterial({ color: 0x2A272D });

    const flameOuterMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.85,
    });

    const flameInnerMat = new THREE.MeshBasicMaterial({
      color: 0xFFFBEB,
    });

    // 1. Pedestal Stand
    const standBaseGeo = new THREE.CylinderGeometry(1.6, 2.0, 0.2, 48);
    const standBase = new THREE.Mesh(standBaseGeo, standMat);
    standBase.position.y = 0.1;
    standBase.receiveShadow = true;
    cakeGroup.add(standBase);

    const standPillarGeo = new THREE.CylinderGeometry(0.7, 1.0, 0.5, 32);
    const standPillar = new THREE.Mesh(standPillarGeo, standMat);
    standPillar.position.y = 0.45;
    cakeGroup.add(standPillar);

    const standPlateGeo = new THREE.CylinderGeometry(2.6, 2.6, 0.15, 48);
    const standPlate = new THREE.Mesh(standPlateGeo, standMat);
    standPlate.position.y = 0.75;
    standPlate.receiveShadow = true;
    cakeGroup.add(standPlate);

    // Gold rim on stand
    const standRimGeo = new THREE.TorusGeometry(2.61, 0.04, 16, 48);
    const standRim = new THREE.Mesh(standRimGeo, goldMat);
    standRim.rotation.x = Math.PI / 2;
    standRim.position.y = 0.75;
    cakeGroup.add(standRim);

    // 2. Cake Tier 1 (Base)
    const tier1Geo = new THREE.CylinderGeometry(2.1, 2.1, 0.95, 48);
    const tier1 = new THREE.Mesh(tier1Geo, ivoryMat);
    tier1.position.y = 1.3;
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    cakeGroup.add(tier1);

    const goldBand1 = new THREE.Mesh(new THREE.TorusGeometry(2.12, 0.04, 16, 48), goldMat);
    goldBand1.rotation.x = Math.PI / 2;
    goldBand1.position.y = 0.88;
    cakeGroup.add(goldBand1);

    // 3. Cake Tier 2 (Middle)
    const tier2Geo = new THREE.CylinderGeometry(1.5, 1.5, 0.85, 48);
    const tier2 = new THREE.Mesh(tier2Geo, blushMat);
    tier2.position.y = 2.15;
    tier2.castShadow = true;
    tier2.receiveShadow = true;
    cakeGroup.add(tier2);

    const goldBand2 = new THREE.Mesh(new THREE.TorusGeometry(1.52, 0.035, 16, 48), goldMat);
    goldBand2.rotation.x = Math.PI / 2;
    goldBand2.position.y = 1.75;
    cakeGroup.add(goldBand2);

    // 4. Cake Tier 3 (Top)
    const tier3Geo = new THREE.CylinderGeometry(0.95, 0.95, 0.75, 48);
    const tier3 = new THREE.Mesh(tier3Geo, ivoryMat);
    tier3.position.y = 2.9;
    tier3.castShadow = true;
    tier3.receiveShadow = true;
    cakeGroup.add(tier3);

    const goldBand3 = new THREE.Mesh(new THREE.TorusGeometry(0.97, 0.03, 16, 48), goldMat);
    goldBand3.rotation.x = Math.PI / 2;
    goldBand3.position.y = 2.55;
    cakeGroup.add(goldBand3);

    // 5. Candles (3 candles spaced on top tier)
    const candlePositions = [
      new THREE.Vector3(-0.4, 3.28, 0),
      new THREE.Vector3(0, 3.28, 0.35),
      new THREE.Vector3(0.4, 3.28, 0),
    ];

    const candleStickGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.6, 24);
    const candleWickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 16);
    const flameOuterGeo = new THREE.SphereGeometry(0.09, 16, 16);
    flameOuterGeo.scale(0.8, 1.6, 0.8);
    const flameInnerGeo = new THREE.SphereGeometry(0.05, 12, 12);
    flameInnerGeo.scale(0.7, 1.4, 0.7);

    const flameGroups: THREE.Group[] = [];
    const candleLights: THREE.PointLight[] = [];

    candlePositions.forEach((pos) => {
      // Stick
      const stick = new THREE.Mesh(candleStickGeo, candleMat);
      stick.position.copy(pos);
      stick.position.y += 0.3;
      stick.castShadow = true;
      cakeGroup.add(stick);

      // Wick
      const wick = new THREE.Mesh(candleWickGeo, wickMat);
      wick.position.copy(pos);
      wick.position.y += 0.64;
      cakeGroup.add(wick);

      // Flame Group
      const flameGroup = new THREE.Group();
      flameGroup.position.copy(pos);
      flameGroup.position.y += 0.75;

      const flameOuter = new THREE.Mesh(flameOuterGeo, flameOuterMat);
      const flameInner = new THREE.Mesh(flameInnerGeo, flameInnerMat);
      flameInner.position.y = -0.02;

      flameGroup.add(flameOuter);
      flameGroup.add(flameInner);
      cakeGroup.add(flameGroup);
      flameGroups.push(flameGroup);

      // Warm point light for each candle
      const pLight = new THREE.PointLight(0xF59E0B, 0.9, 3.5);
      pLight.position.copy(flameGroup.position);
      scene.add(pLight);
      candleLights.push(pLight);
    });

    // 6. Smoke Particle System (Activated when blown out)
    const smokeCount = 30;
    const smokeGeo = new THREE.BufferGeometry();
    const smokePositions = new Float32Array(smokeCount * 3);
    const smokeVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < smokeCount; i++) {
      const originCandle = candlePositions[i % 3];
      smokePositions[i * 3] = originCandle.x;
      smokePositions[i * 3 + 1] = 4.0;
      smokePositions[i * 3 + 2] = originCandle.z;
      smokeVelocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: 0.025 + Math.random() * 0.02,
        z: (Math.random() - 0.5) * 0.015,
      });
    }

    smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePositions, 3));
    const smokeMat = new THREE.PointsMaterial({
      color: 0xFAF7F2,
      size: 0.18,
      transparent: true,
      opacity: 0,
    });
    const smokeParticles = new THREE.Points(smokeGeo, smokeMat);
    scene.add(smokeParticles);

    // Soft Floor Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const gradient = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(41, 38, 43, 0.45)');
      gradient.addColorStop(0.5, 'rgba(41, 38, 43, 0.15)');
      gradient.addColorStop(1, 'rgba(41, 38, 43, 0)');
      sCtx.fillStyle = gradient;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 5.2),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // Environmental Lights
    const ambientLight = new THREE.AmbientLight(0xE8D8C5, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFF8EF, 1.3);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xC88F91, 0.6);
    fillLight.position.set(-4, 3, -3);
    scene.add(fillLight);

    // Mouse / Touch Interaction for soft rotation
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetRotY = x * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let blowProgress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Soft idle rotation
      cakeGroup.rotation.y += (targetRotY + 0.15 - cakeGroup.rotation.y) * 0.04;
      cakeGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.04;

      if (!isBlownRef.current) {
        // Flickering flame meshes and lights
        flameGroups.forEach((flame, idx) => {
          const flicker = 1 + Math.sin(elapsedTime * 8 + idx * 2) * 0.12;
          flame.scale.set(flicker, flicker * 1.05, flicker);
          flame.rotation.z = Math.sin(elapsedTime * 6 + idx) * 0.08;
        });
        candleLights.forEach((light, idx) => {
          light.intensity = 0.85 + Math.sin(elapsedTime * 10 + idx) * 0.2;
        });
      } else {
        // Blow out animation: shrink flames, fade lights, rise smoke
        if (blowProgress < 1) {
          blowProgress += 0.05;
          const scale = Math.max(0, 1 - blowProgress * 2);
          flameGroups.forEach((flame) => flame.scale.set(scale, scale, scale));
          candleLights.forEach((light) => {
            light.intensity = Math.max(0, (1 - blowProgress) * 0.9);
          });
          // Fade in smoke
          smokeMat.opacity = Math.sin(blowProgress * Math.PI) * 0.6;
        }

        // Animate smoke particles drifting upward
        if (smokeMat.opacity > 0.01) {
          const positions = smokeGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < smokeCount; i++) {
            positions[i * 3] += smokeVelocities[i].x;
            positions[i * 3 + 1] += smokeVelocities[i].y;
            positions[i * 3 + 2] += smokeVelocities[i].z;
          }
          smokeGeo.attributes.position.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

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
      standBaseGeo.dispose();
      standPillarGeo.dispose();
      standPlateGeo.dispose();
      standRimGeo.dispose();
      tier1Geo.dispose();
      tier2Geo.dispose();
      tier3Geo.dispose();
      candleStickGeo.dispose();
      candleWickGeo.dispose();
      flameOuterGeo.dispose();
      flameInnerGeo.dispose();
      smokeGeo.dispose();
      shadowTex.dispose();
      ivoryMat.dispose();
      blushMat.dispose();
      goldMat.dispose();
      standMat.dispose();
      candleMat.dispose();
      wickMat.dispose();
      flameOuterMat.dispose();
      flameInnerMat.dispose();
      smokeMat.dispose();
    };
  }, []);

  if (webGLFailed) {
    return (
      <div
        onClick={onBlowOut}
        className="w-72 h-64 bg-champagne/40 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer border border-champagne"
      >
        <span className="text-4xl mb-2">🎂</span>
        <span className="font-serif text-sm text-deepPlum">Make a wish</span>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      onClick={() => {
        if (!isBlown) onBlowOut();
      }}
      className="w-80 h-80 sm:w-96 sm:h-96 cursor-pointer select-none transition-transform duration-500 hover:scale-102"
      title={isBlown ? 'Candles blown out' : 'Click to blow out candles'}
    />
  );
};
