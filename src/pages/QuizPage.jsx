import { useQuiz } from "../context/QuizContext";
import Card from "../components/Card";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";

export default function QuizPage() {
  const { state, dispatch } = useQuiz();
  
  const currentQuestion = state.questions[state.currentIndex];
  const totalQuestions = state.questions.length;

  const handleAnswer = (answer) => {
    dispatch({ type: "ANSWER_QUESTION", payload: answer });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="max-w-xl w-full">
        
        <div className="mb-4">
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">
              Soal {state.currentIndex + 1} <span className="font-normal text-slate-400">/ {totalQuestions}</span>
            </span>
            
            <Timer />
          </div>

          <ProgressBar current={state.currentIndex} total={totalQuestions} />
          
        </div>

        <div className="mt-4 mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-200 group flex items-start"
            >
              <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full text-sm font-bold mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors mt-0.5">
                  {String.fromCharCode(65 + index)}
              </span>
              <span className="text-slate-700 font-medium group-hover:text-indigo-700 leading-relaxed">
                  {option}
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}