
import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import WtoN from "words-to-num"

import NewsCards from './components/NewsCards/NewsCards'
import { NewsArticle } from './types'
import useStyles from './styles'

const alankey = import.meta.env.VITE_ALAN_KEY




const App = () => {
    const { classes } = useStyles()
    const [activeArticle, setActiveArticle] = useState(-1)
    const [newsArticles, setNewsArticles] = useState([])
    useEffect(() => {
        alanBtn({
            key: alankey,
            onCommand: (commandData) => {
                //@ts-ignore
                if (commandData.command === 'newHeadlines') {
                    //@ts-ignore
                    setNewsArticles(commandData.articles)
                    setActiveArticle(-1)
                    //@ts-ignore
                } else if (commandData.command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                    //@ts-ignore
                } else if (commandData.command === 'open') {
                    //@ts-ignore
                    const parsedNumber = commandData.number.length > 2 ? WtoN.convert(commandData.number) : commandData.number
                    console.log(parsedNumber)
                    //@ts-ignore
                    const article = commandData.articles[parsedNumber - 1]
                    if (parsedNumber > 20) {
                        alanBtn({ key: alankey }).playText("Please try that again")
                    } else if (article) {
                        //@ts-ignore
                        window.open(article.url, "_blank")
                        alanBtn({ key: alankey }).playText("Opening ...")
                    }

                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTClQvlSz73J81SmvOFFXrbjhKx8yQ3AjMCVk9LQ9KEoGCSM33tYcnNxZxU70v7uYbsidI&usqp=CAU"
                    alt="alan logo"
                    className={classes.alanLogo}
                />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            <footer className={classes.footer}>
                Made with 💖 by Freda Manu
            </footer>
        </div>
    )
}

export default App
