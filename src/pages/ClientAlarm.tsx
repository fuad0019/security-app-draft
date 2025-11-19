import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type AlarmButton = {
  label: string;
  color: string;
  description: string;
};

export default function AlarmUI() {
  const buttons: AlarmButton[] = [
    { label: "Emergency", color: "bg-red-600", description: "Highest priority alert requiring immediate response." },
    { label: "Security Needed", color: "bg-orange-500", description: "Medium-level alert requesting a security guard." },
    { label: "Help", color: "bg-yellow-400", description: "Low-level assistance request." },
  ];

  const [pressed, setPressed] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePress = (label: string) => {
    setPressed(label);
    navigate("/client/emergency", { state: { alarm: label } });
  };

  return (
    <div className="alarm-page">
      <h1 className="alarm-title">Alarm Panel</h1>
      <div className="alarm-buttons">
        {buttons.map((btn, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePress(btn.label)}
            className={`alarm-btn ${btn.label === 'Emergency' ? 'alarm-red' : btn.label === 'Security Needed' ? 'alarm-orange' : 'alarm-yellow'}`}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
      {pressed && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="alarm-pressed">
          <p>You pressed:</p>
          <p>{pressed}</p>
        </motion.div>
      )}
    </div>
  );
}
