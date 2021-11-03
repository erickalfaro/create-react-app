import logo from './finapse_logo.png';
import './App.css';
import FirstComponent from './FirstComponent'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>finapse.live</code>
        </p>

        <FirstComponent displaytext="First Component Data"/>

        <a
          className="App-link"
          href="https://twitter.com/FintwitSynapse"
          target="_blank"
          rel="noopener noreferrer"
          
        >
          more to follow...
        </a>
      </header>
    </div>
  );
}

export default App;
