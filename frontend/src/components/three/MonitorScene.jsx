import { useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* Desenha a interface exibida na tela do monitor (preto, branco e verde-limão). */
function drawScreen(ctx, w, h) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, w, h);

  // Barra de navegação
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 40px Archivo, Arial, sans-serif';
  ctx.fillText('AKA', 56, 92);
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '500 26px Inter, Arial, sans-serif';
  ['Serviços', 'Portfólio', 'Sobre', 'Contato'].forEach((label, i) => ctx.fillText(label, 360 + i * 190, 88));

  roundRect(ctx, w - 280, 42, 220, 62, 31);
  ctx.fillStyle = '#CBF615';
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = '700 22px Inter, Arial, sans-serif';
  ctx.fillText('ORÇAMENTO', w - 240, 82);

  // Título
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 210px Archivo, Arial, sans-serif';
  ctx.fillText('AKA', 56, 390);
  ctx.fillStyle = '#CBF615';
  ctx.font = '900 118px Archivo, Arial, sans-serif';
  ctx.fillText('DIGITAL', 56, 520);

  // Cards
  for (let i = 0; i < 3; i += 1) {
    const x = 56 + i * 440;
    roundRect(ctx, x, 620, 400, 190, 28);
    ctx.strokeStyle = i === 1 ? '#CBF615' : 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + 44, 668, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#CBF615';
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillRect(x + 44, 720, 280, 14);
    ctx.fillRect(x + 44, 752, 200, 14);
  }
}

function useScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1400;
    canvas.height = 880;
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const redraw = () => {
      drawScreen(ctx, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };
    redraw();
    document.fonts?.ready.then(redraw);
    return texture;
  }, []);
}

function Monitor() {
  const group = useMemo(() => ({ current: null }), []);
  const screen = useScreenTexture();

  useEffect(() => () => screen.dispose(), [screen]);

  useFrame((state) => {
    const target = group.current;
    if (!target) return;
    const { x, y } = state.pointer;
    target.rotation.y += (x * 0.35 - target.rotation.y) * 0.05;
    target.rotation.x += (-y * 0.15 - target.rotation.x) * 0.05;
  });

  const limeMaterial = (
    <meshPhysicalMaterial color="#CBF615" roughness={0.22} metalness={0.05} clearcoat={1} clearcoatRoughness={0.12} />
  );

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={(node) => { group.current = node; }}>
        {/* Corpo do monitor */}
        <RoundedBox args={[2.5, 1.7, 0.14]} radius={0.14} smoothness={6} position={[0, 0.35, 0]}>
          {limeMaterial}
        </RoundedBox>

        {/* Moldura preta e tela */}
        <RoundedBox args={[2.36, 1.56, 0.03]} radius={0.1} smoothness={4} position={[0, 0.35, 0.08]}>
          <meshStandardMaterial color="#050505" roughness={0.5} />
        </RoundedBox>
        <mesh position={[0, 0.35, 0.105]}>
          <planeGeometry args={[2.16, 1.36]} />
          <meshBasicMaterial map={screen} toneMapped={false} />
        </mesh>

        {/* Pescoço e base */}
        <RoundedBox args={[0.26, 0.6, 0.1]} radius={0.05} smoothness={4} position={[0, -0.6, -0.04]}>
          {limeMaterial}
        </RoundedBox>
        <RoundedBox args={[1.2, 0.12, 0.6]} radius={0.06} smoothness={4} position={[0, -0.98, 0.02]}>
          {limeMaterial}
        </RoundedBox>

        {/* Arco de luz atrás do monitor */}
        <mesh position={[0, 0.35, -0.22]}>
          <torusGeometry args={[1.55, 0.035, 16, 120, Math.PI]} />
          <meshStandardMaterial color="#CBF615" emissive="#CBF615" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

export default function MonitorScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6.2], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-3, 1, 3]} color="#CBF615" intensity={6} />
      <spotLight position={[0, 4, -2]} angle={0.6} penumbra={1} intensity={2} color="#CBF615" />
      <Monitor />
      <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={6} blur={2.6} far={3} color="#000000" />
    </Canvas>
  );
}
