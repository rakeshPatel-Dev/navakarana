import { useState, useEffect } from "react";
import { RiTimeLine } from "react-icons/ri";

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function StreamCountdown({ scheduledAt }) {
  const [diff, setDiff] = useState(null);

  useEffect(() => {
    function calc() {
      const ms = new Date(scheduledAt) - Date.now();
      if (ms <= 0) { setDiff(null); return; }
      const s = Math.floor(ms / 1000);
      setDiff({ d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [scheduledAt]);

  if (!diff) return null;

  return (
    <div className="flex items-center gap-1.5 text-[10px] text-blue-600 font-medium">
      <RiTimeLine size={11} />
      {diff.d > 0 && <span>{diff.d}d</span>}
      <span>{pad(diff.h)}:{pad(diff.m)}:{pad(diff.s)}</span>
    </div>
  );
}
