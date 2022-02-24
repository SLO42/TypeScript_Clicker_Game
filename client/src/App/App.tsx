import './App.css';
import Game from '../Game';
import LoginViaGoogle from '../Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginViaGoogle />
        <Game />
      </header>
    </div>
  );
}

export default App;
