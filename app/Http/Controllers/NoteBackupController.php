<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteBackupController extends Controller
{
    public function exportTextRaw()
    {
        // Get the current user's ID
        $userId = Auth::id();
        $pdo = DB::getPdo();
        $stmt = $pdo->prepare("SELECT id, user_id, title, content, created_at, updated_at FROM notes WHERE user_id = :user_id ORDER BY id");
        $stmt->bindParam(':user_id', $userId, \PDO::PARAM_INT);
        $stmt->execute();

        $notes = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $filename = 'my_notes_backup_' . date('Y-m-d_H-i-s') . '.txt';
        $content = "ID\tUser ID\tTitle\tContent\tCreated At\tUpdated At\n";
        $content .= str_repeat('=', 80) . "\n";

        // Loop through results manually
        foreach ($notes as $note) {
            $title = str_replace(["\r", "\n"], [' ', ' '], $note['title']);
            $noteContent = str_replace(["\r", "\n"], [' ', ' '], $note['content']);

            $content .= "{$note['id']}\t{$note['user_id']}\t{$title}\t{$noteContent}\t{$note['created_at']}\t{$note['updated_at']}\n";
        }

        return response($content, 200, [
            'Content-Type' => 'text/plain',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ]);
    }
}
