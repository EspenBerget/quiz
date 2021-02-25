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
    {question:"Which of these are valid JS?", options: ["console.log 'hello'", "console.log('hello')","set x = 1", "var & = 1"], correct: "console.log('hello')"},
    {question:"Which of these languages does not compile to JS?", options: ["Elm","PureScript","ReasonML","Java"], correct:"Java"},
    {question:"Which of these are not a bundler?", options: ["babel","parcel","rollup","webpack"], correct: "babel"},
    {question:"What was the original name for JavaScript?", options:["ECMAScript","CScript","WebScript","LiveScript"], correct:"LiveScript"},
    {question:"Which of these allow you to build web APIs in JS?", options:["react","gulp","express","gorilla"], correct:"express"},
    {question:"Which of thees are not a web apps framework", options:["react","vue","svelte","node"], correct: "node"}
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

