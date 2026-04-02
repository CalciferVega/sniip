<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let animationFrame: number;

  let mouse = { x: 0, y: 0 };
  let lerpMouse = { x: 0, y: 0 };
  let isMouseIn = false;

  const spacing = 24; // Closer spacing
  const baseSize = 0.8; // Smaller base size for higher density
  const maxGrow = 2.5; // Scale up on hover
  const effectRadius = 160; // Influence radius

  interface Dot {
    originX: number;
    originY: number;
    x: number;
    y: number;
  }

  let dots: Dot[] = [];

  function init() {
    if (!canvas) return;
    dots = [];
    const cols = Math.ceil(canvas.width / spacing) + 1;
    const rows = Math.ceil(canvas.height / spacing) + 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * spacing,
          y: j * spacing,
          originX: i * spacing,
          originY: j * spacing
        });
      }
    }
  }

  function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Smooth lerp for mouse
    lerpMouse.x += (mouse.x - lerpMouse.x) * 0.12;
    lerpMouse.y += (mouse.y - lerpMouse.y) * 0.12;

    const w = canvas.width;
    const h = canvas.height;

    dots.forEach((dot) => {
      const dx = lerpMouse.x - dot.originX;
      const dy = lerpMouse.y - dot.originY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Edge fading: dots closer to the canvas edges become transparent
      const edgePadding = 150;
      const edgeAlphaX = Math.min(dot.originX / edgePadding, (w - dot.originX) / edgePadding, 1);
      const edgeAlphaY = Math.min(dot.originY / edgePadding, (h - dot.originY) / edgePadding, 1);
      const edgeAlpha = Math.max(0, edgeAlphaX * edgeAlphaY);

      let targetSize = baseSize;
      let targetOpacity = 0.12 * edgeAlpha; // Very subtle base opacity

      if (distance < effectRadius && isMouseIn) {
        const factor = 1 - distance / effectRadius;
        // Ease-out effect for growth
        const easeFactor = Math.sin(factor * Math.PI / 2);
        
        targetSize = baseSize + maxGrow * easeFactor;
        targetOpacity = (0.12 + 0.4 * easeFactor) * edgeAlpha;
        
        // Subtle magnetic pull
        dot.x = dot.originX + (dx / distance) * (easeFactor * 8);
        dot.y = dot.originY + (dy / distance) * (easeFactor * 8);
      } else {
        dot.x = dot.originX;
        dot.y = dot.originY;
      }

      if (targetOpacity > 0.01) {
        ctx!.globalAlpha = targetOpacity;
        // Color based on distance from mouse
        const hue = 220; // Brand blue
        const saturation = isMouseIn ? Math.floor(40 + 60 * (1 - Math.min(distance / effectRadius, 1))) : 40;
        ctx!.fillStyle = `hsl(${hue}, ${saturation}%, 60%)`;
        
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, targetSize, 0, Math.PI * 2);
        ctx!.fill();
      }
    });

    animationFrame = requestAnimationFrame(animate);
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 800;
      init();
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      if (mouse.x >= 0 && mouse.x <= canvas.width && mouse.y >= 0 && mouse.y <= canvas.height) {
        isMouseIn = true;
      } else {
        isMouseIn = false;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleWindowMouseMove);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="absolute inset-0 w-full h-full pointer-events-none opacity-80"
></canvas>
