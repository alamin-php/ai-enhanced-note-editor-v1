import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Sparkles, Undo2Icon } from 'lucide-react';
import { OpenAI } from 'openai'; // Import OpenAI package
import { useEffect, useRef, useState } from 'react';

const openai = new OpenAI({
    apiKey: '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', // Replace with your OpenAI API key (keep secret)
    dangerouslyAllowBrowser: true, // For browser-side testing only
});

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
    const { data, setData, post, put } = useForm<FormData>({
        id: note?.id ?? null,
        title: note?.title ?? 'Untitled Note',
        content: note?.content ?? '',
    });

    const [saving, setSaving] = useState(false);
    const lastSavedData = useRef({ title: data.title, content: data.content });
    const isDisabled = !(data.title.trim() && data.content.trim());

    const [aiLoading, setAiLoading] = useState(false);

    useEffect(() => {
        const titleChanged = data.title !== lastSavedData.current.title;
        const contentChanged = data.content !== lastSavedData.current.content;

        if (!data.title.trim() && !data.content.trim()) return;
        if (!titleChanged && !contentChanged) return;

        const timeout = setTimeout(() => {
            setSaving(true);

            if (data.id) {
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
                post(route('my-notes.store'), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (res) => {
                        lastSavedData.current = { title: data.title, content: data.content };
                        console.log('Auto-saved (created)');
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

    // AI Enhancement Function - Only Tags
    const runAiEnhancement = async () => {
        setAiLoading(true);

        const prompt = `Generate relevant comma-separated tags for this note:\n\n${data.content}`;

        const stream = await openai.chat.completions.create({
            model: 'gpt-4.1-nano-2025-04-14',
            messages: [{ role: 'user', content: prompt }],
            stream: true,
        });

        let finalOutput = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                finalOutput += content;
            }
        }

        // Append generated tags to existing note content
        const newContent = `${data.content}\n\nTags: ${finalOutput}`;
        setData('content', newContent);

        // Immediately manually save (because auto-save may miss this programmatic change)
        if (data.id) {
            put(route('my-notes.update', data.id), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    console.log('AI Tags auto-saved (updated)');
                    lastSavedData.current = { title: data.title, content: newContent };
                },
                onError: () => console.error('AI Tags auto-save update failed'),
            });
        } else {
            post(route('my-notes.store'), {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (res) => {
                    console.log('AI Tags auto-saved (created)');
                    if (res.props?.note?.id) {
                        setData('id', res.props.note.id);
                    }
                    lastSavedData.current = { title: data.title, content: newContent };
                },
                onError: () => console.error('AI Tags auto-save create failed'),
            });
        }

        setAiLoading(false);
    };

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
                    <Button
                        variant="outline"
                        className="cursor-pointer text-sm"
                        onClick={runAiEnhancement}
                        disabled={isDisabled || aiLoading}
                    >
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span className="font-medium">{aiLoading ? 'Generating...' : 'Generate Tags'}</span>
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
