import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreVertical, PlusIcon, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Notes',
        href: '/notes',
    },
];

type Note = {
    id: number;
    title: string;
    date: string;
    content: string;
};

export default function NoteManagement() {
    const [loading, setLoading] = useState<boolean>(true);
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        // simulate fetching data
        setTimeout(() => {
            setNotes([
                {
                    id: 1,
                    title: 'Meeting Summary',
                    date: 'Jun 14, 2025',
                    content:
                        'Summarized the key points discussed during the quarterly review meeting. Action items were assigned to the respective team members with deadlines.',
                },
                {
                    id: 2,
                    title: 'Project Plan Draft',
                    date: 'Jun 14, 2025',
                    content:
                        'Outlined the initial roadmap for the upcoming mobile app development project. Included timelines, major milestones, and resource allocation.',
                },
                {
                    id: 3,
                    title: 'Design Inspiration',
                    date: 'Jun 14, 2025',
                    content:
                        'Collected various design inspirations from Dribbble and Behance to be used for the client’s new website. Focused on minimalistic and clean design patterns.',
                },
                {
                    id: 4,
                    title: 'Client Feedback',
                    date: 'Jun 14, 2025',
                    content:
                        'Documented the client’s feedback from the last demo session. Main concerns include improving performance, simplifying the user onboarding process, and adding dark mode.',
                },
                {
                    id: 5,
                    title: 'Team Retrospective',
                    date: 'Jun 14, 2025',
                    content:
                        'Notes from the team retrospective meeting. Discussed what went well, areas to improve, and action items to enhance collaboration in future sprints.',
                },
                {
                    id: 6,
                    title: 'Bug Fix List',
                    date: 'Jun 14, 2025',
                    content:
                        'Compiled a list of critical and minor bugs reported by the QA team. Prioritized fixes for the payment gateway and user authentication modules.',
                },
                {
                    id: 7,
                    title: 'Learning Resources',
                    date: 'Jun 14, 2025',
                    content:
                        'Listed recommended articles, tutorials, and YouTube channels for learning advanced React concepts, TypeScript best practices, and performance optimization.',
                },
                {
                    id: 8,
                    title: 'Marketing Strategy',
                    date: 'Jun 14, 2025',
                    content:
                        'Drafted the digital marketing strategy for Q3. Includes SEO improvements, social media campaign ideas, and email newsletter plans.',
                },
                {
                    id: 9,
                    title: 'Code Review Comments',
                    date: 'Jun 14, 2025',
                    content:
                        'Summarized the comments provided during the last code review. Focused on maintaining consistent coding styles and improving component reusability.',
                },
                {
                    id: 10,
                    title: 'Feature Request',
                    date: 'Jun 14, 2025',
                    content:
                        'Documented new feature requests from end users. Includes suggestions for adding file export options, notifications customization, and multilingual support.',
                },
                {
                    id: 11,
                    title: 'Research Notes',
                    date: 'Jun 14, 2025',
                    content:
                        'Captured findings from research on emerging frontend technologies such as WebAssembly, server components in React, and the latest in Tailwind CSS.',
                },
                {
                    id: 12,
                    title: 'Deployment Checklist',
                    date: 'Jun 14, 2025',
                    content:
                        'Prepared a detailed checklist for production deployment. Includes environment variable setup, security checks, backup plans, and post-deployment monitoring.',
                },
            ]);
            setLoading(false);
        }, 1000); // 2 sec delay
    }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Notes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <input
                        type="search"
                        placeholder="Search notes..."
                        className="w-full max-w-md rounded-md border border-gray-300 px-4 py-2 text-sm placeholder-gray-400 transition focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                    />

                    <Link href={route('my-notes.create')}>
                        <Button variant="outline" className="cursor-po cursor-pointer text-sm">
                            <PlusIcon className="h-5 w-5 text-primary" />
                            New Note
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {loading
                        ? [...Array(8)].map((_, index) => (
                              <Card key={index}>
                                  <CardHeader>
                                      <Skeleton className="mb-2 h-6 w-3/4" />
                                      <Skeleton className="h-4 w-1/2" />
                                  </CardHeader>
                                  <CardContent>
                                      <Skeleton className="mb-2 h-4 w-full" />
                                      <Skeleton className="mb-2 h-4 w-5/6" />
                                      <Skeleton className="h-4 w-4/6" />
                                  </CardContent>
                              </Card>
                          ))
                        : notes.map((note) => (
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
                                                  onClick={() => console.log('Delete clicked')}
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
                          ))}
                </div>
            </div>
        </AppLayout>
    );
}
