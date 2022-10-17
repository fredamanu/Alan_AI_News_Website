import React from 'react'
import { Grid, Grow, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

import { NewsArticle } from '../../types'
import NewsCard from '../NewsCard/NewsCard'
import useStyles from './styles'

type Props = {
 articles: NewsArticle[]
}

const infoCards = [
 { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
 {
  color: '#1565c0',
  title: 'News by Categories',
  info: 'Business, Entertainment, General, Sports, Technology',
  text: 'Give me the latest Technology news'
 },
 {
  color: '#4527a0',
  title: 'News by Terms',
  info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...',
  text: "What's up with PlayStation 5"
 },
 {
  color: '#283593',
  title: 'News by Sources',
  info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...',
  text: 'Give me the news from CNN'
 }
]

const NewsCards: React.FC<Props> = ({ articles }) => {
 const { classes } = useStyles()

 if (!articles.length) {
  return (
   <Grow in>
    <Grid
     container
     className={classes.container}
     alignItems="stretch"
     spacing={3}
    >
     {infoCards.map((infoCard) => (
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
       <div
        className={classes.card}
        style={{ backgroundColor: infoCard.color }}
       >
        <Typography variant="h5">{infoCard.title}</Typography>
        {infoCard.info ? (
         <Typography variant="h6">
          <strong>{infoCard.title.split(' ')[2]}:</strong>
          <br />
          {infoCard.info}
         </Typography>
        ) : null}
        <Typography variant="h6">
         Try saying: <br /> <i>{infoCard.text}</i>{' '}
        </Typography>
       </div>
      </Grid>
     ))}
    </Grid>
   </Grow>
  )
 }
 return (
  <Grow in>
   <Grid
    container
    alignItems="stretch"
    spacing={3}
    className={classes.container}
   >
    {articles.map((article, index) => (
     // this says on extra small devices show one card, on small and medium devices show 2 cards, on medium device show 3 cards and on large devices show 4 cards
     <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
      <NewsCard article={article} index={index} key={uuidv4()} />
     </Grid>
    ))}
   </Grid>
  </Grow>
 )
}

export default NewsCards
