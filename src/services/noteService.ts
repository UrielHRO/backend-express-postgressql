import prisma from '../database/prisma';

export const createNote = async (data: { title: string; content: string }, userId: number) => {
  const { title, content } = data;
  const note = await prisma.note.create({
    data: {
      title,
      content,
      authorId: userId,
    },
  });
  return note;
};

export const getNotes = async (userId: number, filters: any) => {
  const { title, content } = filters;
  const notes = await prisma.note.findMany({
    where: {
      authorId: userId,
      // Filtros opcionais
      title: title ? { contains: title, mode: 'insensitive' } : undefined,
      content: content ? { contains: content, mode: 'insensitive' } : undefined,
    },
  });
  return notes;
};

export const getNoteById = async (noteId: number, userId: number) => {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      authorId: userId,
    },
  });

  if (!note) {
    throw { status: 404, message: 'Anotação não encontrada ou acesso negado.' };
  }
  return note;
};

export const updateNote = async (noteId: number, updateData: any, userId: number) => {
  // Garante que a nota existe e pertence ao usuário antes de atualizar
  await getNoteById(noteId, userId);

  const updatedNote = await prisma.note.update({
    where: { id: noteId },
    data: updateData,
  });
  return updatedNote;
};

export const deleteNote = async (noteId: number, userId: number) => {
  // Garante que a nota existe e pertence ao usuário antes de deletar
  await getNoteById(noteId, userId);
  
  await prisma.note.delete({ where: { id: noteId } });
};