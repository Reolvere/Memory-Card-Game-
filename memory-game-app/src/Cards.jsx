import { useState, useEffect } from "react"
import ScoreBoard from "./ScoreBoard"
import BestScore from "./BestScore"

function Cards () {

    const [imgs, setImgs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [score, setScore] = useState(0)
    const [currentImg, setCurrentImg] = useState([])
    const [bestScore, setBestScore] = useState([0])

    const imgsAPI = " https://api.thecatapi.com/v1/images/search?limit=10"

    //get data from api
    useEffect(() => {
        const fetchImgs = async () => {
            setIsLoading(true)
            const response = await fetch(`${imgsAPI}`)
            const imgList = await response.json()
            setImgs(imgList)
            setIsLoading(false)
        }

        fetchImgs()

    }, [])

    const shuffleImages = (img) => {
        const shuffledImgs = [...imgs]
          .map((img) => ({ ...img, sortKey: Math.random() })) // Add a random sort key
          .sort((a, b) => a.sortKey - b.sortKey)             // Sort based on the key
          .map(({ sortKey, ...img }, ) => img);              // Remove the key afterward
        
        setImgs(shuffledImgs);
        setScore(score => score + 1)
        setCurrentImg([...currentImg, img.id]) // add img id to the current img
        console.log(currentImg)

        // reset score to 0 
        if (currentImg.includes(img.id)) {

            //set best score
            if (score >= bestScore){
                setBestScore(score)
            } 
            setCurrentImg([])
            setScore(0)
          }
      };

    if (isLoading) {
        return (
            <>
                Loading...
            </>
        )
    }

    return(
        <>
            <ScoreBoard score={score}/>
            <BestScore bestScore={bestScore}/>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {imgs.map((img) => {
                    return <li key={img.id} style={{ listStyle: "none" }}><button
                        onClick={() => shuffleImages(img)}
                        style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                    >{<img key={img.id} src={img.url} style={{ width: "150px", height: "150px", borderRadius: "8px" }}/>}</button></li>
                })}
            </ul>
        </>
    )
}

export default Cards 