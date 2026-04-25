function ScorePage() {

  const score = localStorage.getItem("score");
  const total = localStorage.getItem("total");

  const percentage = (score / total) * 100;

  let message = "";
  if (percentage === 100) message = "Excellent 🎉";
  else if (percentage >= 70) message = "Great Job 👍";
  else message = "Keep Practicing 💪";

  return (
    <div className="card">
      <h1>🏆 Result</h1>
      <h2>{score} / {total}</h2>
      <h3>{message}</h3>

      <button onClick={() => window.location.href = "quiz.html"}>
        🔁 Try Again
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ScorePage />);