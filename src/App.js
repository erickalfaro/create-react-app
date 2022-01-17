import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import DataTable, { defaultThemes } from 'react-data-table-component';
import Header from "./Header"
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import Icon from '@material-ui/icons/Apps';
import TweetEmbed from 'react-tweet-embed';
import Twitter from './TwitterFeed';
import data from "./data";
import LazyLoad from "react-lazyload";
import { supabase } from './supabase_client'

//const Twitter = React.lazy(() => import('./TwitterFeed'));

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

const Post = ({ id, title, body }) => (

	<div className="post">
		<LazyLoad
			once={true}
			placeholder={<img src={`https://picsum.photos/id/${id}/5/5`} alt="..." />}
		>
			<div className="post-img">
				<TweetEmbed id="692527862369357824" options={{ width: '250', theme: 'dark' }} />
			</div>
		</LazyLoad>
		<div className="post-body">
			<h4>{title}</h4>
			<p>{body}</p>
		</div>
	</div>
);



function App() {
	const [finapse, setFinapseData] = useState([]);
	const [runtime, setRuntime] = useState([]);

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
		fetchTweets()
		fetchTrending()
		fetchRefresh()
	}, [])

	function handleClick(ticker) {
		fetchTweets(ticker);
		setTicker( "Tweets for $" + ticker);
		console.log(ticker);
	}

	const [todos, setTodos] = useState([
		{
			id: 1,
			title: 'This is first list'
		},
		{
			id: 2,
			title: 'This is second list'
		},
		{
			id: 3,
			title: 'This is third list'
		},
	]);

	const isBackgroundRed = true;

	const columns = [
		{
			name: '14 Day Trend',
			center: true,
			cell: (row) => <Sparklines data={row.frequencies['f']} limit={14} width={500} height={100} margin={5} ><SparklinesBars style={{ fill: "purple" }} /></Sparklines>,
			width: '150px', // custom width for icon button
			style: {
				backgroundColor: 'black'
			},
		},
		{
			name: 'Ticker',
			selector: row => row.Ticker,
			cell: (row) => <a className='btns' href='/#' onClick={() => handleClick(row.Ticker)} id={row.Ticker}>{row.Ticker}</a>, // window.open("https://finance.yahoo.com/quote/" + row.Ticker, "_blank")
			center: true,
			width: '90px',
			style: { backgroundColor: 'black' }
	
		},
		{
			name: 'MarketCap',
			selector: row => row.MarketCap,
			center: true,
			width: '100px',
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
			width: '100px',
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
			style: { backgroundColor: 'black' },
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
			name: 'Last 30 Mins',
			selector: row => row.last_30_minute,
			sortable: true,
			center: true,
			style: { backgroundColor: 'black' },
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
			name: 'Last 1 Hrs',
			selector: row => row.last_1_hour,
			sortable: true,
			center: true,
			style: { backgroundColor: 'black' },
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
			style: { backgroundColor: 'black' },
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
			style: { backgroundColor: 'black' },
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
			name: 'Last 24 Hours',
			selector: row => row.last_24_hour,
			sortable: true,
			center: true,
			style: { backgroundColor: 'black' },
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
						fixedHeaderScrollHeight="10000px"
						striped={true}
						subHeaderWrap={true}
					/>
				</div>

				<div className='tweetsEmbed'>
					<h1 className='tweets_header'>{ticker}</h1>

					<Twitter tweets={tweets} />

				</div>
			</div>
		</div >
	);
}

export default App;
