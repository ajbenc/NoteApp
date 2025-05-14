import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import Note from '../models/note.js';
import User from '../models/User.js';

// Get all notes
// GET /api/notes
// Private

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id});
    res.json(notes);
});

// Create new note
// POST /api/notes
//Private

const createNote = asyncHandler(async (req, res) => {
    const {subject, content, importance} = req.body;

    const newNote = new Note({
        user: req.user._id,
        subject,
        content,
        importance
    });
    await newNote.save();

    res.status(201).json(newNote);
});

//PUT /api/notes/:id

export const updateNote = asyncHandler(async (req, res) => {
    const {subject, content, importance} = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error('Note not found');
    }

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    note.subject = subject;
    note.content = content;
    note.importance = importance;

    await note.save();

    res.json(note);
});

//Delete /api/notes/:id

export const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error('Note not found');
    }

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await note.remove();

    res.json({ message: 'Note removed' });
});

const getSecretNotes = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const {answer} = req.body;

    console.log("submited answer:", answer);
    console.log("stored hash:", user.securityAnswer);
    
    const isMatch = await bcrypt.compare(answer, user.securityAnswer);
    if (!isMatch) {
        res.status(401);
        throw new Error('Invalid security answer');
    }

    const notes = await Note.find({
        user: req.user._id,
        importance: 'secret'
    });

    res.json(notes);
});

export {getNotes, createNote, getSecretNotes};