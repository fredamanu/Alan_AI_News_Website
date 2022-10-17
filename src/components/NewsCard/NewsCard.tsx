import React from 'react'
import { NewsArticle } from '../../types'
import {
 Card,
 CardActions,
 CardActionArea,
 CardContent,
 CardMedia,
 Button,
 Typography
} from '@mui/material'
import classNames from 'classnames'
import useStyles from './styles'

type Props = {
 article: NewsArticle
 index: number
}

const NewsCard: React.FC<Props> = ({
 article: { description, publishedAt, url, urlToImage, title, source },
 index
}) => {
 const { classes } = useStyles()

 return (
  <Card className={classes.card}>
   <CardActionArea href={url} target="_blank">
    <CardMedia
     className={classes.media}
     image={
      urlToImage ||
      'https://thumbs.dreamstime.com/b/d-world-news-background-digital-breaking-studio-report-live-208423108.jpg'
     }
    />
    <div className={classes.details}>
     <Typography variant="body2" color="textSecondary" component="h2">
      {new Date(publishedAt).toDateString()}
     </Typography>
     <Typography variant="body2" color="textSecondary" component="h2">
      {source.name}
     </Typography>
    </div>
    <Typography
     className={classes.title}
     gutterBottom
     variant="body1"
     fontWeight="lg"
    >
     {title}
    </Typography>
    <CardContent>
     <Typography variant="body2" color="textSecondary" component="p">
      {description.slice(0, 80)}...
     </Typography>
    </CardContent>
   </CardActionArea>
   <CardActions className={classes.cardActions}>
    <Button size="small" color="primary">
     Learn More
    </Button>
    <Typography variant="h5" color="textSecondary">
     {index + 1}
    </Typography>
   </CardActions>
  </Card>
 )
}

export default NewsCard
