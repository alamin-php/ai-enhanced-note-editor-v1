<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    /**
     * Display a listing of the user's notes.
     */
    public function index()
    {
        $notes = Note::where('user_id', Auth::id())
            ->latest('updated_at')
            ->get()
            ->map(fn($note) => [
                'id' => $note->id,
                'title' => $note->title ?? 'Untitled Note',
                'date' => $note->updated_at->format('M d, Y'),
                'content' => $note->content,
            ]);

        return Inertia::render('notes/notes', compact('notes'));
    }

    /**
     * Show the form for creating a new note.
     */
    public function create()
    {
        return Inertia::render('notes/create-or-edit-note');
    }

    /**
     * Store or update a note.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'nullable|exists:notes,id',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $userId = Auth::id();

        if ($validated['id']) {
            $note = Note::where('id', $validated['id'])
                ->where('user_id', $userId)
                ->firstOrFail();

            $note->update([
                'title' => $validated['title'],
                'content' => $validated['content'],
            ]);

            $message = 'Note updated successfully.';
        } else {
            $note = Note::create([
                'user_id' => $userId,
                'title' => $validated['title'],
                'content' => $validated['content'],
            ]);

            $message = 'Note created successfully.';
        }

        return redirect()->route('my-notes.edit', $note->id)
            ->with('success', $message);
    }

    /**
     * Show the form for editing a specific note.
     */
    public function edit($noteId)
    {
        $note = Note::where('id', $noteId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return Inertia::render('notes/create-or-edit-note', compact('note'));
    }

    /**
     * Update the specified note.
     */
    public function update(Request $request, $noteId)
    {
        $note = Note::where('id', $noteId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $note->update($validated);

        return redirect()->route('my-notes.edit', $note->id)
            ->with('success', 'Note updated successfully.');
    }

    /**
     * Remove the specified note.
     */
    public function destroy($noteId)
    {
        $note = Note::where('id', $noteId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $note->delete();

        return redirect()->route('my-notes.index')
            ->with('success', 'Note deleted successfully.');
    }
}
