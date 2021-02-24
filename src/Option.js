import './Option.css';

function Option(props) {
    return (
        <div className="option" onClick={() => props.report(props.value)}>
            {props.value}
        </div>
    );
}

export default Option;