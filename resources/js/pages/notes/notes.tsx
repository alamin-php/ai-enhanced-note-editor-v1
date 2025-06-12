import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
                        href={route('notes.create')}
                        className="inline-block rounded bg-black px-4 py-2 text-sm font-medium text-white transition-colors duration-200"
                    >
                        Create Note
                    </Link>
                </div>

                <Card className="p-2">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Content</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Note title will be go here</TableCell>
                                <TableCell>Content will be go here</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
