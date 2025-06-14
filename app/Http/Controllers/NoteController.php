<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::where('user_id', Auth::id())->get()->map(function ($note) {
            return [
                'id' => $note->id,
                'title' => $note->title ?? 'Untitled Note',
                'date' => $note->updated_at->format('M d, Y'),
                'content' => $note->content,
            ];
        });

        return Inertia::render('notes/notes', compact('notes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('notes/create-notes');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($noteId)
    {

        Note::where('id', $noteId)->delete();

        // Redirect back to notes index with a success message
        return redirect()->route('my-notes.index')->with('success', 'Note deleted successfully.');
    }

}
