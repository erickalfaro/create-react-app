import React, {useState, useEffect} from 'react';
import axios from 'axios';
import finapse_logo from './finapse_logo.png';
import surprisePic from './surprise.jpg';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState([]);
  const [playerPic, setPlayerPic] = useState([]);
  
  const fetchData = () => {
    const playerApi = 'https://www.balldontlie.io/api/v1/players/237';
    const playerPic = 'https://nba-players.herokuapp.com/players/james/lebron'

    const getNBAPlayer = axios.get(playerApi)
    const getPlayerPic = axios.get(playerPic)

    axios.all([getNBAPlayer, getPlayerPic]).then(
      axios.spread((...allData) => {
        const allDataPlayer = allData[0].data.first_name
        const getNBAPlayerpic = allData[1].config.url

        setPlayerName(allDataPlayer)
        setPlayerPic(getNBAPlayerpic)
      })
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={finapse_logo} className="App-logo" alt="logo" />
        <p>
          <code>finapse.live</code>
        </p>

        <a
          className="App-link"
          href="https://twitter.com/FintwitSynapse"
          target="_blank"
          rel="noopener noreferrer"
        >
          coming soon...
        </a>
      </header>

      Player Name is: {playerName}
      <img src={playerPic}/>
      <img src={surprisePic}/>
    </div>
  );
}

export default App;
