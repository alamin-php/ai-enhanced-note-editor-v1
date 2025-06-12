import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Note Managements',
        href: '/notes',
    },
];

export default function NoteManagement() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Note Managements" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-end">
                    <Link
                        href={route('notes.index')}
                        className="inline-block rounded bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-200"
                    >
                        Back
                    </Link>
                </div>

                <Card className="p-2">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                    </CardHeader>
                    <Label htmlFor="groupName">Group Name</Label>
                    <input
                        type="text"
                        placeholder='Enter note title'
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-xs focus:ring-0 focus:outline-none"
                    />
                </Card>
            </div>
        </AppLayout>
    );
}
