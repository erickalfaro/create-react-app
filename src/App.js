import React, {useState, useEffect} from 'react';
import axios from 'axios';
import finapse_logo from './finapse_logo.png';
import surprisePic from './surprise.jpg';
import './App.css';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'MarketCap',
        selector: row => row.MarketCap,
        sortable: true,
    },
    {
        name: 'Ticker',
        selector: row => row.Ticker,
        sortable: true,
    },
    {
        name: 'Change%',
        selector: row => row.chng,
        sortable: true,
    },
    {
        name: 'Last 15 Minutes',
        selector: row => row.last_15_minute,
        sortable: true,
        conditionalCellStyles: [
          {
          	when: row => row.last_15_minute > 1,
          	style: {
          		backgroundColor: 'rgba(63, 195, 128, 0.9)',
          		color: 'white',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          }]
    },
    {
        name: 'Last 30 Minutes',
        selector: row => row.last_30_minute,
        sortable: true,
    },
    {
        name: 'Last 1 Hours',
        selector: row => row.last_1_hour,
        sortable: true,
    },
    {
        name: 'Last 2 Hours',
        selector: row => row.last_2_hour,
        sortable: true,
    },
    {
        name: 'Last 6 Hours',
        selector: row => row.last_6_hour,
        sortable: true,
    },
    {
        name: 'last 24 Hours',
        selector: row => row.last_24_hour,
        sortable: true,
    },
];

function App() {
  const [playerName, setPlayerName] = useState([]);
  const [playerPic, setPlayerPic] = useState([]);
  const [finapse, setFinapseData] = useState([]);
  
  const fetchData = () => {
    const playerApi = 'https://www.balldontlie.io/api/v1/players/237';
    const playerPic = 'https://nba-players.herokuapp.com/players/james/lebron';
    const finapseUrl = 'https://finapse-7769f-default-rtdb.firebaseio.com/data.json';

    const getNBAPlayer = axios.get(playerApi)
    const getPlayerPic = axios.get(playerPic)
    const getFinapseData = axios.get(finapseUrl)

    axios.all([getNBAPlayer, getPlayerPic, getFinapseData]).then(
      axios.spread((...allData) => {
        const allDataPlayer = allData[0].data.first_name
        const getNBAPlayerpic = allData[1].config.url
        const finapseData = allData[2].data

        setPlayerName(allDataPlayer)
        setPlayerPic(getNBAPlayerpic)

        console.log(finapseData)
        setFinapseData(finapseData)
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

      {/*

      Player Name is: {playerName}
      <img src={playerPic} alt="playerPic"/> 
      <img src={surprisePic} alt="surprisePic"/>
      
      */}
      <DataTable
            columns={columns}
            data={finapse}
            theme='dark'
        />

    </div>
    
  );
}

export default App;
