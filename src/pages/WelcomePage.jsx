import { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import { fetchQuestions } from "../services/quizApi"; 
import Card from "../components/Card";
import Button from "../components/Button";

export default function WelcomePage() {
  const { state, dispatch } = useQuiz();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartGame = async () => {
    setIsLoading(true);
    dispatch({ type: "FETCH_START" });

    try {
      const questions = await fetchQuestions();
      dispatch({ type: "START_GAME_WITH_DATA", payload: questions });
    } catch (error) {
      dispatch({ type: "DATA_FAILED", payload: "Gagal mengambil soal. Cek koneksi internet." });
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="max-w-md text-center">
        
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          👋
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Halo, <span className="text-indigo-600">{state.username}</span>!
        </h1>
        <p className="text-slate-500 mb-6">
          Sudah siap menguji pengetahuanmu?
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-3 mb-8">
          <h3 className="font-bold text-slate-700 border-b border-slate-200 pb-2 mb-2">
            📋 Ketentuan Kuis:
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
             <li className="flex items-start gap-3">
                <span className="bg-indigo-100 text-indigo-700 font-bold w-5 h-5 flex items-center justify-center rounded-full text-xs mt-0.5">1</span>
                <span>Terdiri dari <strong>10 soal</strong> acak.</span>
             </li>
             <li className="flex items-start gap-3">
                <span className="bg-indigo-100 text-indigo-700 font-bold w-5 h-5 flex items-center justify-center rounded-full text-xs mt-0.5">2</span>
                <span>Waktu pengerjaan <strong>60 detik</strong> total.</span>
             </li>
             <li className="flex items-start gap-3">
                <span className="bg-indigo-100 text-indigo-700 font-bold w-5 h-5 flex items-center justify-center rounded-full text-xs mt-0.5">3</span>
                <span>Setelah memilih jawaban akan diarahkan ke soal selanjutnya.</span>
             </li>
             <li className="flex items-start gap-3">
                <span className="bg-indigo-100 text-indigo-700 font-bold w-5 h-5 flex items-center justify-center rounded-full text-xs mt-0.5">4</span>
                <span>Waktu habis = Kuis selesai otomatis.</span>
             </li>
          </ul>
        </div>

        <Button onClick={handleStartGame} disabled={isLoading}>
          {isLoading ? "Menyiapkan Soal..." : "Mulai Mengerjakan"}
        </Button>

      </Card>
    </div>
  );
}