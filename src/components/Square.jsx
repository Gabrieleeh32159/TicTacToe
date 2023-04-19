import { useState } from "react"

export default function Square ({children, updateBoard, index, isSelected, toTurn}) {
    //[played, setPlayed] = useState(props.played)

    const general = "text-6xl rounded-xl flex justify-center items-center text-white"

    const boardStyle = `${general} border-2 border-white h-32 w-32 transition-all duration-300 hover:border-4 hover:scale-110 hover:border-sky-500`

    const NotSelected = `${general} h-28 w-28`

    const Selected = `${general} h-28 w-28 bg-sky-500`

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div 
            className={toTurn ? (isSelected ? Selected : NotSelected) : boardStyle}
            onClick={handleClick}
        >
            {children}
        </div>    
    )
}