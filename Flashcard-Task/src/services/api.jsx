import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3308' 
})

export default api;

export const getFlashcards = () => {
    return api.get('/api/flashcards');  
  };

export const addFlashcard = async (flashcard) => {
    return api.post('/api/flashcards', flashcard);
};

export const deleteFlashcard = async (id) => {
    return api.delete(`/api/flashcards/${id}`);

};

export const updateFlashcard = async (id, flashcard) => {
    return api.put(`/api/flashcards/${id}`, flashcard);
};