import { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { fetchQuestions } from "../services/quizApi"; 
import Card from "../components/Card";
import Button from "../components/Button";

export default function ResultPage() {
  const { state, dispatch } = useQuiz();
  const [isLoading, setIsLoading] = useState(false);

  const totalQuestions = state.questions.length;
  const correctCount = state.score;
  const wrongCount = totalQuestions - correctCount;
  const finalScore = Math.round((correctCount / totalQuestions) * 100);

  let feedbackMessage = "Bagus!";
  let feedbackColor = "text-indigo-600";
  let circleColor = "border-indigo-100 bg-indigo-50 text-indigo-700";
  
  if (finalScore === 100) {
    feedbackMessage = "Sempurna! 🏆";
    feedbackColor = "text-emerald-600";
    circleColor = "border-emerald-100 bg-emerald-50 text-emerald-600";
  } else if (finalScore >= 80) {
    feedbackMessage = "Luar Biasa!";
    feedbackColor = "text-emerald-600";
    circleColor = "border-emerald-100 bg-emerald-50 text-emerald-600";
  } else if (finalScore < 50) {
    feedbackMessage = "Jangan Menyerah!";
    feedbackColor = "text-rose-500";
    circleColor = "border-rose-100 bg-rose-50 text-rose-600";
  }

  const handlePlayAgain = async () => {
    setIsLoading(true);
    
    dispatch({ type: "FETCH_START" });

    try {
      const questions = await fetchQuestions();
      
      dispatch({ type: "START_GAME_WITH_DATA", payload: questions });
      
    } catch (error) {
      dispatch({ type: "DATA_FAILED", payload: "Gagal mengambil soal baru." });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="text-center max-w-lg">
        
        <div className="mb-6">
          <p className="text-slate-500 font-medium uppercase tracking-wider text-xs mb-2">Quiz Selesai</p>
          <h1 className={`text-3xl font-extrabold ${feedbackColor}`}>
            {feedbackMessage}
          </h1>
        </div>

        <div className="flex justify-center mb-8">
          <div className={`w-40 h-40 rounded-full border-[10px] flex flex-col items-center justify-center shadow-sm ${circleColor}`}>
            <span className="text-6xl font-extrabold tracking-tighter">
              {finalScore}
            </span>
            <span className="text-slate-500/80 text-xs font-bold uppercase mt-1">Nilai Akhir</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-slate-800 font-bold text-lg">{totalQuestions}</p>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wide">Total Soal</p>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-emerald-600 font-bold text-lg">{correctCount}</p>
            <p className="text-emerald-600/80 text-[10px] uppercase font-bold tracking-wide">Benar</p>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
            <p className="text-rose-600 font-bold text-lg">{wrongCount}</p>
            <p className="text-rose-600/80 text-[10px] uppercase font-bold tracking-wide">Salah</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={handlePlayAgain} disabled={isLoading}>
            {isLoading ? "Menyiapkan Soal..." : "Main Lagi"}
          </Button>
          
          <button 
            onClick={() => dispatch({ type: "REVIEW_QUIZ" })}
            className="w-full py-3 px-4 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-colors border border-slate-200"
          >
            Review Jawaban
          </button>

          <button 
            onClick={() => dispatch({ type: "LOGOUT" })}
            className="text-sm text-slate-400 hover:text-red-500 mt-2 font-medium transition-colors"
          >
            Keluar / Ganti Akun
          </button>
        </div>

      </Card>
    </div>
  );
}