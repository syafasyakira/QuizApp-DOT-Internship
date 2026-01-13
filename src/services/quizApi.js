import { shuffleArray, decodeHtml } from "../utils/helpers";

const API_URL = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";

export const fetchQuestions = async () => {
  try {
    const res = await fetch(API_URL);
    
    if (!res.ok) {
      throw new Error("Gagal mengambil data dari server");
    }

    const data = await res.json();

    // Transformasi Data: Kita rapikan struktur datanya di sini
    const formattedQuestions = data.results.map((q) => {
      // Gabungkan jawaban benar & salah, lalu acak
      const allOptions = shuffleArray([
        ...q.incorrect_answers, 
        q.correct_answer
      ]);

      return {
        question: decodeHtml(q.question),
        correctAnswer: decodeHtml(q.correct_answer),
        options: allOptions.map((opt) => decodeHtml(opt)),
      };
    });

    return formattedQuestions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};