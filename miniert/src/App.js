import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click connect button to connect vs code with React
        </p>
        <form action ='../../post' method = 'post'>
        <button type = 'submit'>Connect</button>

        </form>
      </header>
    </div>
  );
}

export default App;
