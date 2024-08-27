import React, { useState, useEffect } from 'react';
import { getFlashcards, addFlashcard, deleteFlashcard, updateFlashcard } from '../services/api';

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
  const [editingFlashcard, setEditingFlashcard] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const response = await getFlashcards();
      setFlashcards(response.data);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    }
  };

  const handleAddFlashcard = async () => {
    try {
      await addFlashcard(newFlashcard);
      setNewFlashcard({ question: '', answer: '' });
      fetchFlashcards();
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await deleteFlashcard(id);
      fetchFlashcards();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleUpdateFlashcard = async (id) => {
    try {
      await updateFlashcard(id, editingFlashcard);
      setEditingFlashcard(null);
      fetchFlashcards();
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="flashcard-form">
        <h2>Add New Flashcard</h2>
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
        />
        <button onClick={handleAddFlashcard}>Add Flashcard</button>
      </div>

      <div className="flashcard-list">
        <h2>Manage Flashcards</h2>
        {flashcards.map((flashcard) => (
          <div key={flashcard.id} className="flashcard-item">
            {editingFlashcard && editingFlashcard.id === flashcard.id ? (
              <>
                <input
                  type="text"
                  value={editingFlashcard.question}
                  onChange={(e) => setEditingFlashcard({ ...editingFlashcard, question: e.target.value })}
                />
                <input
                  type="text"
                  value={editingFlashcard.answer}
                  onChange={(e) => setEditingFlashcard({ ...editingFlashcard, answer: e.target.value })}
                />
                <button onClick={() => handleUpdateFlashcard(flashcard.id)}>Save</button>
              </>
            ) : (
              <>
                <p><strong>Q:</strong> {flashcard.question}</p>
                <p><strong>A:</strong> {flashcard.answer}</p>
                <button onClick={() => setEditingFlashcard(flashcard)}>Edit</button>
                <button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
