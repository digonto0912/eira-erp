import React from 'react';
import './Job-Notes.css';

const JobNotes = () => {
    const notes = [
        { id: 1, text: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or ala.', time: '08-17-2024 12:28 PM', color: 'yellow' },
        { id: 2, text: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or ala.', time: '08-17-2024 12:28 PM', color: 'orange' },
        { id: 3, text: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or ala.', time: '08-17-2024 12:28 PM', color: 'lightgreen' }
    ];

    return (
        <div className="job-notes-container">
            <h1>Job Notes +</h1>
            <div className="notes-wrapper">
                {notes.map(note => (
                    <div key={note.id} className="note" style={{ backgroundColor: note.color }}>
                        <p>{note.text}</p>
                        <div className="note-footer">
                            <span>{note.time}</span>
                            <button className="edit-btn">
                                <i className="fas fa-pen"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobNotes;
