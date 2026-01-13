import { useState } from "react";
import { useQuiz } from "../context/QuizContext";
import Card from "../components/Card";
import Button from "../components/Button";

export default function LoginPage() {
  const [name, setName] = useState("");
  const { dispatch } = useQuiz();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch({ type: "LOGIN", payload: name });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="text-center max-w-md mx-auto">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Knowledge <span className="text-indigo-600">Quiz</span>
          </h1>
          <p className="text-slate-500">
            Uji wawasanmu dengan soal-soal yang disajikan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Syafa Syakira"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              autoComplete="off"
            />
          </div>

          <Button type="submit" disabled={!name.trim()}>
            Lanjut 
          </Button>
        </form>
      </Card>
    </div>
  );
}