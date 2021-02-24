import './App.css';
import Timer from './Timer';
import Question from './Question';
import Result from './Result';
import { useLayoutEffect, useState } from 'react';


function App() {
  let [progress, setProgress] = useState(100.0);
  let [result, setResult] = useState("");
  let [isDone, setIsDone] = useState("begin");
  let [score, setScore] = useState(0);
  let progressBar;

  let [questions, setQuestions] = useState([
    {question:"what?", options: ["yes", "no", "maybe", "sure"], correct: "maybe"},
    {question:"is this a good quiz?", options: ["yeah", "nope", "not at all", "no"], correct: "yeah"}
  ]);

  let [question, setQuestion] = useState({});

  const report = userAnswer => {
    if (userAnswer === question.correct) {
      setResult("Correct :)");
      setScore(s => s+1);
    } else {
      setResult("Wrong -.-");
    }
    clearInterval(progressBar);
  };

  const next = () => {
    if (questions.length === 0) {
      setIsDone("done");
      return;
    }
    const [q, ...qs] = questions;
    setQuestion(q);
    setQuestions(qs);
    setResult("");
    setProgress(100.0);
  }

  useLayoutEffect(() => {
    progressBar = setInterval(() => {
      if (progress <= 0) {
        setResult("Time out :(");
      }
      setProgress(p => p-0.1);
    }, 10);

    return () => clearInterval(progressBar);
  }, [progress]);

  const quiz = 
    <>
      <Timer progress={progress} />
      <Question report={report} question={question} />
    </>;

  const begin =
    <>
      <h1>Welcome</h1>
      <button onClick={() => {setIsDone(""); next()}}>Begin</button>
    </>;

  const done = 
    <>
      <h1>Final score is {score}</h1>
      <p>Thanks for playing :)</p>
    </>;

  const app = (function(){
    if (isDone === "done") return done;
    if (isDone === "begin") return begin;
    if (result === "")   return quiz;
    return <Result next={next} result={result} />;
  })();

  return (
    <div className="App">
      {app}
    </div>
  );
}

export default App;

