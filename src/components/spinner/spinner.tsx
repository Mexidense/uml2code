import "./spinner.css";

export default function Spinner() {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"/>
            <div className="loading-message">
                🧠 AI is analysing your fantastic UML sequence diagram... ✨
            </div>
        </div>
    );
}