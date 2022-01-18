import React, { useState, useEffect } from 'react';
import './App.css';
import DataTable, { defaultThemes } from 'react-data-table-component';
import Header from "./Header"
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import Twitter from './TwitterFeed';
import { supabase } from './supabase_client'

const sortIcon = <ArrowDownward />;

const customStyles = {
	header: {
		style: {
			minHeight: '30px',
			backgroundColor: '#202020'
		},
	},
	headRow: {
		style: {
			borderTopStyle: 'solid',
			minHeight: '30px',
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
			minHeight: '30px', // override the row height
			minWidth: '10px'
		},
		highlightOnHoverStyle: {
			backgroundColor: 'purple',
			outlineColor: 'purple',
			borderBottomColor: 'purple',
			outlineWidth: '1px',
			outlineStyle: 'dotted',
			transitionDuration: '0s',
		},
	},
};

function App() {
	const [tweets, setTweets] = useState([]);
	const [trending, setTrending] = useState([]);
	const [refresh_ts, setRefreshTs] = useState([]);
	const [ticker, setTicker] = useState([]);

	async function fetchTweets(ticker) {
		const { data } = await supabase
			.from('v_ticker_activity')
			.select()
			.eq('ticker', ticker)
		setTweets(data)
	}

	async function fetchTrending() {
		const { data } = await supabase
			.from('v_trending_tickers')
			.select()
		setTrending(data)
	}

	async function fetchRefresh() {
		const { data } = await supabase
			.from('v_last_refresh')
			.select()
		setRefreshTs(data[0].refresh_ts)
	}

	useEffect(() => {
		fetchTrending()
		fetchRefresh()
		
		setInterval(() => {
			fetchTrending()
			fetchRefresh()
		}, 60000);
	  }, []);


	function handleClick(ticker) {
		fetchTweets(ticker);
		setTicker(ticker);
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleClick(event.target.value.toUpperCase());
		}
	}

	const isBackgroundRed = true;

	const columns = [
		{
			name: '14 Day Trend',
			center: true,
			cell: (row) => <Sparklines data={row.frequencies['f']} limit={14} width={500} height={100} margin={5} ><SparklinesBars style={{ fill: "purple" }} /></Sparklines>,
			width: '125px',
			compact: true,
			style: {
				backgroundColor: 'black'
			},
		},
		{
			name: 'Ticker',
			selector: row => row.Ticker,
			cell: (row) => <a className='btns' href='/#' onClick={() => handleClick(row.Ticker)} id={row.Ticker}>{row.Ticker}</a>,
			center: true,
			width: '50px',
			compact: true,
			style: { backgroundColor: 'black' }

		},
		{
			name: 'MarketCap',
			selector: row => row.MarketCap,
			center: true,
			width: '70px',
			compact: true,
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
			width: '70px',
			compact: true,
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
			name: 'Last 15 Mins',
			selector: row => row.last_15_minute,
			sortable: true,
			center: true,
			width: '100px',
			compact: true,
			style: { backgroundColor: 'black' },
			conditionalCellStyles: [
				{
					when: row => row.last_15_minute > 0 && row.last_15_minute <= 1,
					style: {
						backgroundColor: 'rgb(249, 228, 200)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_15_minute > 1 && row.last_15_minute <= 4,
					style: {
						backgroundColor: 'rgb(255, 130, 67)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_15_minute > 4,
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
			name: 'Last 30 Mins',
			selector: row => row.last_30_minute,
			sortable: true,
			center: true,
			width: '100px',
			compact: true,
			style: { backgroundColor: 'black' },
			conditionalCellStyles: [
				{
					when: row => row.last_30_minute > 0 && row.last_30_minute <= 1,
					style: {
						backgroundColor: 'rgb(249, 228, 200)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_30_minute > 1 && row.last_30_minute <= 5,
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
			name: 'Last 1 Hrs',
			selector: row => row.last_1_hour,
			sortable: true,
			center: true,
			width: '100px',
			compact: true,
			style: { backgroundColor: 'black' },
			conditionalCellStyles: [
				{
					when: row => row.last_1_hour > 0 && row.last_1_hour <= 2,
					style: {
						backgroundColor: 'rgb(249, 228, 200)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_1_hour > 2 && row.last_1_hour <= 5,
					style: {
						backgroundColor: 'rgb(255, 130, 67)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_1_hour > 5,
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
			width: '100px',
			compact: true,
			style: { backgroundColor: 'black' },
			conditionalCellStyles: [
				{
					when: row => row.last_2_hour > 0 && row.last_2_hour <= 3,
					style: {
						backgroundColor: 'rgb(249, 228, 200)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_2_hour > 3 && row.last_2_hour <= 8,
					style: {
						backgroundColor: 'rgb(255, 130, 67)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_2_hour > 8,
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
			width: '100px',
			compact: true,
			style: { backgroundColor: 'black' },
			conditionalCellStyles: [
				{
					when: row => row.last_6_hour > 0 && row.last_6_hour <= 8,
					style: {
						backgroundColor: 'rgb(249, 228, 200)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_6_hour > 8 && row.last_6_hour <= 15,
					style: {
						backgroundColor: 'rgb(255, 130, 67)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_6_hour > 15,
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
			name: 'Last 24 Hours',
			selector: row => row.last_24_hour,
			sortable: true,
			center: true,
			width: '100px',
			compact: true,
			style: { backgroundColor: 'black' },
			conditionalCellStyles: [
				{
					when: row => row.last_24_hour > 0 && row.last_24_hour <= 8,
					style: {
						backgroundColor: 'rgb(249, 228, 200)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_24_hour > 8 && row.last_24_hour <= 15,
					style: {
						backgroundColor: 'rgb(255, 130, 67)',
						color: 'black',
						'&:hover': {
							cursor: 'pointer',
						},
					},
				}, {
					when: row => row.last_24_hour > 15,
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


	const onInputChange = (event) => {
		event.target.value = event.target.value.toUpperCase();
		setTicker(event.target.value);
	}

	return (
		<div style={{ backgroundColor: isBackgroundRed ? 'black' : 'blue', }} className="App">
			<Header />

			<div className='panel'>
				<div className='dtable'>
					<DataTable
						className='dtable'
						title={'Last Refresh: ' + refresh_ts + ' EST'}
						columns={columns}
						data={trending}
						customStyles={customStyles}
						sortIcon={sortIcon}
						theme='dark'
						defaultSortAsc={false}
						defaultSortFieldId={'last_15_minute'}
						fixedHeader
						highlightOnHover
						fixedHeaderScrollHeight="1500px"
						striped={true}
						subHeaderWrap={true}
					/>
				</div>

				<div className='tweetsEmbed'>
					<div className="tickerSearch">
						<span>Search: </span>
						<input className='inputBox' placeholder='Search ticker...' onKeyDown={handleKeyDown} onChange={onInputChange} value={ticker}></input>
					</div>

					<Twitter tweets={tweets} />
				</div>
			</div>

		</div >
	);
}
//<h1 className='tweets_header'>{ticker}</h1>
export default App;
