import { createContext, useContext, useReducer, useEffect } from "react";

const QUIZ_DURATION = 60; 
const STORAGE_KEY = "REACT_QUIZ_STATE_V3"; 

const initialState = {
  status: "idle", 
  username: "",
  questions: [],
  error: null,
  currentIndex: 0,
  score: 0,
  answers: [],
  secondsRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { 
        ...initialState, 
        username: action.payload, 
        status: "ready" 
      };

    case "FETCH_START":
      return { ...state, status: "loading", error: null };

    case "START_GAME_WITH_DATA":
      return { 
        ...state, 
        questions: action.payload, 
        status: "active", 
        currentIndex: 0,
        score: 0,
        answers: [],
        secondsRemaining: QUIZ_DURATION 
      };

    case "DATA_FAILED":
      return { ...state, status: "error", error: action.payload };

    case "ANSWER_QUESTION":
      const currentQuestion = state.questions[state.currentIndex];
      const isCorrect = action.payload === currentQuestion.correctAnswer;
      
      const answerRecord = {
        questionIndex: state.currentIndex,
        question: currentQuestion.question,
        userAnswer: action.payload,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isCorrect,
      };

      const nextIndex = state.currentIndex + 1;
      const isFinished = nextIndex >= state.questions.length;

      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        answers: [...state.answers, answerRecord],
        currentIndex: isFinished ? state.currentIndex : nextIndex,
        status: isFinished ? "finished" : "active",
      };

    case "TICK":
      const newTime = state.secondsRemaining - 1;
      if (newTime <= 0) return { ...state, secondsRemaining: 0, status: "finished" };
      return { ...state, secondsRemaining: newTime };

    case "REVIEW_QUIZ":
      return { ...state, status: "review" };

    case "BACK_TO_RESULT":
      return { ...state, status: "finished" };

    case "RESTART":
      return {
        ...initialState,
        username: state.username,
        status: "ready"
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
}

const init = (initialValue) => {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) return JSON.parse(savedState);
  } catch (error) {
    console.error("Error parsing storage", error);
  }
  return initialValue;
};

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within QuizProvider");
  return context;
}