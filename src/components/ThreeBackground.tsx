import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ThreeBackgroundProps {
  roseModelUrl?: string;
  scrollProgress?: number; // 0 (hero) to 1 (bottom)
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  roseModelUrl,
  scrollProgress = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfffdf9, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 13);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clean previous canvases
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // --- Warm Romantic Lighting ---
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff5f8, 2.5);
    mainLight.position.set(6, 10, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    // Glowing Point Lights for Central Gem & Blossoms
    const gemGlowPoint = new THREE.PointLight(0xe91e63, 3.5, 22);
    gemGlowPoint.position.set(0, 0, 3);
    scene.add(gemGlowPoint);

    const softPinkPoint = new THREE.PointLight(0xf48fb1, 2.2, 18);
    softPinkPoint.position.set(-4, 3, 2);
    scene.add(softPinkPoint);

    const goldAccentPoint = new THREE.PointLight(0xffd54f, 2.5, 18);
    goldAccentPoint.position.set(4, -2, 2);
    scene.add(goldAccentPoint);

    // --- Groups ---
    const bouquetGroup = new THREE.Group();
    scene.add(bouquetGroup);
    bouquetGroup.position.set(0, -0.4, 0);

    const heartsGroup = new THREE.Group();
    scene.add(heartsGroup);

    const petalsGroup = new THREE.Group();
    scene.add(petalsGroup);

    // --- Helper: Create 3D Heart Geometry ---
    const createHeartMesh = (scale = 1, color = 0xd32f2f) => {
      const heartShape = new THREE.Shape();
      const x = 0, y = 0;
      heartShape.moveTo(x + 0.25, y + 0.25);
      heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
      heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
      heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1.0);
      heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
      heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
      heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

      const extrudeSettings = {
        depth: 0.28,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.07,
        bevelThickness: 0.07,
      };

      const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
      geometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.1,
        emissive: color,
        emissiveIntensity: 0.2,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(scale, scale, scale);
      mesh.rotation.x = Math.PI;
      return mesh;
    };

    // --- Helper: Procedural 3D Glowing Crystal Heart Gem Builder ---
    const createCrystalHeartGem = (scale = 1) => {
      const gemGroup = new THREE.Group();

      const heartShape = new THREE.Shape();
      const x = 0, y = 0;
      heartShape.moveTo(x + 0.25, y + 0.25);
      heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
      heartShape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.4, x - 0.35, y + 0.4);
      heartShape.bezierCurveTo(x - 0.35, y + 0.65, x - 0.1, y + 0.88, x + 0.25, y + 1.15);
      heartShape.bezierCurveTo(x + 0.6, y + 0.88, x + 0.85, y + 0.65, x + 0.85, y + 0.4);
      heartShape.bezierCurveTo(x + 0.85, y + 0.4, x + 0.85, y, x + 0.5, y);
      heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

      const extrudeSettings = {
        depth: 0.55,
        bevelEnabled: true,
        bevelSegments: 6,
        steps: 2,
        bevelSize: 0.18,
        bevelThickness: 0.18,
      };

      const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
      geometry.center();

      // Faceted Ruby / Pink Sapphire Crystal Gem Material
      const gemMaterial = new THREE.MeshStandardMaterial({
        color: 0xd81b60,
        emissive: 0xc2185b,
        emissiveIntensity: 0.45,
        roughness: 0.15,
        metalness: 0.4,
        transparent: true,
        opacity: 0.95,
      });

      const heartMesh = new THREE.Mesh(geometry, gemMaterial);
      heartMesh.rotation.x = Math.PI;
      gemGroup.add(heartMesh);

      // Inner Core Glow
      const coreGeo = new THREE.OctahedronGeometry(0.6, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xff80ab,
        emissive: 0xff4081,
        emissiveIntensity: 0.8,
        roughness: 0.1,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.scale.set(0.8, 0.9, 0.5);
      gemGroup.add(coreMesh);

      // Outer Golden Ring Halo around Crystal Heart
      const ringGeo = new THREE.TorusGeometry(1.4, 0.04, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xffd54f,
        metalness: 0.85,
        roughness: 0.2,
        emissive: 0xffb300,
        emissiveIntensity: 0.3,
      });
      const haloRing = new THREE.Mesh(ringGeo, ringMat);
      haloRing.rotation.x = Math.PI / 3;
      gemGroup.add(haloRing);

      gemGroup.scale.set(scale, scale, scale);
      return gemGroup;
    };

    // --- Helper: Procedural 3D Cherry Blossom (Sakura) Flower Builder ---
    const createCherryBlossomMesh = (scale = 1, petalColor = 0xf8bbd0) => {
      const blossomGroup = new THREE.Group();

      const petalMaterial = new THREE.MeshStandardMaterial({
        color: petalColor,
        roughness: 0.3,
        metalness: 0.05,
        side: THREE.DoubleSide,
      });

      // 5 Soft Rounded Cherry Blossom Petals
      const petalShape = new THREE.Shape();
      petalShape.moveTo(0, 0);
      petalShape.quadraticCurveTo(0.35, 0.4, 0.2, 0.85);
      petalShape.quadraticCurveTo(0, 1.05, -0.2, 0.85);
      petalShape.quadraticCurveTo(-0.35, 0.4, 0, 0);

      const petalGeo = new THREE.ShapeGeometry(petalShape);
      petalGeo.center();

      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const petal = new THREE.Mesh(petalGeo, petalMaterial);
        petal.position.set(Math.sin(angle) * 0.4, Math.cos(angle) * 0.4, 0);
        petal.rotation.z = -angle;
        petal.rotation.x = 0.2;
        blossomGroup.add(petal);
      }

      // Golden Center Stamens
      const centerGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const centerMat = new THREE.MeshStandardMaterial({
        color: 0xffd54f,
        emissive: 0xffb300,
        emissiveIntensity: 0.5,
        roughness: 0.3,
      });
      const centerMesh = new THREE.Mesh(centerGeo, centerMat);
      centerMesh.position.z = 0.05;
      blossomGroup.add(centerMesh);

      // Tiny Stamen Rays
      const stamenMat = new THREE.MeshStandardMaterial({ color: 0xffca28 });
      for (let j = 0; j < 8; j++) {
        const stamenAngle = (j / 8) * Math.PI * 2;
        const stamenGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 6);
        const stamen = new THREE.Mesh(stamenGeo, stamenMat);
        stamen.position.set(Math.sin(stamenAngle) * 0.18, Math.cos(stamenAngle) * 0.18, 0.12);
        stamen.rotation.z = -stamenAngle;
        stamen.rotation.x = Math.PI / 2;
        blossomGroup.add(stamen);
      }

      blossomGroup.scale.set(scale, scale, scale);
      return blossomGroup;
    };

    // --- Helper: Procedural 3D Golden Star Mesh ---
    const createStarMesh = (scale = 0.3) => {
      const starShape = new THREE.Shape();
      const points = 5;
      const outerRadius = 0.5;
      const innerRadius = 0.22;

      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) starShape.moveTo(px, py);
        else starShape.lineTo(px, py);
      }

      const extrudeSettings = { depth: 0.12, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03 };
      const geometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
      geometry.center();

      const mat = new THREE.MeshStandardMaterial({
        color: 0xffd54f,
        emissive: 0xffb300,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.2,
      });

      const mesh = new THREE.Mesh(geometry, mat);
      mesh.scale.set(scale, scale, scale);
      return mesh;
    };

    // --- Build Central Enchanted Glowing Crystal Heart & Cherry Blossom Centerpiece ---
    const buildCenterpiece = () => {
      while (bouquetGroup.children.length > 0) {
        bouquetGroup.remove(bouquetGroup.children[0]);
      }

      // 1. Central Glowing Crystal Heart Gem
      const crystalGem = createCrystalHeartGem(1.8);
      crystalGem.position.set(0, 0.3, 0);
      bouquetGroup.add(crystalGem);

      // 2. Surrounding Blooming Soft Pink Cherry Blossoms
      const blossom1 = createCherryBlossomMesh(1.2, 0xf8bbd0);
      blossom1.position.set(-1.8, -0.6, 0.3);
      blossom1.rotation.set(0.2, 0.4, -0.3);
      bouquetGroup.add(blossom1);

      const blossom2 = createCherryBlossomMesh(1.25, 0xf48fb1);
      blossom2.position.set(1.8, -0.5, 0.2);
      blossom2.rotation.set(0.15, -0.4, 0.2);
      bouquetGroup.add(blossom2);

      const blossom3 = createCherryBlossomMesh(1.0, 0xffcdd2);
      blossom3.position.set(0, -1.2, 0.4);
      blossom3.rotation.set(-0.3, 0, 0);
      bouquetGroup.add(blossom3);

      const blossom4 = createCherryBlossomMesh(0.9, 0xfce4ec);
      blossom4.position.set(-1.2, 1.4, -0.3);
      blossom4.rotation.set(-0.2, 0.2, -0.1);
      bouquetGroup.add(blossom4);

      const blossom5 = createCherryBlossomMesh(0.95, 0xf8bbd0);
      blossom5.position.set(1.3, 1.3, -0.2);
      blossom5.rotation.set(-0.2, -0.2, 0.1);
      bouquetGroup.add(blossom5);

      // 3. Floating Golden Stars surrounding the Centerpiece
      const star1 = createStarMesh(0.5);
      star1.position.set(-2.4, 0.8, 0.6);
      star1.rotation.set(0.2, 0.3, 0.4);
      bouquetGroup.add(star1);

      const star2 = createStarMesh(0.45);
      star2.position.set(2.4, 0.9, 0.5);
      star2.rotation.set(-0.2, -0.3, -0.4);
      bouquetGroup.add(star2);

      const star3 = createStarMesh(0.35);
      star3.position.set(0, 2.1, 0.2);
      bouquetGroup.add(star3);
    };

    if (roseModelUrl && roseModelUrl.trim() !== '') {
      const loader = new GLTFLoader();
      loader.load(
        roseModelUrl,
        (gltf) => {
          while (bouquetGroup.children.length > 0) {
            bouquetGroup.remove(bouquetGroup.children[0]);
          }
          const model = gltf.scene;
          model.scale.set(1.8, 1.8, 1.8);
          model.position.set(0, -1, 0);
          bouquetGroup.add(model);
        },
        undefined,
        () => buildCenterpiece()
      );
    } else {
      buildCenterpiece();
    }

    // --- Floating Background Red Hearts & Petals Particles ---
    const heartsList: {
      mesh: THREE.Mesh;
      speedY: number;
      speedRotate: number;
      initialX: number;
      amplitudeX: number;
      timeOffset: number;
    }[] = [];

    const heartColors = [0xb71c1c, 0xc2185b, 0xd32f2f, 0xe53935, 0xf48fb1];
    const isMobile = window.innerWidth < 768;
    const heartCount = isMobile ? 14 : 24;

    for (let i = 0; i < heartCount; i++) {
      const scale = 0.2 + Math.random() * 0.4;
      const color = heartColors[Math.floor(Math.random() * heartColors.length)];
      const heart = createHeartMesh(scale, color);

      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 12 - 2;

      heart.position.set(x, y, z);
      heartsGroup.add(heart);

      heartsList.push({
        mesh: heart,
        speedY: 0.008 + Math.random() * 0.012,
        speedRotate: (Math.random() - 0.5) * 0.02,
        initialX: x,
        amplitudeX: 0.3 + Math.random() * 0.6,
        timeOffset: Math.random() * Math.PI * 2,
      });
    }

    // --- Floating Soft Cherry Blossom Petals ---
    const petalGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    petalGeometry.scale(1, 0.15, 1.4);

    const petalColors = [0xf8bbd0, 0xf48fb1, 0xd81b60, 0xfce4ec];

    const petalList: { mesh: THREE.Mesh; speedY: number; rotSpeed: number }[] = [];
    const petalCount = isMobile ? 14 : 22;

    for (let i = 0; i < petalCount; i++) {
      const color = petalColors[i % petalColors.length];
      const petalMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        side: THREE.DoubleSide,
      });
      const petal = new THREE.Mesh(petalGeometry, petalMat);
      petal.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10
      );
      petal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      petalsGroup.add(petal);

      petalList.push({
        mesh: petal,
        speedY: 0.006 + Math.random() * 0.012,
        rotSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    // --- Cursor & Touch Motion Tracking ---
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        const y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        mouseRef.current.targetX = x;
        mouseRef.current.targetY = y;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // --- Phone & Responsive Resize Handler ---
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (width < 480) {
        camera.position.z = 15.5;
        bouquetGroup.position.y = -0.2;
        bouquetGroup.scale.set(0.85, 0.85, 0.85);
      } else if (width < 768) {
        camera.position.z = 14;
        bouquetGroup.position.y = -0.3;
        bouquetGroup.scale.set(0.95, 0.95, 0.95);
      } else {
        camera.position.z = 13;
        bouquetGroup.position.y = -0.4;
        bouquetGroup.scale.set(1.0, 1.0, 1.0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse tracking
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // 3D Blooming Red Rose Bouquet rotation & gentle floating oscillation
      bouquetGroup.rotation.y = Math.sin(elapsedTime * 0.6) * 0.12 + mouseRef.current.x * 0.35;
      bouquetGroup.rotation.x = Math.cos(elapsedTime * 0.5) * 0.08 - mouseRef.current.y * 0.25;
      bouquetGroup.position.y = (window.innerWidth < 480 ? -0.2 : -0.4) + Math.sin(elapsedTime * 1.4) * 0.15;

      // Animate Rising Hearts
      heartsList.forEach((item) => {
        item.mesh.position.y += item.speedY;
        item.mesh.position.x =
          item.initialX + Math.sin(elapsedTime * 1.2 + item.timeOffset) * item.amplitudeX;
        item.mesh.rotation.y += item.speedRotate;
        item.mesh.rotation.z += item.speedRotate * 0.5;

        if (item.mesh.position.y > 11) {
          item.mesh.position.y = -11;
          item.mesh.position.x = (Math.random() - 0.5) * 22;
        }
      });

      // Animate Falling Red Petals
      petalList.forEach((item) => {
        item.mesh.position.y -= item.speedY;
        item.mesh.rotation.x += item.rotSpeed;
        item.mesh.rotation.y += item.rotSpeed;

        if (item.mesh.position.y < -11) {
          item.mesh.position.y = 11;
          item.mesh.position.x = (Math.random() - 0.5) * 18;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [roseModelUrl]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out"
      style={{
        opacity: Math.max(0.35, 1 - scrollProgress * 0.65),
        filter: `blur(${Math.min(5, scrollProgress * 8)}px)`,
      }}
    />
  );
};
