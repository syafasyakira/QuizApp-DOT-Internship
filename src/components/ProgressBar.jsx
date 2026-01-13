export default function ProgressBar({ current, total }) {
  const progress = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6 overflow-hidden">
      <div 
        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}