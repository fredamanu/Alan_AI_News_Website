import React, { useState, useEffect, createRef } from "react"
import { NewsArticle } from "../../types"
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from "@mui/material"
import classNames from "classnames"
import useStyles from "./styles"

type Props = {
    article: NewsArticle
    index: number
    activeArticle: number
}

const NewsCard: React.FC<Props> = ({ article: { description, publishedAt, url, urlToImage, title, source }, index, activeArticle }) => {
    const { classes } = useStyles()
    const [elRefs, setElRefs] = useState([])
    const scrollToRef = (ref: any) => window.scroll(0, ref.current.offsetTop - 50)

    useEffect(() => {
        setElRefs(refs =>
            //@ts-ignore
            Array(20).fill().map((_, j) => refs[j] || createRef())
        )
    }, [])

    useEffect(() => {
        if (index === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle])
        }
    }, [index, activeArticle, elRefs])


    return (
        <Card ref={elRefs[index]} className={classNames(classes.card, activeArticle === index ? classes.activeCard : null)}>
            <CardActionArea href={url} target='_blank'>
                <CardMedia
                    className={classes.media}
                    image={urlToImage || "https://thumbs.dreamstime.com/b/d-world-news-background-digital-breaking-studio-report-live-208423108.jpg"}
                />
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary' component='h2'>
                        {new Date(publishedAt).toDateString()}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='h2'>
                        {source.name}
                    </Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant='body1' fontWeight='lg'>
                    {title}
                </Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {description?.slice(0, 80)}...
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.cardActions}>
                <Button size='small' color='primary'>
                    Learn More
                </Button>
                <Typography variant='h5' color='textSecondary'>
                    {index + 1}
                </Typography>
            </CardActions>
        </Card>
    )
}

export default NewsCard
