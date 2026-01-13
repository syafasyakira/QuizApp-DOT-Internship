import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

export default function Timer() {
  const { state, dispatch } = useQuiz();
  const { secondsRemaining } = state;

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${mins < 10 ? "0" : ""}${mins}:${seconds < 10 ? "0" : ""}${seconds}`;

  useEffect(() => {
    if (state.status !== "active" || secondsRemaining <= 0) return;
    const id = setInterval(() => dispatch({ type: "TICK" }), 1000);
    return () => clearInterval(id);
  }, [state.status, secondsRemaining, dispatch]);

  let colorClass = "text-slate-700 bg-slate-100"; 
  if (secondsRemaining < 30) colorClass = "text-amber-700 bg-amber-100"; 
  if (secondsRemaining < 10) colorClass = "text-rose-700 bg-rose-100 animate-pulse"; 

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-md font-mono text-sm font-bold transition-colors duration-300 ${colorClass}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{formattedTime}</span>
    </div>
  );
}