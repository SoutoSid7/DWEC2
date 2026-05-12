import "./MemeList.css"
import { useEffect, useState } from "react"

function MemeList() {
    const [memes, setMemes] = useState([])
    const HTMLMemes = memes.map((meme) => {
        return (
            <li key={meme.id} className="meme-item">
                <h2>{meme.name}</h2>
                <img src={meme.url} className="meme-img"></img>
            </li>
        )
    })

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data.memes)
                setMemes(data.data.memes)
            })
    }, [])

    return (
        <ul className="meme-lis">
            {HTMLMemes}
        </ul>
    )
}

export default MemeList