import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FileText, MoreVertical, PlusIcon, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Notes',
        href: '/notes',
    },
];

type Note = {
    id: number;
    title: string;
    content: string;
    date: string;
};

export default function NoteManagement() {
    // call notes data props
    const { notes } = usePage().props as unknown as { notes: Note[] };

    // seach notes by title
    const [searchQuery, setSearchQuery] = useState('');
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // delete or remove notes
    function handleDelete(noteId: number) {
        // if (!confirm('Are you sure you want to delete this note?')) return;

        router.delete(route('my-notes.destroy', noteId), {
            onSuccess: () => {
                console.log('Note deleted');
            },
            onError: () => {
                alert('Failed to delete the note');
            },
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Notes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {filteredNotes.length > 0 && (
                    <div className="flex items-center justify-between">
                        <input
                            type="search"
                            placeholder="Search notes..."
                            className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 transition focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <Link href={route('my-notes.create')}>
                            <Button variant="outline" className="cursor-pointer text-sm">
                                <PlusIcon className="h-5 w-5 text-primary" />
                                New Note
                            </Button>
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredNotes.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500">
                            <FileText className="mb-3 h-12 w-12 opacity-50" />
                            <p className="text-lg font-semibold">No notes found</p>
                            <p className="mt-1 text-sm text-gray-400">You haven't created any notes yet.</p>
                            <Link href={route('my-notes.create')}>
                                <Button variant="ghost" className="mt-4 cursor-pointer">
                                    Create your first note
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        filteredNotes.map((note) => (
                            <Card key={note.id}>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>{note.title}</CardTitle>
                                        <CardDescription>{note.date}</CardDescription>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="cursor-pointer rounded-full p-2 hover:bg-gray-100">
                                                <MoreVertical className="h-5 w-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => handleDelete(note.id)}
                                                className="group flex cursor-pointer items-center gap-2 text-red-500 hover:text-black focus:text-black"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500 group-hover:text-black group-focus:text-black" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500">{note.content}</p>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
