<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * Get the books for the category.
     * Une catégorie peut avoir plusieurs livres.
     */
    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
