import React, {useState, useEffect} from 'react';
import axios from 'axios';
import finapse_logo from './finapse_logo.png';
//import surprisePic from './surprise.jpg';
import './App.css';
import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Ticker',
        selector: row => row.Ticker,
        center: true,
        style: {backgroundColor: 'black'}
        
    },
    {
        name: 'MarketCap',
        selector: row => row.MarketCap,
        center: true,
        style: {backgroundColor: 'black'}, 
        conditionalCellStyles: [
          {
          	when: row => row.MarketCap == 'NANO',
          	style: {
          		color: 'rgb(0, 255, 114)',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.MarketCap == 'MICRO',
          	style: {
          		color: 'rgb(0, 255, 114)',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.MarketCap == 'SMALL',
          	style: {
          		color: 'rgb(255, 242, 0)',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.MarketCap == 'MID',
          	style: {
          		color: 'rgb(255, 0, 140)',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.MarketCap == 'LARGE',
          	style: {
          		color: 'rgb(0, 13, 255)',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.MarketCap == 'MEGA',
          	style: {
          		color: 'rgb(130, 131, 130)',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          }]
    },
    {
        name: 'Change%',
        selector: row => row.ChangePct_format,
        center: true,
        style: {backgroundColor: 'black'},
        conditionalCellStyles: [
          {
          	when: row => row.ChangePct < 0,
          	style: {
          		backgroundColor: 'rgb(98, 7, 28)',
          		color: 'rgb(218, 157, 171)',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.ChangePct > 0,
          	style: {
          		backgroundColor: 'rgb(0, 50, 0)',
          		color: 'rgb(210, 251, 164)',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          }]
    },
    {
        name: 'Last 15 Minutes',
        selector: row => row.last_15_minute,
        sortable: true,
        center: true,
        conditionalCellStyles: [
          {
          	when: row => row.last_15_minute > 0 && row.last_15_minute <= 2,
          	style: {
          		backgroundColor: 'rgb(249, 228, 200)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_15_minute > 2 && row.last_15_minute <= 5,
          	style: {
          		backgroundColor: 'rgb(255, 130, 67)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_15_minute > 5,
          	style: {
          		backgroundColor: 'rgb(179, 0, 0)',
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
        center: true,
        conditionalCellStyles: [
          {
          	when: row => row.last_30_minute > 0 && row.last_30_minute <= 2,
          	style: {
          		backgroundColor: 'rgb(249, 228, 200)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_30_minute > 2 && row.last_30_minute <= 5,
          	style: {
          		backgroundColor: 'rgb(255, 130, 67)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_30_minute > 5,
          	style: {
          		backgroundColor: 'rgb(179, 0, 0)',
          		color: 'white',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          }]
    },
    {
        name: 'Last 1 Hours',
        selector: row => row.last_1_hour,
        sortable: true,
        center: true,
        conditionalCellStyles: [
          {
          	when: row => row.last_1_hour > 0 && row.last_1_hour <= 5,
          	style: {
          		backgroundColor: 'rgb(249, 228, 200)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_1_hour > 5 && row.last_1_hour <= 9,
          	style: {
          		backgroundColor: 'rgb(255, 130, 67)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_1_hour > 9,
          	style: {
          		backgroundColor: 'rgb(179, 0, 0)',
          		color: 'white',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          }]
    },
    {
        name: 'Last 2 Hours',
        selector: row => row.last_2_hour,
        sortable: true,
        center: true,
        conditionalCellStyles: [
          {
          	when: row => row.last_2_hour > 0 && row.last_2_hour <= 8,
          	style: {
          		backgroundColor: 'rgb(249, 228, 200)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_2_hour > 8 && row.last_2_hour <= 15,
          	style: {
          		backgroundColor: 'rgb(255, 130, 67)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_2_hour > 15,
          	style: {
          		backgroundColor: 'rgb(179, 0, 0)',
          		color: 'white',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          }]
    },
    {
        name: 'Last 6 Hours',
        selector: row => row.last_6_hour,
        sortable: true,
        center: true,
        conditionalCellStyles: [
          {
          	when: row => row.last_6_hour > 0 && row.last_6_hour <= 25,
          	style: {
          		backgroundColor: 'rgb(249, 228, 200)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_6_hour > 25 && row.last_6_hour <= 50,
          	style: {
          		backgroundColor: 'rgb(255, 130, 67)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_6_hour > 50,
          	style: {
          		backgroundColor: 'rgb(179, 0, 0)',
          		color: 'white',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          }]
    },
    {
        name: 'last 24 Hours',
        selector: row => row.last_24_hour,
        sortable: true,
        center: true,
        conditionalCellStyles: [
          {
          	when: row => row.last_24_hour > 0 && row.last_24_hour <= 40,
          	style: {
          		backgroundColor: 'rgb(249, 228, 200)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_24_hour > 40 && row.last_24_hour <= 70,
          	style: {
          		backgroundColor: 'rgb(255, 130, 67)',
          		color: 'black',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          },{
          	when: row => row.last_24_hour > 70,
          	style: {
          		backgroundColor: 'rgb(179, 0, 0)',
          		color: 'white',
          		'&:hover': {
          			cursor: 'pointer',
          		},
          	},
          }]
    },
];

function App() {
  const [finapse, setFinapseData] = useState([]);
  const [runtime, setRuntime] = useState([]);
  
  const fetchData = () => {
    const finapseUrl = 'https://finapse-7769f-default-rtdb.firebaseio.com/trending.json';
    const runtimeUrl = 'https://finapse-7769f-default-rtdb.firebaseio.com/runtime.json';

    const getFinapseData = axios.get(finapseUrl)
    const getRuntimeUrl = axios.get(runtimeUrl)

    axios.all([getFinapseData, getRuntimeUrl]).then(
      axios.spread((...allData) => {
        const finapseData = allData[0].data
        const runtimeData = allData[1].data
        console.log(runtimeData)
        setFinapseData(finapseData)
        setRuntime(runtimeData)
      })
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  const isBackgroundRed = true;

  return (
    <div style={{ backgroundColor: isBackgroundRed ? 'black' : 'blue', }} className="App">

      <header className="App-header">
        <img src={finapse_logo} className="App-logo" alt="logo" href />
        {/* 
        <p>
          <code>finapse.live</code>
        </p>

        */}
        <a
          className="App-link"
          href="https://www.buymeacoffee.com/finapse"
          target="_blank"
          rel="noopener noreferrer"
        >
          Support the developer, Buy me a Coffee ☕ 
        </a>
      </header>
      {/*

      Player Name is: {playerName}
      <img src={playerPic} alt="playerPic"/> 
      <img src={surprisePic} alt="surprisePic"/>
      
      */}
      <DataTable
        title= {'LAST UPDATE: [ ' + runtime + ' EST ]'}
        columns={columns}
        data={finapse}
        theme='dark'
        />

    </div>
    
  );
}

export default App;
