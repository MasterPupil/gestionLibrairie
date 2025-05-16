<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Importe le trait HasFactory
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory; // Utilise le trait HasFactory pour permettre l'utilisation des factories

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', // Seul l'attribut 'name' peut être assigné massivement pour l'instant
    ];

    /**
     * Get the books for the author.
     * Un auteur peut avoir plusieurs livres.
     */
    // public function books() // Décommenter et compléter si tu ajoutes la relation plus tard
    // {
    //     return $this->hasMany(Book::class);
    // }
}
