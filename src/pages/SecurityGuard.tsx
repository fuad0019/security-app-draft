import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Level = "high" | "medium" | "low";

interface RequestItem {
  id: number;
  location: string;
  address: string;
  time: string;
  level: Level;
  details: string;
}

export default function SecurityGuardUI() {
  const [requests, setRequests] = useState<RequestItem[]>([
    {
      id: 1,
      location: "Front Entrance",
      address: "Building A, North Wing",
      time: "10:32 AM",
      level: "high",
      details: "Person pressed emergency button. Situation unknown.",
    },
    {
      id: 2,
      location: "Lobby",
      address: "Main Hall, Level 1",
      time: "9:18 AM",
      level: "medium",
      details: "Staff requested urgent assistance.",
    },
    {
      id: 3,
      location: "Parking Lot",
      address: "Garage Level -1, Section C",
      time: "8:57 AM",
      level: "low",
      details: "Minor help requested.",
    },
  ]);

  const [expanded, setExpanded] = useState<number | null>(null);

  const takeRequest = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const levelColors: Record<Level, string> = {
    high: "chip-high",
    medium: "chip-medium",
    low: "chip-low",
  };

  return (
    <div className="guard-page">
          <div className="guard-inner">
        <h1 className="guard-header">Security Requests</h1>
        <div className="request-list">
        {requests.map((req) => (
          <div key={req.id} className="request-card">
            <div
              className="request-row"
              role="button"
              onClick={() => setExpanded(expanded === req.id ? null : req.id)}
            >
              <div className="left">
                <p className="addr">{req.location}</p>
              </div>
              <div className="right-info">
                <span className={`chip ${levelColors[req.level]}`}>
                  {req.level === "high" ? "High" : req.level === "medium" ? "Medium" : "Low"}
                </span>
                <span className="ts">{req.time}</span>
              </div>
            </div>

            <AnimatePresence>
              {expanded === req.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="expand"
                >
                  <div className="expand-body">
                    <p><strong>Address:</strong> {req.address}</p>
                    <p style={{ marginTop: 6 }}><strong>Details:</strong> {req.details}</p>
                    <button className="btn-primary" onClick={() => takeRequest(req.id)}>Take Request</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
