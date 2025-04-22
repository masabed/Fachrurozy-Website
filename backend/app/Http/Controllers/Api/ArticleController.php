<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Gate;

class ArticleController extends Controller
{
    /**
     * ✅ Display all articles (Public).
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', null);

        $articles = $limit 
            ? Article::latest()->limit($limit)->get()
            : Article::latest()->get();

        // ✅ Ensure public image & markdown file URL
        $articles->transform(function ($article) {
            $article->image = $article->image ? asset("storage/{$article->image}") : null;
            $article->content_url = $article->content ? asset("storage/{$article->content}") : null;
            return $article;
        });

        return response()->json($articles);
    }

    /**
     * ✅ Fetch a single article by ID (Public).
     */
    public function show($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }

        // ✅ Ensure public image & markdown file URL
        $article->image = $article->image ? asset("storage/{$article->image}") : null;
        $article->content_url = $article->content ? asset("storage/{$article->content}") : null;

        return response()->json($article);
    }

    /**
     * ✅ Store a newly created article (Only Users with `addArtikel` permission).
     */
    public function store(Request $request)
    {
        $this->authorizePermission('addArtikel'); // ✅ Check permission

        $request->validate([
            'title'    => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'content_file' => 'required|file|mimes:md|max:5120', // ✅ Accept only .md files
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('articles/images', 'public');
        }

        $mdPath = null;
        if ($request->hasFile('content_file')) {
            $mdPath = $request->file('content_file')->store('articles/md', 'public');
        }

        $article = Article::create([
            'title'           => $request->title,
            'category'        => $request->category,
            'created_by_name' => Auth::user()->name,
            'image'           => $imagePath ? "articles/images/" . basename($imagePath) : null,
            'content'         => $mdPath ? "articles/md/" . basename($mdPath) : null,
        ]);

        return response()->json([
            'message' => 'Article created successfully',
            'article' => [
                'id'              => $article->id,
                'title'           => $article->title,
                'category'        => $article->category,
                'created_by_name' => $article->created_by_name,
                'image'           => $article->image ? asset("storage/{$article->image}") : null,
                'content_url'     => $article->content ? asset("storage/{$article->content}") : null,
                'created_at'      => $article->created_at,
                'updated_at'      => $article->updated_at,
            ]
        ], 201);
    }

    /**
     * ✅ Update an article (Only Users with `editArtikel` permission).
     */
    public function update(Request $request, $id)
    {
        $this->authorizePermission('editArtikel'); // ✅ Check permission

        $article = Article::findOrFail($id);

        $request->validate([
            'title'    => 'sometimes|string|max:255',
            'category' => 'sometimes|string|max:100',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'content_file' => 'nullable|file|mimes:md|max:5120',
        ]);

        // ✅ Handle new image upload
        if ($request->hasFile('image')) {
            if ($article->image) {
                Storage::disk('public')->delete($article->image);
            }
            $imagePath = $request->file('image')->store('articles/images', 'public');
            $article->image = "articles/images/" . basename($imagePath);
        }

        // ✅ Handle new markdown file upload
        if ($request->hasFile('content_file')) {
            if ($article->content) {
                Storage::disk('public')->delete($article->content);
            }
            $mdPath = $request->file('content_file')->store('articles/md', 'public');
            $article->content = "articles/md/" . basename($mdPath);
        }

        $article->update($request->only(['title', 'category', 'image', 'content']));

        return response()->json(['message' => 'Article updated successfully', 'article' => $article]);
    }

    /**
     * ✅ Delete an article (Only Users with `deleteArtikel` permission).
     */
    public function destroy($id)
    {
        $this->authorizePermission('deleteArtikel'); // ✅ Check permission

        $article = Article::findOrFail($id);

        if ($article->image) {
            Storage::disk('public')->delete($article->image);
        }
        if ($article->content) {
            Storage::disk('public')->delete($article->content);
        }

        $article->delete();
        return response()->json(['message' => 'Article deleted successfully']);
    }

    /**
     * ✅ Helper function to check user permission.
     */
    private function authorizePermission($permission)
    {
        if (!Auth::user()->can($permission)) {
            abort(403, 'Unauthorized action.');
        }
    }
}
