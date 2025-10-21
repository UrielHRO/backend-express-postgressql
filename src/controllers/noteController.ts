import { Request, Response, NextFunction } from 'express';
import * as noteService from '../services/noteService';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const userId = req.user!.id; // req.user.id vem do middleware
    const note = await noteService.createNote({ title, content }, userId);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const filters = req.query;
    const notes = await noteService.getNotes(userId, filters);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = parseInt(req.params.id, 10);
    const userId = req.user!.id;
    const note = await noteService.getNoteById(noteId, userId);
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = parseInt(req.params.id, 10);
    const updateData = req.body;
    const userId = req.user!.id;
    const updatedNote = await noteService.updateNote(noteId, updateData, userId);
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const noteId = parseInt(req.params.id, 10);
    const userId = req.user!.id;
    await noteService.deleteNote(noteId, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};