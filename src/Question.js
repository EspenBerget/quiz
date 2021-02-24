import './Question.css';
import Option from './Option';

function Question(props) {
    return (
        <div className="question">
            <h1>{props.question.question}</h1>
            {props.question.options.map((o, i) => <Option key={i} value={o} report={props.report} />)}
        </div>
    );
}

export default Question;