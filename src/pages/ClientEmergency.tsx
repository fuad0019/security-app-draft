import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Point { x: number; y: number }

// Generate a pseudo city street background using canvas-less CSS.
// We animate a guard icon moving toward the client icon.
export default function EmergencyConfirmationUI() {
  const [progress, setProgress] = useState(0); // 0 -> 1

  useEffect(() => {
    const start = performance.now();
    const duration = 18000; // 18s to arrive
    let frame: number;
    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Define path waypoints (guard travels along polyline toward center).
  const path: Point[] = [
    { x: 12, y: 82 },
    { x: 22, y: 68 },
    { x: 35, y: 60 },
    { x: 50, y: 55 },
    { x: 64, y: 48 },
    { x: 74, y: 38 },
    { x: 82, y: 28 },
    { x: 88, y: 18 },
    { x: 92, y: 10 }, // near client (top-right like vantage)
  ];

  // Robust interpolation along path with defensive guards
  let guardX = path[0].x;
  let guardY = path[0].y;
  if (path.length >= 2) {
    const totalSegments = path.length - 1;
    const t = Math.min(Math.max(progress, 0), 1);
    const distance = t * totalSegments;
    const i = Math.min(Math.floor(distance), totalSegments - 1);
    const nextIndex = Math.min(i + 1, totalSegments);
    const localT = distance - i;
    const a = path[i];
    const b = path[nextIndex] || a;
    // If arrived, snap to final point explicitly
    if (t >= 1) {
      guardX = path[totalSegments].x;
      guardY = path[totalSegments].y;
    } else if (a && b) {
      guardX = a.x + (b.x - a.x) * localT;
      guardY = a.y + (b.y - a.y) * localT;
    }
  }

  return (
    <div className="emergency-page">
      <h1 className="alarm-title" style={{ marginBottom: 24 }}>Help Is on the Way</h1>
      <p style={{ maxWidth: 520, marginBottom: 24, fontSize: 16, color: '#374151' }}>
        A security guard is navigating through the city to reach you. Hold tight – they are getting closer.
      </p>

      <div className="city-map">
        {/* City grid background layers */}
        <div className="city-grid" />
        <div className="city-grid-overlay" />

        {/* Client marker (fixed) */}
        <motion.div
          className="marker marker-client"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          style={{ left: '88%', top: '10%' }}
        >
          <span className="marker-label">You</span>
        </motion.div>

        {/* Guard marker moving along path */}
        <motion.div
          className="marker marker-guard"
          animate={{ left: `${guardX}%`, top: `${guardY}%` }}
          transition={{ type: 'tween', ease: 'linear', duration: 0 }}
        >
          <span className="marker-label">Guard</span>
          <div className="pulse" />
        </motion.div>

        {/* Path visualization */}
        <svg className="path" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={path.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={1.6}
            strokeDasharray="4 3"
          />
          <AnimatePresence>
            {progress < 1 && (
              <motion.circle
                key="progress-dot"
                cx={guardX}
                cy={guardY}
                r={2.8}
                fill="#2563eb"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </svg>
      </div>

      <div className="emergency-footer" style={{ marginTop: 24 }}>
        <div>
          <p style={{ fontWeight: 600 }}>Guard Smith</p>
          <p style={{ fontSize: 13, color: '#6b7280' }}>{progress < 1 ? 'En‑route through city' : 'Arrived nearby'}</p>
        </div>
        <button className="btn-primary" style={{ marginTop: 0 }}>Call</button>
      </div>
    </div>
  );
}
