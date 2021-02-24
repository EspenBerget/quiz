import './Timer.css';

function Timer(props) {
    return (
        <div className="timer">
            <div className="bar"></div>
            <div className="progress" style={{width: props.progress + '%'}}></div>
        </div>
    );
}

export default Timer;