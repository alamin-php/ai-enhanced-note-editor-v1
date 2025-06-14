import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Sparkles, Undo2Icon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Notes',
        href: '/notes',
    },
];

export default function NoteManagement() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Note" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-end gap-2">
                    <Link href={route('my-notes.index')}>
                        <Button variant="outline" className="cursor-po cursor-pointer text-sm">
                            <Undo2Icon className="h-5 w-5 text-primary" />
                            Notes
                        </Button>
                    </Link>
                    <Button variant="outline" className="cursor-po cursor-pointer text-sm">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <span className="font-medium">AI Enhanced Editor</span>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="flex flex-col gap-1">
                        <input
                            type="text"
                            defaultValue="Untitled Note"
                            placeholder="Enter note title"
                            className="w-full border-b border-gray-300 pb-1 text-lg font-semibold focus:ring-0 focus:outline-none"
                        />
                    </CardHeader>
                    <CardContent>
                        <textarea
                            rows={6}
                            placeholder="Start typing your note here..."
                            className="w-full resize-y rounded-md border border-gray-300 px-3 py-2 text-sm leading-relaxed transition focus:border-gray-300 focus:ring-0 focus:outline-none"
                            spellCheck={true}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
