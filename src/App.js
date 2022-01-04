import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import DataTable, { defaultThemes } from 'react-data-table-component';
import Header from "./Header"
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const sortIcon = <ArrowDownward />;	

const columns = [
	{
		name: 'Ticker',
		selector: row => row.Ticker,
		cell:(row)=><a className='btns' onClick={() => window.open("https://finance.yahoo.com/quote/" + row.Ticker, "_blank")} id={row.Ticker}>{row.Ticker}</a>,
		center: true,
		style: { backgroundColor: 'black' }

	},
	{
		name: 'MarketCap',
		selector: row => row.MarketCap,
		center: true,
		style: { backgroundColor: 'black' },
		conditionalCellStyles: [
			{
				when: row => row.MarketCap === 'NANO',
				style: {
					color: 'rgb(0, 255, 114)',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
				when: row => row.MarketCap === 'MICRO',
				style: {
					color: 'rgb(0, 255, 114)',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
				when: row => row.MarketCap === 'SMALL',
				style: {
					color: 'rgb(255, 242, 0)',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
				when: row => row.MarketCap === 'MID',
				style: {
					color: 'rgb(255, 0, 140)',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
				when: row => row.MarketCap === 'LARGE',
				style: {
					color: 'rgb(0, 13, 255)',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
				when: row => row.MarketCap === 'MEGA',
				style: {
					color: 'rgb(130, 131, 130)',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}]
	},
	{
		name: 'Change (%)',
		selector: row => row.ChangePct_format,
		center: true,
		style: { backgroundColor: 'black' },
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
			}, {
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
			}, {
				when: row => row.last_15_minute > 2 && row.last_15_minute <= 5,
				style: {
					backgroundColor: 'rgb(255, 130, 67)',
					color: 'black',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
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
			}, {
				when: row => row.last_30_minute > 2 && row.last_30_minute <= 5,
				style: {
					backgroundColor: 'rgb(255, 130, 67)',
					color: 'black',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
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
			}, {
				when: row => row.last_1_hour > 5 && row.last_1_hour <= 9,
				style: {
					backgroundColor: 'rgb(255, 130, 67)',
					color: 'black',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
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
			}, {
				when: row => row.last_2_hour > 8 && row.last_2_hour <= 15,
				style: {
					backgroundColor: 'rgb(255, 130, 67)',
					color: 'black',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
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
			}, {
				when: row => row.last_6_hour > 25 && row.last_6_hour <= 50,
				style: {
					backgroundColor: 'rgb(255, 130, 67)',
					color: 'black',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
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
			}, {
				when: row => row.last_24_hour > 40 && row.last_24_hour <= 70,
				style: {
					backgroundColor: 'rgb(255, 130, 67)',
					color: 'black',
					'&:hover': {
						cursor: 'pointer',
					},
				},
			}, {
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

const customStyles = {
	header: {
		style: {
			minHeight: '20px',
			backgroundColor: '#202020'
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			minHeight: '20px',
			borderTopWidth: '1px',
			borderTopColor: defaultThemes.default.divider.default,
		},
	},
	headCells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	cells: {
		style: {
			'&:not(:last-of-type)': {
				borderRightStyle: 'solid',
				borderRightWidth: '1px',
				borderRightColor: defaultThemes.default.divider.default,
			},
		},
	},
	rows: {
        style: {
            minHeight: '10px', // override the row height
			minWidth: '10px'
        },
    },
};

function App() {
	const [finapse, setFinapseData] = useState([]);
	const [runtime, setRuntime] = useState([]);

	const fetchData = () => {
		const finapseUrl = 'https://finapse-7769f-default-rtdb.firebaseio.com/trending.json' //process.env.REACT_APP_TRENDING;
		const runtimeUrl = 'https://finapse-7769f-default-rtdb.firebaseio.com/runtime.json' //process.env.REACT_APP_RUNTIME;

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
		setInterval(() => {
			fetchData()
			console.log('hello')
		}, 1000 * 60 * 5);
	}, [])

	const isBackgroundRed = true;

	return (
		<div style={{ backgroundColor: isBackgroundRed ? 'black' : 'blue', }} className="App">
			<Header />

			<div className='dtable'>
				<DataTable
					className='dtable'
					title={'Last Refresh: ' + runtime + ' EST'}
					columns={columns}
					data={finapse}
					customStyles={customStyles}
					sortIcon={sortIcon}
					theme='dark'
					fixedHeader
					highlightOnHover
					fixedHeaderScrollHeight="10000px"
				/>
			</div>
		</div>



	);
}

export default App;
