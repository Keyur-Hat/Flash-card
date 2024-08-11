import React,{useState, useEffect} from 'react'
import FlashCard from './flashCard'
import {getFlashcards} from '../services/api'



export default function FlashCardList() {
    const [flashcards, setFlashcards] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    
    useEffect(() => {
        getFlashcards()
        .then(response => {
            console.log('Flashcards:', response.data);
            setFlashcards(response.data)
        })
        .catch((error) => {
            console.error('Error fetching flashcards:', error);
        })

    }, [])

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>( prevIndex + 1) % flashcards.length)
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length)
    }


  return (
    <div className='flashcard-list'>
        {flashcards.length > 0 && (
            <FlashCard flashcard={flashcards[currentIndex]} />
        )}
        <div className='nav-btn'>
        <button className = "nav-button" onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
        <button className = "nav-button" onClick={handleNext}>Next</button>
        </div>
    </div>
  )
}
