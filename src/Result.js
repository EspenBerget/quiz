import './Result.css';

function Result(props) {
    return (
        <div className="result">
            <h1>{props.result}</h1>
            <button onClick={props.next}>Next</button>
        </div>
    );
}

export default Result;