<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorController extends Controller
{
    /**
     * affiche la liste des auteurs
     */
    public function index()
    {
        $authors = Author::orderBy('name')->get(); // récupère tous les auteurs triés par nom

        return Inertia::render('Authors/Index', [
            'authors' => $authors,
        ]);
    }

    /**
     * affiche le formulaire de création d'un nouvel auteur.
     */
    public function create()
    {
        return Inertia::render('Authors/Create'); // page avec le formulaire
    }

    /**
     * traite la soumission du formulaire et stocke le nouvel auteur.
     */
    public function store(Request $request)
    {
        // validation simple
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:authors,name',
        ]);

        Author::create($validatedData); // crée l'auteur

        // redirige vers la liste des auteurs avec un message de succès (finalment yaura pas de message de succes)
        return redirect()
            ->route('authors.index')
            ->with('success', 'Auteur ajouté avec succès !');
    }

    /**
     * affiche forulaire d'édition
     */
    public function edit(Author $author)
    {
        return Inertia::render('Authors/Edit', [
            'author' => $author,
        ]);
    }

    /**
     * met à jour un auteur existant en base
     */
    public function update(Request $request, Author $author)
    {
        //validation du nom unique, sauf pour l'auteur courant
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:authors,name,' . $author->id,
        ]);

        $author->update($validatedData);

        return redirect()
            ->route('authors.index')
            ->with('success', 'Auteur mis à jour avec succès !');
    }

    /**
     *supprime un auteur.
     */
    public function destroy(Author $author)
    {

        $author->delete();

        return redirect()
            ->route('authors.index')
            ->with('success', 'Auteur supprimé avec succès !');
    }
}
