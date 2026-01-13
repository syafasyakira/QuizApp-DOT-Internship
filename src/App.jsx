import { QuizProvider, useQuiz } from "./context/QuizContext";
import LoginPage from "./pages/LoginPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import ReviewPage from "./pages/ReviewPage";
import WelcomePage from "./pages/WelcomePage"; 

function QuizApp() {
  const { state } = useQuiz();

  return (
    <div className="font-sans text-slate-800 antialiased">
      
      {state.status === "idle" && <LoginPage />}

      {state.status === "loading" && (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
          <h2 className="text-xl font-semibold text-slate-700">Menyiapkan Soal...</h2>
        </div>
      )}

      {state.status === "error" && (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
            <h3 className="text-lg font-bold text-red-500 mb-2">Terjadi Kesalahan</h3>
            <p className="text-slate-600 mb-6">{state.error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      )}

      {state.status === "ready" && <WelcomePage />}

      {state.status === "active" && <QuizPage />}

      {state.status === "finished" && <ResultPage />}

      {state.status === "review" && <ReviewPage />}

    </div>
  );
}

export default function App() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}