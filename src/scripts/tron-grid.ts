// Tron Grid Light Bikes Effect
export function initTronGrid() {
  const canvas = document.getElementById('tron-grid') as HTMLCanvasElement;
  const ctx = canvas?.getContext('2d');

  if (!ctx || !canvas) return;

  const GRID_SIZE = 50; // Same as CSS grid
  const TRAIL_LENGTH = 8; // 8 squares
  const BIKE_SPEED = 2; // pixels per frame
  const NUM_BIKES = 4; // Number of bikes

  interface Point {
    x: number;
    y: number;
    age: number;
  }

  interface Bike {
    x: number;
    y: number;
    direction: 'horizontal' | 'vertical';
    trail: Point[];
    color: string;
    glowColor: string;
    speed: number;
  }

  let bikes: Bike[] = [];

  // Setup canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Create a new bike at a random grid line
  function createBike(): Bike {
    const isHorizontal = Math.random() > 0.5;
    const colors = [
      { color: 'rgba(0, 217, 255, 0.8)', glow: 'rgba(0, 217, 255, 0.4)' },
      { color: 'rgba(255, 107, 53, 0.8)', glow: 'rgba(255, 107, 53, 0.4)' }
    ];
    const colorSet = colors[Math.floor(Math.random() * colors.length)];

    if (isHorizontal) {
      // Start from left or right edge
      const fromLeft = Math.random() > 0.5;
      const gridY = Math.floor(Math.random() * (canvas.height / GRID_SIZE)) * GRID_SIZE;

      return {
        x: fromLeft ? 0 : canvas.width,
        y: gridY,
        direction: 'horizontal',
        trail: [],
        color: colorSet.color,
        glowColor: colorSet.glow,
        speed: fromLeft ? BIKE_SPEED : -BIKE_SPEED
      };
    } else {
      // Start from top or bottom edge
      const fromTop = Math.random() > 0.5;
      const gridX = Math.floor(Math.random() * (canvas.width / GRID_SIZE)) * GRID_SIZE;

      return {
        x: gridX,
        y: fromTop ? 0 : canvas.height,
        direction: 'vertical',
        trail: [],
        color: colorSet.color,
        glowColor: colorSet.glow,
        speed: fromTop ? BIKE_SPEED : -BIKE_SPEED
      };
    }
  }

  // Initialize bikes
  function initBikes() {
    bikes = [];
    for (let i = 0; i < NUM_BIKES; i++) {
      bikes.push(createBike());
    }
  }

  // Update bike position and trail
  function updateBike(bike: Bike) {
    // Add current position to trail
    bike.trail.push({ x: bike.x, y: bike.y, age: 0 });

    // Age all trail points
    bike.trail.forEach(point => point.age++);

    // Remove old trail points (beyond 8 squares)
    const maxAge = (TRAIL_LENGTH * GRID_SIZE) / Math.abs(bike.speed);
    bike.trail = bike.trail.filter(point => point.age <= maxAge);

    // Move bike
    if (bike.direction === 'horizontal') {
      bike.x += bike.speed;
    } else {
      bike.y += bike.speed;
    }
  }

  // Check if bike is out of bounds
  function isBikeOutOfBounds(bike: Bike): boolean {
    return bike.x < -GRID_SIZE ||
           bike.x > canvas.width + GRID_SIZE ||
           bike.y < -GRID_SIZE ||
           bike.y > canvas.height + GRID_SIZE;
  }

  // Draw bike trail with fade effect
  function drawTrail(bike: Bike) {
    if (!ctx || bike.trail.length < 2) return;

    const maxAge = (TRAIL_LENGTH * GRID_SIZE) / Math.abs(bike.speed);

    for (let i = 1; i < bike.trail.length; i++) {
      const point = bike.trail[i];
      const prevPoint = bike.trail[i - 1];

      // Calculate opacity based on age (newer = more opaque)
      const lifeProgress = 1 - (point.age / maxAge);
      const opacity = lifeProgress * 0.9;

      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);

      // Main line
      ctx.strokeStyle = bike.color.replace(/[\d.]+\)$/, `${opacity})`);
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glow effect
      ctx.shadowBlur = 15 * lifeProgress;
      ctx.shadowColor = bike.glowColor;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  // Animation loop
  function animate() {
    if (!ctx) return;

    // Clear canvas completely (transparent)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw bikes
    bikes.forEach((bike, index) => {
      updateBike(bike);
      drawTrail(bike);

      // Replace bike if out of bounds
      if (isBikeOutOfBounds(bike)) {
        bikes[index] = createBike();
      }
    });

    requestAnimationFrame(animate);
  }

  // Handle resize
  window.addEventListener('resize', () => {
    resizeCanvas();
    initBikes();
  });

  // Start animation
  resizeCanvas();
  initBikes();
  animate();
}
