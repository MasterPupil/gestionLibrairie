<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo; //pour les relations

class Book extends Model
{
    use HasFactory;

    /**
     * Les attributs pouvant être remplis en masse.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'author_id',
        'category_id',
        'publication_year',
        'description',
        'isbn',
        // 'image_path',
    ];

    /**
     * Relation : Un livre appartient à un auteur.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    /**
     * Relation : Un livre appartient à une catégorie.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
