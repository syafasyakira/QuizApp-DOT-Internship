import { useQuiz } from "../context/QuizContext";
import Card from "../components/Card";
import Button from "../components/Button";

export default function ReviewPage() {
  const { state, dispatch } = useQuiz();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-4 z-10">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Review Jawaban</h1>
            <p className="text-sm text-slate-500">Analisis hasil kerjamu</p>
          </div>
          <button 
            onClick={() => dispatch({ type: "BACK_TO_RESULT" })}
            className="text-indigo-600 font-semibold hover:underline"
          >
            &larr; Kembali ke Skor
          </button>
        </div>

        {state.questions.map((question, index) => {
          const answerData = state.answers.find((a) => a.questionIndex === index);
          
          const isCorrect = answerData?.isCorrect;
          const userAnswer = answerData?.userAnswer;
          const isUnanswered = userAnswer === undefined;

          let borderClass = "border-slate-200"; 
          if (isCorrect) borderClass = "border-emerald-400 bg-emerald-50/30";
          else borderClass = "border-rose-300 bg-rose-50/30";

          return (
            <Card key={index} className={`w-full max-w-full !p-6 border-2 ${borderClass}`}>
              <div className="mb-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Soal {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-slate-800 mt-1 leading-relaxed">
                  {question.question}
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                
                <div className={`p-4 rounded-lg flex items-center justify-between ${
                    isUnanswered 
                      ? "bg-slate-100 text-slate-500 italic" 
                      : isCorrect 
                        ? "bg-emerald-100 text-emerald-800 font-medium" 
                        : "bg-rose-100 text-rose-800 font-medium"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs opacity-70 mb-1 uppercase font-bold">Jawaban Kamu:</span>
                    <span className="text-base">
                        {isUnanswered ? "Tidak Dijawab (Waktu Habis)" : userAnswer}
                    </span>
                  </div>

                  {isCorrect && (
                     <div className="bg-white rounded-full p-1 ml-3 shrink-0">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                     </div>
                  )}
                  {!isCorrect && (
                     <div className="bg-white rounded-full p-1 ml-3 shrink-0">
                        <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                     </div>
                  )}
                </div>

                {(!isCorrect) && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-900">
                    <span className="block text-xs font-bold text-emerald-600 uppercase mb-1">Kunci Jawaban:</span>
                    <span className="text-base font-semibold">{question.correctAnswer}</span>
                  </div>
                )}

              </div>
            </Card>
          );
        })}

        <div className="pt-4 pb-10 flex justify-center">
           <div className="w-full max-w-sm">
                <Button onClick={() => dispatch({ type: "RESTART" })}>
                    Mulai Kuis Baru
                </Button>
           </div>
        </div>

      </div>
    </div>
  );
}