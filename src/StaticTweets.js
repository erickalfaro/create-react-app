import React from 'react'
import { fetchTweetAst } from 'static-tweets'
import { Tweet } from 'react-static-tweets'

const tweetId = '1358199505280262150'

export const getStaticProps = async () => {
  try {
    const tweetAst = await fetchTweetAst(tweetId)

    return {
      props: {
        tweetId,
        tweetAst
      },
      revalidate: 10
    }
  } catch (err) {
    console.error('error fetching tweet info', err)

    throw err
  }
}

export default function Example({ tweetId, tweetAst }) {
  return <Tweet id={tweetId} ast={tweetAst} />
}