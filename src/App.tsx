import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'

import NewsCards from './components/NewsCards/NewsCards'
import { NewsArticle } from './types'
import useStyles from './styles'

const alankey = import.meta.env.VITE_ALAN_KEY

const App = () => {
 const { classes } = useStyles()
 const [newsArticles, setNewsArticles] = useState([])
 useEffect(() => {
  alanBtn({
   key: alankey,
   onCommand: (commandData) => {
    //@ts-ignore
    if (commandData.command === 'newHeadlines') {
     //@ts-ignore
     setNewsArticles(commandData.articles)
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
   <NewsCards articles={newsArticles} />
  </div>
 )
}

export default App
