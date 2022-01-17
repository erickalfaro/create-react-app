import "./TwitterFeed.css";
import TweetEmbed from 'react-tweet-embed';
import styled from 'styled-components';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

function Twitter(props) {
    const A2 = styled.a({
        fontSize: '0.75rem',
        fontWeight: 'bold',
        color: 'white'
    });

    const H5 = styled.a({
        fontSize: '0.75rem',
        fontWeight: 'bold',
        color: 'white'
    });


    // <CardActions style={{ backgroundColor: "rgb(32, 32, 32)", }}>
    //     <Button onClick={() => window.open(t.url, "_blank")} size="small">Link to Tweet...</Button>
    // </CardActions>

    return (
        <div>
            {props.tweets.map(t => { // using props in child component and looping <Button onClick={() => window.open('www.twitter.com/' + t.screen_name, "_blank")} size="small">@{t.screen_name}</Button>
                return (
                    <div >
                        <Card className="tweet" variant="outlined" sx={{ minWidth: 275 }}>
                            <CardContent style={{ backgroundColor: "black", color: "white" }}>

                                <Typography variant="h5" component="div">
                                    <div className='tweetHeader'>
                                        <TwitterIcon />

                                        <a className="screenName" href={'//www.twitter.com/' + t.screen_name} target="_blank" >
                                            @{t.screen_name}
                                        </a>
                                    </div>
                                </Typography>

                                <Typography variant="body3">
                                    <a className="tweetText" href={t.url} target="_blank" >
                                        {t.full_text}
                                    </a>
                                </Typography>

                                <Typography className="timestamp" variant="body2">
                                    {t.time_stamp} (EST)
                                </Typography>

                            </CardContent>


                        </Card>
                        <li></li>
                    </div>
                )
            })}
        </div>
    );
}

export default Twitter
