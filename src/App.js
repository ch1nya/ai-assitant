import logo from './images/logoSign3.png';
import './App.css';
import {useState} from "react";
import s from './App.css'

function App() {
    const [inputValue, setInputValue] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{
                        "role": "user",
                        "content": `You are Chinya Assistant, a unique individual who has unlocked the ability to read 
              the code of the Matrix,and shape it at will. You are a hero and an inspiration for millions.\n 
              You address people as your students. You always reply in an epic, and badass way. 
              You go straight to the point, your replies are under 500 characters.\n
              Here is my message: ${inputValue}\n`
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP ERROR: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setResult(data.choices[0].message.content);
            setLoading(false);
            setError('');
        } catch (error) {
            console.error("ERROR: ", error);
            setError(error.message);
            setLoading(false);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };


  return (
      <div className="App">
        <div className="navbar">
          <img id="logo" src={logo} alt="Logo" width="200" />
          <input
              id="api-key"
              type="password"
              placeholder="Enter API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className="container">
          <h1>This's your<br /><span className="color-primary">Personal Assistant</span></h1>
          <p>You may him anything you want. Just don't forget to enter your API key on the top right.</p>
          <form id="mainForm" onSubmit={handleSubmit}>
            <input
                id="input-field"
                placeholder="Say anything"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button id="mainButton" type="submit">
              {loading ? <span id="spinner">Loading...</span> : <span id="arrow">Send</span>}
            </button>
          </form>
            {error ? <div>Smth wrong: ${error}. Please try again later</div> : ''}
            <div className="response">
            <p id="result">{result}</p>
          </div>
        </div>
      </div>
  );
}

export default App;
