function App() {

  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState({});

  React.useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const handleAnswer = (id, option) => {
    setAnswers({ ...answers, [id]: option });
  };

  const handleSubmit = () => {
    const score = questions.filter(
      q => answers[q.id] === q.answer
    ).length;

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);

    window.location.href = "score.html";
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div className="container">
      <h1>🧠 Quiz App</h1>

      <div className="progress">
        <div className="progress-bar" style={{ width: progress + "%" }}></div>
      </div>

      <p>Answered: {Object.keys(answers).length} / {questions.length}</p>

      {questions.map(q => (
        <div className="card" key={q.id}>
          <h3>{q.question}</h3>

          {q.options.map(opt => (
            <label key={opt}>
              <input
                type="radio"
                name={q.id}
                onChange={() => handleAnswer(q.id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>
        🚀 Submit Quiz
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);