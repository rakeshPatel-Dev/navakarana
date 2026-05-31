import { RiLiveLine } from "react-icons/ri";

export default function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-3">
      <span className="w-12 h-12 rounded-2xl bg-brand flex items-center justify-center text-white animate-pulse">
        <RiLiveLine size={24} />
      </span>
      <p className="text-sm text-stone-400 font-medium">Loading…</p>
    </div>
  );
}
