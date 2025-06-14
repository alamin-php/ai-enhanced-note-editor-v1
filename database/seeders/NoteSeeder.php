<?php

namespace Database\Seeders;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $now = Carbon::now();

        $notes = [
            [
                'title' => 'Meeting Summary',
                'content' => 'Summarized the key points discussed during the quarterly review meeting. Action items were assigned to the respective team members with deadlines.',
            ],
            [
                'title' => 'Project Plan Draft',
                'content' => 'Outlined the initial roadmap for the upcoming mobile app development project. Included timelines, major milestones, and resource allocation.',
            ],
            [
                'title' => 'Design Inspiration',
                'content' => 'Collected various design inspirations from Dribbble and Behance to be used for the client’s new website. Focused on minimalistic and clean design patterns.',
            ],
            [
                'title' => 'Client Feedback',
                'content' => 'Documented the client’s feedback from the last demo session. Main concerns include improving performance, simplifying the user onboarding process, and adding dark mode.',
            ],
            [
                'title' => 'Team Retrospective',
                'content' => 'Notes from the team retrospective meeting. Discussed what went well, areas to improve, and action items to enhance collaboration in future sprints.',
            ],
            [
                'title' => 'Bug Fix List',
                'content' => 'Compiled a list of critical and minor bugs reported by the QA team. Prioritized fixes for the payment gateway and user authentication modules.',
            ],
            [
                'title' => 'Learning Resources',
                'content' => 'Listed recommended articles, tutorials, and YouTube channels for learning advanced React concepts, TypeScript best practices, and performance optimization.',
            ],
            [
                'title' => 'Marketing Strategy',
                'content' => 'Drafted the digital marketing strategy for Q3. Includes SEO improvements, social media campaign ideas, and email newsletter plans.',
            ],
            [
                'title' => 'Code Review Comments',
                'content' => 'Summarized the comments provided during the last code review. Focused on maintaining consistent coding styles and improving component reusability.',
            ],
            [
                'title' => 'Feature Request',
                'content' => 'Documented new feature requests from end users. Includes suggestions for adding file export options, notifications customization, and multilingual support.',
            ],
            [
                'title' => 'Research Notes',
                'content' => 'Captured findings from research on emerging frontend technologies such as WebAssembly, server components in React, and the latest in Tailwind CSS.',
            ],
            [
                'title' => 'Deployment Checklist',
                'content' => 'Prepared a detailed checklist for production deployment. Includes environment variable setup, security checks, backup plans, and post-deployment monitoring.',
            ],
        ];

        foreach ($notes as $note) {
            DB::table('notes')->insert([
                'user_id' => 1, // Assign notes to user with ID 1
                'title' => $note['title'],
                'content' => $note['content'],
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
}
