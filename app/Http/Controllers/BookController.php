<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author; 
use App\Models\Category; 
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule; // pour les règles de validation plus complexes si besoin

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) // Ajout de Request pour la recherche
    {
        $query = Book::with(['author', 'category']); 

        // Gestion de la recherche par titre
        if ($request->has('search') && $request->input('search') != '') {
            $query->where('title', 'LIKE', '%' . $request->input('search') . '%');
        }

        $books = $query->orderBy('title')->get(); // Ou ->paginate(10) pour la pagination

        return Inertia::render('Books/Index', [
            'books' => $books,
            'filters' => $request->only(['search']) // pour pré-remplir le champ de recherche
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $authors = Author::orderBy('name')->get();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Books/Create', [
            'authors' => $authors,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
            'publication_year' => 'required|integer|min:1000|max:' . date('Y'),
            'description' => 'nullable|string',
            'isbn' => 'nullable|string|max:20|unique:books,isbn',
        ]);

        Book::create($validatedData);

        return redirect()->route('books.index')->with('success', 'Livre ajouté avec succès !');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        $authors = Author::orderBy('name')->get();
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Books/Edit', [
            'book' => $book, // le livre à modifier
            'authors' => $authors,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'author_id' => 'required|exists:authors,id',
            'category_id' => 'required|exists:categories,id',
            'publication_year' => 'required|integer|min:1000|max:' . date('Y'),
            'description' => 'nullable|string',
            'isbn' => ['nullable', 'string', 'max:20', Rule::unique('books')->ignore($book->id)],
        ]);

        $book->update($validatedData);

        return redirect()->route('books.index')->with('success', 'Livre mis à jour avec succès !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->route('books.index')->with('success', 'Livre supprimé avec succès !');
    }
}
