import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/*
 * Notebook 3D. As cores vêm de src/styles/theme.css.
 * A tampa abre e fecha conforme a prop "open".
 * O site ao vivo é exibido por uma camada HTML posicionada sobre a tela,
 * usando a projeção da tela 3D (onScreenRect).
 */

const CLOSED_ANGLE = Math.PI / 2;
const OPEN_ANGLE = -0.35;
const SCREEN_SIZE = { w: 2.44, h: 1.56, y: 0.87, z: 0.04 };
const SCREEN_CORNERS = [
  [-SCREEN_SIZE.w / 2, SCREEN_SIZE.y - SCREEN_SIZE.h / 2, SCREEN_SIZE.z],
  [SCREEN_SIZE.w / 2, SCREEN_SIZE.y - SCREEN_SIZE.h / 2, SCREEN_SIZE.z],
  [-SCREEN_SIZE.w / 2, SCREEN_SIZE.y + SCREEN_SIZE.h / 2, SCREEN_SIZE.z],
  [SCREEN_SIZE.w / 2, SCREEN_SIZE.y + SCREEN_SIZE.h / 2, SCREEN_SIZE.z],
];

// Layout do teclado (de cima para baixo: números, QWERTY, ASDF, ZXCV e barra de espaço)
const KEY_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const SCREEN_CANVAS = { w: 1400, h: 880 };
const KEYBOARD_CANVAS = { w: 1680, h: 640 };
const KEYBOARD_PLANE = { w: 2.36, d: 0.9, y: -0.437, z: 0.12 };

const projected = new THREE.Vector3();

function readTheme() {
  const styles = getComputedStyle(document.documentElement);
  const rgb = (name) => `rgb(${styles.getPropertyValue(name).trim().split(/\s+/).join(', ')})`;
  return {
    bg: rgb('--color-bg'),
    primary: rgb('--color-primary'),
    secondary: rgb('--color-secondary'),
    text: rgb('--color-text'),
  };
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* Tela de apresentação exibida por baixo do site ao vivo. */
function drawScreen(ctx, w, h, theme) {
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = theme.text;
  ctx.font = '900 210px Archivo, Arial, sans-serif';
  ctx.fillText('AKA', 56, 390);
  ctx.fillStyle = theme.primary;
  ctx.font = '900 118px Archivo, Arial, sans-serif';
  ctx.fillText('DIGITAL', 56, 520);
  roundRect(ctx, 56, 620, 400, 120, 28);
  ctx.strokeStyle = theme.secondary;
  ctx.lineWidth = 4;
  ctx.stroke();
}

/* Teclado desenhado com teclas arredondadas e letras legíveis. */
function drawKeyboard(ctx, w, h, theme) {
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, w, h);

  const margin = 30;
  const gap = 14;
  const rowCount = KEY_ROWS.length + 1; // + barra de espaço
  const rowH = (h - margin * 2 - gap * (rowCount - 1)) / rowCount;
  const unit = (w - margin * 2 - gap * 9) / 10;

  const drawKey = (x, y, width, label) => {
    roundRect(ctx, x, y, width, rowH, 18);
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.lineWidth = 3;
    ctx.stroke();
    if (label) {
      ctx.fillStyle = theme.text;
      ctx.font = '600 44px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, x + width / 2, y + rowH / 2);
    }
  };

  KEY_ROWS.forEach((row, rowIndex) => {
    const count = row.length;
    const rowWidth = count * unit + (count - 1) * gap;
    const startX = (w - rowWidth) / 2;
    const y = margin + rowIndex * (rowH + gap);
    row.forEach((label, i) => drawKey(startX + i * (unit + gap), y, unit, label));
  });

  const spaceWidth = unit * 6 + gap * 5;
  drawKey((w - spaceWidth) / 2, margin + KEY_ROWS.length * (rowH + gap), spaceWidth, '');
}

function useCanvasTexture(theme, size, draw) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = size.w;
    canvas.height = size.h;
    const ctx = canvas.getContext('2d');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const redraw = () => {
      draw(ctx, canvas.width, canvas.height, theme);
      texture.needsUpdate = true;
    };
    redraw();
    document.fonts?.ready.then(redraw);
    return texture;
  }, [theme, size, draw]);
}

function Laptop({ open, onToggle, onScreenRect }) {
  const theme = useMemo(readTheme, []);
  const screen = useCanvasTexture(theme, SCREEN_CANVAS, drawScreen);
  const keyboard = useCanvasTexture(theme, KEYBOARD_CANVAS, drawKeyboard);
  const root = useRef(null);
  const lid = useRef(null);
  const progress = useRef(0);

  useEffect(() => () => {
    screen.dispose();
    keyboard.dispose();
  }, [screen, keyboard]);

  useFrame((state, delta) => {
    progress.current = THREE.MathUtils.damp(progress.current, open ? 1 : 0, 4, delta);

    if (lid.current) {
      lid.current.rotation.x = THREE.MathUtils.lerp(CLOSED_ANGLE, OPEN_ANGLE, progress.current);
    }

    // Mouse: movimento amplo com a tampa fechada, mais suave com a tela aberta
    if (root.current) {
      const amplitude = THREE.MathUtils.lerp(0.45, 0.14, progress.current);
      const { x, y } = state.pointer;
      root.current.rotation.y += (x * amplitude - root.current.rotation.y) * 0.06;
      root.current.rotation.x += ((-y * amplitude * 0.3 + 0.12) - root.current.rotation.x) * 0.06;
    }

    if (lid.current && onScreenRect) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      SCREEN_CORNERS.forEach(([x, y, z]) => {
        projected.set(x, y, z);
        lid.current.localToWorld(projected);
        projected.project(state.camera);
        const px = ((projected.x + 1) / 2) * state.size.width;
        const py = ((1 - projected.y) / 2) * state.size.height;
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
      });

      onScreenRect({
        visible: progress.current > 0.92,
        rect: { left: minX, top: minY, width: maxX - minX, height: maxY - minY },
      });
    }
  });

  const body = (
    <meshPhysicalMaterial color={theme.primary} metalness={0.35} roughness={0.25} clearcoat={1} clearcoatRoughness={0.1} />
  );
  const dark = <meshStandardMaterial color={theme.bg} roughness={0.6} metalness={0.2} />;
  const glow = <meshStandardMaterial color={theme.secondary} emissive={theme.secondary} emissiveIntensity={2.2} toneMapped={false} />;

  const cursor = {
    onPointerOver: () => { document.body.style.cursor = 'pointer'; },
    onPointerOut: () => { document.body.style.cursor = ''; },
  };
  const handleClick = (event) => {
    event.stopPropagation();
    onToggle();
  };

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.45}>
      <group ref={root} position={[0, 0.05, 0]}>
        {/* Base (clique para abrir ou fechar) */}
        <RoundedBox args={[2.6, 0.1, 1.75]} radius={0.05} smoothness={4} position={[0, -0.5, 0]} onClick={handleClick} {...cursor}>
          {body}
        </RoundedBox>

        {/* Corpo escuro do teclado */}
        <RoundedBox args={[2.36, 0.012, 1.05]} radius={0.02} smoothness={2} position={[0, -0.444, 0.18]}>
          {dark}
        </RoundedBox>

        {/* Teclado com as letras, desenhado em textura */}
        <mesh position={[0, KEYBOARD_PLANE.y, KEYBOARD_PLANE.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[KEYBOARD_PLANE.w, KEYBOARD_PLANE.d]} />
          <meshBasicMaterial map={keyboard} toneMapped={false} transparent />
        </mesh>

        {/* Touchpad */}
        <RoundedBox args={[0.7, 0.014, 0.24]} radius={0.04} smoothness={2} position={[0, -0.44, 0.7]}>
          {dark}
        </RoundedBox>

        {/* Linha de luz na borda frontal da base */}
        <mesh position={[0, -0.45, 0.88]}>
          <boxGeometry args={[2.5, 0.02, 0.02]} />
          {glow}
        </mesh>

        {/* Tampa: gira a partir da dobradiça */}
        <group ref={lid} position={[0, -0.42, -0.87]} rotation={[CLOSED_ANGLE, 0, 0]}>
          <RoundedBox args={[2.6, 1.75, 0.07]} radius={0.05} smoothness={4} position={[0, 0.87, 0]} onClick={handleClick} {...cursor}>
            {body}
          </RoundedBox>

          <mesh position={[0, SCREEN_SIZE.y, SCREEN_SIZE.z]}>
            <planeGeometry args={[SCREEN_SIZE.w, SCREEN_SIZE.h]} />
            <meshBasicMaterial map={screen} toneMapped={false} />
          </mesh>

          <mesh position={[0, 1.76, 0]}>
            <boxGeometry args={[2.5, 0.02, 0.02]} />
            {glow}
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default function LaptopScene({ open = false, onToggle = () => {}, onScreenRect }) {
  const theme = useMemo(readTheme, []);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.6, 6.6], fov: 34 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-3, 1, 3]} color={theme.primary} intensity={6} />
      <pointLight position={[3, -1, 2]} color={theme.secondary} intensity={3} />
      <spotLight position={[0, 4, -2]} angle={0.6} penumbra={1} intensity={2} color={theme.primary} />
      <Laptop open={open} onToggle={onToggle} onScreenRect={onScreenRect} />
      <ContactShadows position={[0, -1.15, 0]} opacity={0.6} scale={6} blur={2.6} far={3} color="#000000" />
    </Canvas>
  );
}
