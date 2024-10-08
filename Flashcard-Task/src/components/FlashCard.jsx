import React, {useState}from 'react'
import './flashCard.css'


export default function FlashCard({flashcard}) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
    }

  return (
    <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
    <div className='flashcard-inner'>
    <div className="front">
        {flashcard.question}
    </div>
    <div className="back">
        {flashcard.answer}
    </div>
    </div>
    </div>
    
  )
}

