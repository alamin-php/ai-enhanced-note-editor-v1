import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Sparkles, Undo2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Notes',
        href: '/my-notes',
    },
];

type Note = {
    id: number;
    title: string;
    content: string;
};

type Props = {
    note?: Note;
};

type FormData = {
    id: number | null;
    title: string;
    content: string;
};

export default function CreateOrEditNote({ note }: Props) {
    // Initialize form with proper type and initial data
    const { data, setData, post, put } = useForm<FormData>({
        id: note?.id ?? null,
        title: note?.title ?? 'Untitled Note',
        content: note?.content ?? '',
    });

    const [saving, setSaving] = useState(false);

    // Track last saved state to avoid unnecessary saves
    const lastSavedData = useRef({ title: data.title, content: data.content });

    // Disable buttons if title or content are empty after trim
    const isDisabled = !(data.title.trim() && data.content.trim());

    useEffect(() => {
        const titleChanged = data.title !== lastSavedData.current.title;
        const contentChanged = data.content !== lastSavedData.current.content;

        if (!data.title.trim() && !data.content.trim()) return;
        if (!titleChanged && !contentChanged) return;

        const timeout = setTimeout(() => {
            setSaving(true);

            if (data.id) {
                // Update existing note
                put(route('my-notes.update', data.id), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        lastSavedData.current = { title: data.title, content: data.content };
                        console.log('Auto-saved (updated)');
                    },
                    onError: () => console.error('Auto-save update failed'),
                    onFinish: () => setSaving(false),
                });
            } else {
                // Create new note
                post(route('my-notes.store'), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (res) => {
                        lastSavedData.current = { title: data.title, content: data.content };
                        console.log('Auto-saved (created)');
                        // Set the returned note id to form to switch to update mode
                        if (res.props?.note?.id) {
                            setData('id', res.props.note.id);
                        }
                    },
                    onError: () => console.error('Auto-save create failed'),
                    onFinish: () => setSaving(false),
                });
            }
        }, 1500);

        return () => clearTimeout(timeout);
    }, [data.title, data.content, data.id, post, put, setData]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={data.id ? 'Edit Note' : 'Create Note'} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-end gap-2">
                    <Link href={route('my-notes.index')}>
                        <Button variant="outline" className="cursor-pointer text-sm">
                            <Undo2Icon className="h-5 w-5 text-primary" />
                            Notes
                        </Button>
                    </Link>
                    <Button variant="outline" className="cursor-pointer text-sm" disabled={isDisabled}>
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span className="font-medium">AI Enhanced Editor</span>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-1">
                        <input
                            type="text"
                            placeholder="Enter note title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border-b border-gray-300 pb-1 text-lg font-semibold focus:ring-0 focus:outline-none"
                        />
                    </CardHeader>
                    <CardContent>
                        <textarea
                            rows={6}
                            placeholder="Start typing your note here..."
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm leading-relaxed transition focus:border-gray-300 focus:ring-0 focus:outline-none"
                            spellCheck={true}
                        />
                        {saving && <p className="mt-1 text-sm text-gray-500">Saving...</p>}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
