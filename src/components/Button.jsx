export default function Button({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 
        ${disabled 
          ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
        }`}
    >
      {children}
    </button>
  );
}