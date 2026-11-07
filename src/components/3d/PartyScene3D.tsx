import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { audioManager } from '../../utils/audio';

export type CelebrationState = 'idle' | 'preparing' | 'blowing' | 'celebrating';

interface PartyScene3DProps {
  celebrationState: CelebrationState;
  onCakeClick: () => void;
  onCelebrationReady?: () => void;
}

export const PartyScene3D: React.FC<PartyScene3DProps> = ({
  celebrationState,
  onCakeClick,
  onCelebrationReady,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState(false);
  const stateRef = useRef<CelebrationState>(celebrationState);
  stateRef.current = celebrationState;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setWebGLFailed(true);
        return;
      }
    } catch {
      setWebGLFailed(true);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = null; // Transparent to blend seamlessly into colorful gradient container

    // CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const initialCamPos = new THREE.Vector3(0, 1.8, 6.2);
    camera.position.copy(initialCamPos);
    camera.lookAt(0, 1.25, 0);

    // RENDERER
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed', e);
      setWebGLFailed(true);
      return;
    }

    // =========================================================================
    // LIGHTING RIG (Warm, Colorful, Festive Studio)
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xFFF3EB, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFF0DF, 1.4);
    keyLight.position.set(3, 6, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const pinkFillLight = new THREE.DirectionalLight(0xFF94B8, 0.8);
    pinkFillLight.position.set(-4, 3, 2);
    scene.add(pinkFillLight);

    const rimLight = new THREE.DirectionalLight(0x70D6FF, 0.7);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    // Disco / Party flashing lights for celebration
    const partyLight1 = new THREE.PointLight(0xFF5E97, 0, 8);
    partyLight1.position.set(-2, 3, 2);
    scene.add(partyLight1);

    const partyLight2 = new THREE.PointLight(0x70D6FF, 0, 8);
    partyLight2.position.set(2, 3, 2);
    scene.add(partyLight2);

    const partyLight3 = new THREE.PointLight(0xFFD670, 0, 8);
    partyLight3.position.set(0, 4, 3);
    scene.add(partyLight3);

    // =========================================================================
    // COLORFUL ROOM DECORATIONS (Balloons, Floating Stars, Bunting)
    // =========================================================================
    const decorGroup = new THREE.Group();
    scene.add(decorGroup);

    // Soft Stage Floor / Contact Shadow
    const floorGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.25, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xFFF9F5,
      roughness: 0.6,
      metalness: 0.05,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.125;
    floorMesh.receiveShadow = true;
    decorGroup.add(floorMesh);

    // Decorative floor ring
    const floorRingGeo = new THREE.TorusGeometry(4.35, 0.05, 16, 48);
    const floorRingMat = new THREE.MeshStandardMaterial({
      color: 0xF3C053,
      metalness: 0.6,
      roughness: 0.3,
    });
    const floorRing = new THREE.Mesh(floorRingGeo, floorRingMat);
    floorRing.rotation.x = Math.PI / 2;
    floorRing.position.y = 0.01;
    decorGroup.add(floorRing);

    // Balloons Collection
    const balloonColors = [0xFF5E97, 0x70D6FF, 0xBDB2FF, 0xFFD670, 0x9BF6FF, 0xFF85A2, 0xFFB4A2];
    const balloonMeshes: {
      mesh: THREE.Group;
      baseY: number;
      speed: number;
      sway: number;
      isFlyingUp: boolean;
      velY: number;
    }[] = [];

    const balloonGeo = new THREE.SphereGeometry(0.35, 24, 24);
    balloonGeo.scale(1, 1.25, 1);
    const balloonKnotGeo = new THREE.ConeGeometry(0.06, 0.08, 12);
    const stringGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.8, 8);
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xF3C053 });

    for (let i = 0; i < 14; i++) {
      const bGroup = new THREE.Group();
      const color = balloonColors[i % balloonColors.length];
      const bMat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.1,
      });

      const bSphere = new THREE.Mesh(balloonGeo, bMat);
      bSphere.castShadow = true;
      bGroup.add(bSphere);

      const knot = new THREE.Mesh(balloonKnotGeo, bMat);
      knot.position.y = -0.42;
      knot.rotation.x = Math.PI;
      bGroup.add(knot);

      const string = new THREE.Mesh(stringGeo, stringMat);
      string.position.y = -0.85;
      bGroup.add(string);

      // Position in semicircle behind & around the girl and cake
      const angle = (i / 13) * Math.PI * 1.5 - Math.PI * 0.75;
      const radius = 2.4 + (i % 3) * 0.4;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius - 0.8;
      const y = 1.6 + (i % 4) * 0.35;

      bGroup.position.set(x, y, z);
      decorGroup.add(bGroup);

      balloonMeshes.push({
        mesh: bGroup,
        baseY: y,
        speed: 1.2 + (i % 5) * 0.3,
        sway: 0.08 + (i % 3) * 0.04,
        isFlyingUp: false,
        velY: 0.04 + Math.random() * 0.05,
      });
    }

    // Floating 3D Stars
    const starGeo = new THREE.OctahedronGeometry(0.12);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xFFD670,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xF3C053,
      emissiveIntensity: 0.4,
    });
    const stars: THREE.Mesh[] = [];
    for (let i = 0; i < 12; i++) {
      const star = new THREE.Mesh(starGeo, starMat);
      const angle = (i / 12) * Math.PI * 2;
      const dist = 1.8 + (i % 3) * 0.6;
      star.position.set(
        Math.cos(angle) * dist,
        1.2 + (i % 5) * 0.4,
        Math.sin(angle) * dist
      );
      decorGroup.add(star);
      stars.push(star);
    }

    // Party Bunting Flags
    const bannerGroup = new THREE.Group();
    const flagGeo = new THREE.ConeGeometry(0.14, 0.25, 3);
    const flagColors = [0xFF5E97, 0x70D6FF, 0xFFD670, 0x9BF6FF, 0xBDB2FF, 0xFF85A2];
    for (let i = -7; i <= 7; i++) {
      const fMat = new THREE.MeshStandardMaterial({
        color: flagColors[Math.abs(i) % flagColors.length],
        roughness: 0.4,
      });
      const flag = new THREE.Mesh(flagGeo, fMat);
      const x = i * 0.35;
      const catenaryY = 3.6 - Math.pow(x * 0.3, 2) * 0.4;
      flag.position.set(x, catenaryY, -1.8);
      flag.rotation.z = Math.PI;
      bannerGroup.add(flag);
    }
    decorGroup.add(bannerGroup);

    // =========================================================================
    // THE 3D BIRTHDAY CAKE
    // =========================================================================
    const cakeGroup = new THREE.Group();
    cakeGroup.position.set(0, 0, 0.4);
    scene.add(cakeGroup);

    // Pedestal Stand
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.2,
      metalness: 0.3,
    });
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xF3C053,
      roughness: 0.25,
      metalness: 0.85,
    });

    const pedBase = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 0.12, 36), pedestalMat);
    pedBase.position.y = 0.06;
    pedBase.receiveShadow = true;
    cakeGroup.add(pedBase);

    const pedStem = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.5, 24), pedestalMat);
    pedStem.position.y = 0.35;
    cakeGroup.add(pedStem);

    const pedPlate = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.08, 48), pedestalMat);
    pedPlate.position.y = 0.62;
    pedPlate.receiveShadow = true;
    cakeGroup.add(pedPlate);

    const pedGoldRim = new THREE.Mesh(new THREE.TorusGeometry(1.31, 0.02, 16, 48), goldTrimMat);
    pedGoldRim.rotation.x = Math.PI / 2;
    pedGoldRim.position.y = 0.62;
    cakeGroup.add(pedGoldRim);

    // Cake Tiers (Pastel Sky-Blue, Strawberry Pink, Vanilla Cream)
    const tier1Mat = new THREE.MeshStandardMaterial({
      color: 0x9BF6FF, // Mint / Sky blue
      roughness: 0.35,
    });
    const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.45, 48), tier1Mat);
    tier1.position.y = 0.88;
    tier1.castShadow = true;
    tier1.receiveShadow = true;
    cakeGroup.add(tier1);

    // Frosting Drip ring 1
    const frostingDrip1 = new THREE.Mesh(new THREE.TorusGeometry(1.06, 0.035, 16, 48), new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 }));
    frostingDrip1.rotation.x = Math.PI / 2;
    frostingDrip1.position.y = 1.08;
    cakeGroup.add(frostingDrip1);

    // Tier 2 (Pastel Strawberry Pink)
    const tier2Mat = new THREE.MeshStandardMaterial({
      color: 0xFFB3C6, // Strawberry pink
      roughness: 0.35,
    });
    const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.4, 48), tier2Mat);
    tier2.position.y = 1.3;
    tier2.castShadow = true;
    tier2.receiveShadow = true;
    cakeGroup.add(tier2);

    // Frosting Drip ring 2
    const frostingDrip2 = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.03, 16, 48), new THREE.MeshStandardMaterial({ color: 0xFFD670, roughness: 0.2 }));
    frostingDrip2.rotation.x = Math.PI / 2;
    frostingDrip2.position.y = 1.48;
    cakeGroup.add(frostingDrip2);

    // Tier 3 (Vanilla Lavender)
    const tier3Mat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF, // Pure whipped cream
      roughness: 0.25,
    });
    const tier3 = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.32, 48), tier3Mat);
    tier3.position.y = 1.66;
    tier3.castShadow = true;
    tier3.receiveShadow = true;
    cakeGroup.add(tier3);

    // Colorful Sprinkles on top
    const sprinkleGeo = new THREE.CapsuleGeometry(0.015, 0.04, 4, 8);
    const sprinkleColors = [0xFF5E97, 0x70D6FF, 0xFFD670, 0x80ED99, 0xBDB2FF];
    for (let i = 0; i < 20; i++) {
      const sMat = new THREE.MeshStandardMaterial({ color: sprinkleColors[i % sprinkleColors.length] });
      const sprinkle = new THREE.Mesh(sprinkleGeo, sMat);
      const sRad = 0.15 + Math.random() * 0.28;
      const sAng = Math.random() * Math.PI * 2;
      sprinkle.position.set(Math.cos(sAng) * sRad, 1.83, Math.sin(sAng) * sRad);
      sprinkle.rotation.set(Math.PI / 2, Math.random() * Math.PI, 0);
      cakeGroup.add(sprinkle);
    }

    // 3 Candles on top
    const candleColors = [0xFF5E97, 0x70D6FF, 0xF3C053];
    const candlePositions = [
      new THREE.Vector3(-0.18, 1.83, 0),
      new THREE.Vector3(0, 1.83, 0.16),
      new THREE.Vector3(0.18, 1.83, 0),
    ];

    const candleStickGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.32, 16);
    const candleWickGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.06, 8);
    const flameOuterGeo = new THREE.SphereGeometry(0.045, 12, 12);
    flameOuterGeo.scale(0.8, 1.8, 0.8);
    const flameInnerGeo = new THREE.SphereGeometry(0.025, 8, 8);
    flameInnerGeo.scale(0.7, 1.4, 0.7);

    const flameGroups: THREE.Group[] = [];
    const candlePointLights: THREE.PointLight[] = [];

    candlePositions.forEach((pos, idx) => {
      const cMat = new THREE.MeshStandardMaterial({ color: candleColors[idx], roughness: 0.3 });
      const stick = new THREE.Mesh(candleStickGeo, cMat);
      stick.position.copy(pos);
      stick.position.y += 0.16;
      stick.castShadow = true;
      cakeGroup.add(stick);

      const wick = new THREE.Mesh(candleWickGeo, new THREE.MeshBasicMaterial({ color: 0x2D283E }));
      wick.position.copy(pos);
      wick.position.y += 0.33;
      cakeGroup.add(wick);

      const fGroup = new THREE.Group();
      fGroup.position.copy(pos);
      fGroup.position.y += 0.42;

      const fOuter = new THREE.Mesh(flameOuterGeo, new THREE.MeshBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.9 }));
      const fInner = new THREE.Mesh(flameInnerGeo, new THREE.MeshBasicMaterial({ color: 0xFFFBEB }));
      fInner.position.y = -0.01;
      fGroup.add(fOuter);
      fGroup.add(fInner);
      cakeGroup.add(fGroup);
      flameGroups.push(fGroup);

      const cLight = new THREE.PointLight(0xF59E0B, 1.2, 3);
      cLight.position.copy(fGroup.position);
      cakeGroup.add(cLight);
      candlePointLights.push(cLight);
    });

    // Realistic Smoke Particles when extinguished
    const smokeCount = 35;
    const smokeGeo = new THREE.BufferGeometry();
    const smokePos = new Float32Array(smokeCount * 3);
    const smokeVels: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < smokeCount; i++) {
      const originCandle = candlePositions[i % 3];
      smokePos[i * 3] = originCandle.x;
      smokePos[i * 3 + 1] = originCandle.y + 0.4;
      smokePos[i * 3 + 2] = originCandle.z;
      smokeVels.push({
        x: (Math.random() - 0.5) * 0.012,
        y: 0.02 + Math.random() * 0.02,
        z: (Math.random() - 0.5) * 0.012,
      });
    }
    smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePos, 3));
    const smokeMat = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.12,
      transparent: true,
      opacity: 0,
    });
    const smokePoints = new THREE.Points(smokeGeo, smokeMat);
    cakeGroup.add(smokePoints);

    // =========================================================================
    // AIRFLOW WIND PARTICLES (Active during blowing step)
    // =========================================================================
    const airCount = 45;
    const airGeo = new THREE.BufferGeometry();
    const airPos = new Float32Array(airCount * 3);
    const airVel: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < airCount; i++) {
      airPos[i * 3] = 0;
      airPos[i * 3 + 1] = 2.05; // Mouth height
      airPos[i * 3 + 2] = -0.15;
      airVel.push({
        x: (Math.random() - 0.5) * 0.015,
        y: -0.015 - Math.random() * 0.01,
        z: 0.035 + Math.random() * 0.025,
      });
    }
    airGeo.setAttribute('position', new THREE.BufferAttribute(airPos, 3));
    const airMat = new THREE.PointsMaterial({
      color: 0xC5EEFF,
      size: 0.08,
      transparent: true,
      opacity: 0,
    });
    const airParticles = new THREE.Points(airGeo, airMat);
    scene.add(airParticles);

    // =========================================================================
    // 3D GIRL CHARACTER (Mahima)
    // =========================================================================
    const girlGroup = new THREE.Group();
    girlGroup.position.set(0, 0, -0.45);
    scene.add(girlGroup);

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xFFE0BD,
      roughness: 0.5,
      metalness: 0.02,
    });
    const blushSkinMat = new THREE.MeshStandardMaterial({
      color: 0xFFAEC9,
      roughness: 0.4,
    });
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x3D2314, // Dark chestnut
      roughness: 0.35,
    });
    const dressPinkMat = new THREE.MeshStandardMaterial({
      color: 0xFF5E97, // Bright pink birthday dress
      roughness: 0.35,
      metalness: 0.05,
    });
    const dressLavenderMat = new THREE.MeshStandardMaterial({
      color: 0xBDB2FF,
      roughness: 0.4,
    });
    const goldAccMat = new THREE.MeshStandardMaterial({
      color: 0xF3C053,
      metalness: 0.8,
      roughness: 0.25,
    });
    const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const eyePupilMat = new THREE.MeshBasicMaterial({ color: 0x231709 });

    // 1. Legs & Shoes
    const legGeo = new THREE.CylinderGeometry(0.065, 0.06, 0.75, 16);
    const shoeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    shoeGeo.scale(1, 0.65, 1.4);
    const sockGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.2, 16);

    const leftLeg = new THREE.Mesh(legGeo, skinMat);
    leftLeg.position.set(-0.16, 0.45, 0);
    leftLeg.castShadow = true;
    girlGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, skinMat);
    rightLeg.position.set(0.16, 0.45, 0);
    rightLeg.castShadow = true;
    girlGroup.add(rightLeg);

    const leftShoe = new THREE.Mesh(shoeGeo, dressPinkMat);
    leftShoe.position.set(-0.16, 0.06, 0.04);
    girlGroup.add(leftShoe);

    const rightShoe = new THREE.Mesh(shoeGeo, dressPinkMat);
    rightShoe.position.set(0.16, 0.06, 0.04);
    girlGroup.add(rightShoe);

    // 2. Flared Birthday Dress (Skirt)
    const skirtGeo = new THREE.ConeGeometry(0.55, 0.65, 32, 1, true);
    const skirt = new THREE.Mesh(skirtGeo, dressPinkMat);
    skirt.position.y = 1.05;
    skirt.castShadow = true;
    girlGroup.add(skirt);

    // Frill hem around skirt
    const frillGeo = new THREE.TorusGeometry(0.56, 0.035, 16, 36);
    const frill = new THREE.Mesh(frillGeo, dressLavenderMat);
    frill.rotation.x = Math.PI / 2;
    frill.position.y = 0.74;
    girlGroup.add(frill);

    // Golden Ribbon Belt
    const beltGeo = new THREE.TorusGeometry(0.26, 0.03, 16, 32);
    const belt = new THREE.Mesh(beltGeo, goldAccMat);
    belt.rotation.x = Math.PI / 2;
    belt.position.y = 1.36;
    girlGroup.add(belt);

    // Waist Bow
    const bowMesh = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.02, 12, 16), dressLavenderMat);
    bowMesh.position.set(0, 1.36, 0.26);
    girlGroup.add(bowMesh);

    // 3. Torso (Bodice)
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, 1.36, 0);
    girlGroup.add(torsoGroup);

    const torsoGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.45, 24);
    const torso = new THREE.Mesh(torsoGeo, dressPinkMat);
    torso.position.y = 0.22;
    torso.castShadow = true;
    torsoGroup.add(torso);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.18, 16), skinMat);
    neck.position.y = 0.52;
    torsoGroup.add(neck);

    // Pearl Choker
    const choker = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.015, 12, 24), goldAccMat);
    choker.rotation.x = Math.PI / 2;
    choker.position.y = 0.48;
    torsoGroup.add(choker);

    // 4. Head Group (Rotates and looks naturally)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.65, 0);
    torsoGroup.add(headGroup);

    const headGeo = new THREE.SphereGeometry(0.36, 28, 28);
    headGeo.scale(1, 1.05, 0.95);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 0.28;
    head.castShadow = true;
    headGroup.add(head);

    // Blush Cheeks
    const cheekGeo = new THREE.SphereGeometry(0.07, 12, 12);
    cheekGeo.scale(1.2, 0.7, 0.3);
    const leftCheek = new THREE.Mesh(cheekGeo, blushSkinMat);
    leftCheek.position.set(-0.2, 0.24, 0.3);
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(cheekGeo, blushSkinMat);
    rightCheek.position.set(0.2, 0.24, 0.3);
    headGroup.add(rightCheek);

    // Expressive Eyes (with blinking eyelids!)
    const eyeGeo = new THREE.SphereGeometry(0.065, 16, 16);
    eyeGeo.scale(0.8, 1, 0.4);
    const pupilGeo = new THREE.SphereGeometry(0.042, 12, 12);
    pupilGeo.scale(0.8, 1, 0.4);

    const leftEye = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    leftEye.position.set(-0.13, 0.3, 0.32);
    headGroup.add(leftEye);

    const leftPupil = new THREE.Mesh(pupilGeo, eyePupilMat);
    leftPupil.position.set(-0.13, 0.3, 0.34);
    headGroup.add(leftPupil);

    const rightEye = new THREE.Mesh(eyeGeo, eyeWhiteMat);
    rightEye.position.set(0.13, 0.3, 0.32);
    headGroup.add(rightEye);

    const rightPupil = new THREE.Mesh(pupilGeo, eyePupilMat);
    rightPupil.position.set(0.13, 0.3, 0.34);
    headGroup.add(rightPupil);

    // Eyelids for natural blinking
    const eyelidGeo = new THREE.SphereGeometry(0.07, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
    eyelidGeo.scale(0.85, 1.05, 0.45);
    const leftEyelid = new THREE.Mesh(eyelidGeo, skinMat);
    leftEyelid.position.set(-0.13, 0.34, 0.32);
    leftEyelid.rotation.x = 0;
    headGroup.add(leftEyelid);

    const rightEyelid = new THREE.Mesh(eyelidGeo, skinMat);
    rightEyelid.position.set(0.13, 0.34, 0.32);
    rightEyelid.rotation.x = 0;
    headGroup.add(rightEyelid);

    // Cute animated mouth (changes from smile to "O" for blowing)
    const mouthGeo = new THREE.TorusGeometry(0.045, 0.012, 8, 16, Math.PI);
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0xD83A56 });
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
    mouth.position.set(0, 0.16, 0.33);
    mouth.rotation.x = Math.PI;
    headGroup.add(mouth);

    // Cute Stylized Hair (Bangs, Side locks, Twin buns)
    const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.65), hairMat);
    hairCap.position.set(0, 0.34, -0.04);
    hairCap.rotation.x = -0.2;
    headGroup.add(hairCap);

    // Front Bangs
    const bangsGeo = new THREE.CylinderGeometry(0.39, 0.41, 0.16, 24, 1, false, -Math.PI * 0.4, Math.PI * 0.8);
    const bangs = new THREE.Mesh(bangsGeo, hairMat);
    bangs.position.set(0, 0.45, 0.02);
    headGroup.add(bangs);

    // Twin Buns on left & right
    const bunGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const leftBun = new THREE.Mesh(bunGeo, hairMat);
    leftBun.position.set(-0.35, 0.55, -0.05);
    headGroup.add(leftBun);

    const rightBun = new THREE.Mesh(bunGeo, hairMat);
    rightBun.position.set(0.35, 0.55, -0.05);
    headGroup.add(rightBun);

    // Ribbons on buns
    const ribbonGeo = new THREE.TorusGeometry(0.12, 0.02, 8, 16);
    const leftRibbon = new THREE.Mesh(ribbonGeo, dressLavenderMat);
    leftRibbon.position.copy(leftBun.position);
    headGroup.add(leftRibbon);

    const rightRibbon = new THREE.Mesh(ribbonGeo, dressLavenderMat);
    rightRibbon.position.copy(rightBun.position);
    headGroup.add(rightRibbon);

    // Birthday Party Hat!
    const hatGeo = new THREE.ConeGeometry(0.15, 0.45, 24);
    const hatMat = new THREE.MeshStandardMaterial({
      color: 0xFFD670,
      metalness: 0.5,
      roughness: 0.3,
    });
    const partyHat = new THREE.Mesh(hatGeo, hatMat);
    partyHat.position.set(0, 0.78, 0.02);
    partyHat.rotation.z = -0.12;
    partyHat.rotation.x = -0.08;
    headGroup.add(hatHatToGroup(partyHat, goldAccMat));

    function hatHatToGroup(hat: THREE.Mesh, pompomMat: THREE.Material) {
      const g = new THREE.Group();
      g.add(hat);
      const pompom = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), pompomMat);
      pompom.position.set(0, 0.24, 0);
      hat.add(pompom);
      return g;
    }

    // 5. Arms & Hands (Animated pivots)
    const armGeo = new THREE.CylinderGeometry(0.05, 0.045, 0.5, 16);
    const handGeo = new THREE.SphereGeometry(0.055, 12, 12);

    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.28, 0.4, 0);
    torsoGroup.add(leftArmGroup);

    const leftArm = new THREE.Mesh(armGeo, skinMat);
    leftArm.position.y = -0.22;
    leftArmGroup.add(leftArm);

    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.y = -0.48;
    leftArmGroup.add(leftHand);

    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.28, 0.4, 0);
    torsoGroup.add(rightArmGroup);

    const rightArm = new THREE.Mesh(armGeo, skinMat);
    rightArm.position.y = -0.22;
    rightArmGroup.add(rightArm);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.y = -0.48;
    rightArmGroup.add(rightHand);

    // Initial arm resting posture
    leftArmGroup.rotation.z = 0.2;
    rightArmGroup.rotation.z = -0.2;

    // =========================================================================
    // 3D PARTY GUESTS (Batparss Friends flanking on left and right)
    // =========================================================================
    const guestsGroup = new THREE.Group();
    scene.add(guestsGroup);

    function createPartyGuest(x: number, z: number, shirtColor: number, hairColor: number, hatColor: number) {
      const guest = new THREE.Group();
      guest.position.set(x, 0, z);

      // Body
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.25, 0.9, 20),
        new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.4 })
      );
      body.position.y = 0.75;
      body.castShadow = true;
      guest.add(body);

      // Head
      const gHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 20, 20),
        skinMat
      );
      gHead.position.y = 1.42;
      gHead.castShadow = true;
      guest.add(gHead);

      // Hair
      const gHair = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6),
        new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.4 })
      );
      gHair.position.y = 1.48;
      guest.add(gHair);

      // Party Hat
      const gHat = new THREE.Mesh(
        new THREE.ConeGeometry(0.12, 0.35, 16),
        new THREE.MeshStandardMaterial({ color: hatColor, roughness: 0.3 })
      );
      gHat.position.y = 1.82;
      guest.add(gHat);

      // Waving / Clapping Arms
      const gArmL = new THREE.Group();
      gArmL.position.set(-0.26, 1.05, 0);
      const armMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.45, 12), skinMat);
      armMeshL.position.y = -0.2;
      gArmL.add(armMeshL);
      guest.add(gArmL);

      const gArmR = new THREE.Group();
      gArmR.position.set(0.26, 1.05, 0);
      const armMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.45, 12), skinMat);
      armMeshR.position.y = -0.2;
      gArmR.add(armMeshR);
      guest.add(gArmR);

      return { guest, gArmL, gArmR, baseY: 0 };
    }

    // Guest 1: Left friend (Sky-blue & Mint)
    const guest1 = createPartyGuest(-1.85, -0.2, 0x70D6FF, 0x2D283E, 0xFF5E97);
    guest1.guest.rotation.y = 0.55;
    guestsGroup.add(guest1.guest);

    // Guest 2: Right friend (Lavender & Butter Yellow)
    const guest2 = createPartyGuest(1.85, -0.2, 0xBDB2FF, 0x4A2E18, 0x9BF6FF);
    guest2.guest.rotation.y = -0.55;
    guestsGroup.add(guest2.guest);

    // =========================================================================
    // 3D BURSTING CONFETTI
    // =========================================================================
    const confettiCount = 120;
    const confettiMeshes: {
      mesh: THREE.Mesh;
      vel: THREE.Vector3;
      rotVel: THREE.Vector3;
    }[] = [];

    const confGeo = new THREE.PlaneGeometry(0.08, 0.08);
    const confColors = [0xFF5E97, 0x70D6FF, 0xFFD670, 0x9BF6FF, 0xBDB2FF, 0xFF85A2, 0xF3C053];

    for (let i = 0; i < confettiCount; i++) {
      const cMat = new THREE.MeshBasicMaterial({
        color: confColors[i % confColors.length],
        side: THREE.DoubleSide,
      });
      const conf = new THREE.Mesh(confGeo, cMat);
      conf.position.set(0, 1.8, 0.4);
      conf.visible = false;
      scene.add(conf);

      confettiMeshes.push({
        mesh: conf,
        vel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.12,
          0.08 + Math.random() * 0.14,
          (Math.random() - 0.5) * 0.12
        ),
        rotVel: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        ),
      });
    }

    // =========================================================================
    // RAYCASTER FOR CAKE CLICKING
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      if (stateRef.current !== 'idle') return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([cakeGroup], true);
      if (intersects.length > 0) {
        onCakeClick();
      }
    };
    renderer.domElement.addEventListener('click', handleClick);

    // Touch support for mobile
    const handleTouch = (e: TouchEvent) => {
      if (stateRef.current !== 'idle' || e.touches.length === 0) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const touch = e.touches[0];
      mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects([cakeGroup], true);
      if (intersects.length > 0) {
        onCakeClick();
      }
    };
    renderer.domElement.addEventListener('touchstart', handleTouch, { passive: true });

    // =========================================================================
    // ANIMATION TICK LOOP
    // =========================================================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    let blinkTimer = 0;
    let nextBlinkTime = 2.5;
    let isBlinking = false;
    let blinkProgress = 0;

    let blowStepProgress = 0;
    let confettiActive = false;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      const currentState = stateRef.current;

      // 1. Idle Balloon Bobbing
      balloonMeshes.forEach((b, idx) => {
        if (!b.isFlyingUp) {
          b.mesh.position.y = b.baseY + Math.sin(elapsedTime * b.speed + idx) * b.sway;
          b.mesh.rotation.z = Math.sin(elapsedTime * 1.2 + idx) * 0.05;
        } else {
          // Flying up during party celebration!
          b.mesh.position.y += b.velY;
          b.mesh.position.x += Math.sin(elapsedTime * 2 + idx) * 0.015;
          b.mesh.rotation.z += 0.01;
        }
      });

      // 2. Floating Star Twinkle
      stars.forEach((star, idx) => {
        star.rotation.x += 0.015;
        star.rotation.y += 0.02;
        star.position.y += Math.sin(elapsedTime * 2 + idx) * 0.002;
      });

      // 3. Natural Blinking Loop
      blinkTimer += delta;
      if (!isBlinking && blinkTimer > nextBlinkTime) {
        isBlinking = true;
        blinkTimer = 0;
        blinkProgress = 0;
        nextBlinkTime = 2.5 + Math.random() * 2.5;
      }
      if (isBlinking) {
        blinkProgress += delta * 12;
        const eyelidScale = Math.sin(blinkProgress * Math.PI);
        leftEyelid.scale.y = 1 + eyelidScale * 1.2;
        rightEyelid.scale.y = 1 + eyelidScale * 1.2;
        if (blinkProgress >= 1) {
          isBlinking = false;
          leftEyelid.scale.y = 1;
          rightEyelid.scale.y = 1;
        }
      }

      // 4. Subtle Natural Idle Breathing
      const breath = Math.sin(elapsedTime * 1.8) * 0.015;
      torsoGroup.position.y = 1.36 + breath;
      headGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.08;
      headGroup.rotation.z = Math.sin(elapsedTime * 0.6) * 0.03;

      // =========================================================================
      // STATE-BASED CHARACTER & SCENE KINEMATICS
      // =========================================================================

      if (currentState === 'idle') {
        // Candles flicker warmly
        flameGroups.forEach((flame, idx) => {
          const flicker = 1 + Math.sin(elapsedTime * 10 + idx * 2.5) * 0.12;
          flame.scale.set(flicker, flicker * 1.1, flicker);
          flame.rotation.z = Math.sin(elapsedTime * 8 + idx) * 0.08;
        });
        candlePointLights.forEach((light, idx) => {
          light.intensity = 1.1 + Math.sin(elapsedTime * 12 + idx) * 0.25;
        });

        // Arms rest in gentle sway
        leftArmGroup.rotation.z = 0.2 + Math.sin(elapsedTime * 1.5) * 0.04;
        rightArmGroup.rotation.z = -0.2 - Math.sin(elapsedTime * 1.5) * 0.04;

        // Mouth is a warm happy smile
        mouth.scale.set(1, 1, 1);
        mouth.rotation.x = Math.PI;

        // Reset girl lean
        girlGroup.rotation.x = THREE.MathUtils.damp(girlGroup.rotation.x, 0, 4, delta);
      } else if (currentState === 'preparing') {
        // STEP 1: Girl leans forward, looks toward candles, takes a deep breath!
        girlGroup.rotation.x = THREE.MathUtils.damp(girlGroup.rotation.x, 0.22, 3, delta);
        headGroup.rotation.x = THREE.MathUtils.damp(headGroup.rotation.x, 0.15, 3, delta);

        // Hands lift up near chest excitedly
        leftArmGroup.rotation.x = THREE.MathUtils.damp(leftArmGroup.rotation.x, -0.6, 4, delta);
        leftArmGroup.rotation.z = THREE.MathUtils.damp(leftArmGroup.rotation.z, 0.35, 4, delta);
        rightArmGroup.rotation.x = THREE.MathUtils.damp(rightArmGroup.rotation.x, -0.6, 4, delta);
        rightArmGroup.rotation.z = THREE.MathUtils.damp(rightArmGroup.rotation.z, -0.35, 4, delta);

        // Chest expands with breath
        torso.scale.set(1.08, 1.06, 1.08);

        // Mouth starts to form an excited "O"
        mouth.scale.set(0.7, 1.4, 0.7);

        // Candles flicker with excitement
        flameGroups.forEach((flame, idx) => {
          const f = 1.1 + Math.sin(elapsedTime * 16 + idx * 3) * 0.25;
          flame.scale.set(f, f, f);
        });
      } else if (currentState === 'blowing') {
        // STEP 2: She visibly blows! Air particles stream forward, flames go out, smoke rises!
        girlGroup.rotation.x = THREE.MathUtils.damp(girlGroup.rotation.x, 0.28, 4, delta);
        headGroup.rotation.x = THREE.MathUtils.damp(headGroup.rotation.x, 0.2, 4, delta);

        // Pursed "O" mouth blowing
        mouth.scale.set(0.45, 1.8, 0.45);

        // Show and animate wind airflow particles
        airMat.opacity = THREE.MathUtils.damp(airMat.opacity, 0.75, 6, delta);
        const airArr = airGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < airCount; i++) {
          airArr[i * 3] += airVel[i].x;
          airArr[i * 3 + 1] += airVel[i].y;
          airArr[i * 3 + 2] += airVel[i].z;
          // Loop air particle back to mouth
          if (airArr[i * 3 + 2] > 0.45) {
            airArr[i * 3] = (Math.random() - 0.5) * 0.05;
            airArr[i * 3 + 1] = 2.05 + (Math.random() - 0.5) * 0.03;
            airArr[i * 3 + 2] = -0.15;
          }
        }
        airGeo.attributes.position.needsUpdate = true;

        // Extinguish flames rapidly!
        blowStepProgress += delta * 2.2;
        const flameScale = Math.max(0, 1 - blowStepProgress);
        flameGroups.forEach((flame) => {
          flame.scale.set(flameScale, flameScale * 1.2, flameScale);
        });
        candlePointLights.forEach((light) => {
          light.intensity = Math.max(0, (1 - blowStepProgress) * 1.2);
        });

        // Smoke wisps fade in and drift up
        if (flameScale <= 0.1) {
          smokeMat.opacity = THREE.MathUtils.damp(smokeMat.opacity, 0.65, 4, delta);
          const sArr = smokeGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < smokeCount; i++) {
            sArr[i * 3] += smokeVels[i].x;
            sArr[i * 3 + 1] += smokeVels[i].y;
            sArr[i * 3 + 2] += smokeVels[i].z;
          }
          smokeGeo.attributes.position.needsUpdate = true;
        }
      } else if (currentState === 'celebrating') {
        // STEP 3: THE PARTY EXPLODES!
        // Air particles fade out
        airMat.opacity = THREE.MathUtils.damp(airMat.opacity, 0, 5, delta);

        // Smoke gently dissipates
        if (smokeMat.opacity > 0.02) {
          smokeMat.opacity -= delta * 0.15;
          const sArr = smokeGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < smokeCount; i++) {
            sArr[i * 3 + 1] += smokeVels[i].y * 0.6;
          }
          smokeGeo.attributes.position.needsUpdate = true;
        }

        // Balloons fly up into the sky!
        balloonMeshes.forEach((b) => {
          b.isFlyingUp = true;
        });

        // Party Lights Flash!
        partyLight1.intensity = 1.5 + Math.sin(elapsedTime * 8) * 1.2;
        partyLight2.intensity = 1.5 + Math.cos(elapsedTime * 9) * 1.2;
        partyLight3.intensity = 1.2 + Math.sin(elapsedTime * 11) * 0.8;

        // Girl stands upright, throws hands up in celebration, claps and smiles!
        girlGroup.rotation.x = THREE.MathUtils.damp(girlGroup.rotation.x, -0.05, 3, delta);
        headGroup.rotation.x = THREE.MathUtils.damp(headGroup.rotation.x, -0.1, 3, delta);
        torso.scale.set(1, 1, 1);

        // Huge happy smile
        mouth.scale.set(1.4, 1.2, 1.4);
        mouth.rotation.x = Math.PI;

        // Girl claps her hands!
        const clapAnim = Math.sin(elapsedTime * 14);
        leftArmGroup.rotation.x = -1.1 + Math.sin(elapsedTime * 8) * 0.15;
        leftArmGroup.rotation.z = 0.45 + clapAnim * 0.25;
        rightArmGroup.rotation.x = -1.1 + Math.sin(elapsedTime * 8) * 0.15;
        rightArmGroup.rotation.z = -0.45 - clapAnim * 0.25;

        // Girl does a joyful bounce
        girlGroup.position.y = Math.abs(Math.sin(elapsedTime * 6)) * 0.12;

        // Guest 1: Jumps, waves arms, and celebrates!
        guest1.guest.position.y = Math.abs(Math.sin(elapsedTime * 5.5 + 0.5)) * 0.18;
        guest1.gArmL.rotation.x = -1.8 + Math.sin(elapsedTime * 10) * 0.4;
        guest1.gArmR.rotation.x = -1.8 + Math.cos(elapsedTime * 10) * 0.4;
        guest1.guest.rotation.z = Math.sin(elapsedTime * 5) * 0.08;

        // Guest 2: Jumps and claps!
        guest2.guest.position.y = Math.abs(Math.sin(elapsedTime * 5.2 + 1.2)) * 0.18;
        guest2.gArmL.rotation.x = -1.6 + Math.cos(elapsedTime * 9) * 0.35;
        guest2.gArmR.rotation.x = -1.6 + Math.sin(elapsedTime * 9) * 0.35;
        guest2.guest.rotation.z = -Math.sin(elapsedTime * 5) * 0.08;

        // 3D Confetti Burst Physics!
        if (!confettiActive) {
          confettiActive = true;
          confettiMeshes.forEach((c) => {
            c.mesh.visible = true;
          });
        }
        confettiMeshes.forEach((c) => {
          c.mesh.position.add(c.vel);
          c.mesh.rotation.x += c.rotVel.x;
          c.mesh.rotation.y += c.rotVel.y;
          c.mesh.rotation.z += c.rotVel.z;
          // Gravity
          c.vel.y -= delta * 0.14;
          c.vel.x *= 0.99;
          c.vel.z *= 0.99;
        });

        // Camera celebratory slow push-back & orbit
        camera.position.x = THREE.MathUtils.damp(camera.position.x, Math.sin(elapsedTime * 0.5) * 0.6, 2, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, 2.1, 2, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 6.6, 2, delta);
        camera.lookAt(0, 1.4, 0);
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
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.domElement.removeEventListener('touchstart', handleTouch);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose geometries & materials
      floorGeo.dispose();
      floorMat.dispose();
      floorRingGeo.dispose();
      floorRingMat.dispose();
      balloonGeo.dispose();
      starGeo.dispose();
      starMat.dispose();
      skinMat.dispose();
      hairMat.dispose();
      dressPinkMat.dispose();
      dressLavenderMat.dispose();
      goldAccMat.dispose();
    };
  }, []);

  if (webGLFailed) {
    return (
      <div
        onClick={onCakeClick}
        className="w-full max-w-lg mx-auto aspect-square bg-cardGlow rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer border-2 border-pinkPastel shadow-xl"
      >
        <div className="text-7xl mb-4 animate-bounce">🎂</div>
        <p className="font-serif text-2xl font-bold text-deepPlum text-center">
          Tap the cake to make a wish!
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] flex items-center justify-center select-none">
      <div
        ref={mountRef}
        className="w-full h-full cursor-pointer"
        title="Tap the cake to make a wish!"
      />
    </div>
  );
};
