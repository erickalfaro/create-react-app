import "./TwitterFeed.css";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TwitterIcon from '@mui/icons-material/Twitter';

function Twitter(props) {
    var Highlight = require('react-highlighter');
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

                                        <a className="screenName" href={'//www.twitter.com/' + t.screen_name} target="_blank" rel="noopener noreferrer" >
                                            @{t.screen_name}
                                        </a>
                                    </div>
                                </Typography>

                                <Typography variant="body3">
                                    <a className="tweetText" href={t.url} target="_blank" rel="noopener noreferrer" >
                                    <Highlight search={t.ticker} matchStyle={{backgroundColor: '#1DA1F2'}}>{t.full_text}</Highlight>
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
