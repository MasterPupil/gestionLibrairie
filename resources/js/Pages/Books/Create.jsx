import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, authors, categories }) { // authors et categories sont passés par le contrôleur
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: '',
        author_id: '',
        category_id: '',
        publication_year: new Date().getFullYear().toString(), // Année actuelle par défaut
        description: '',
        isbn: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('books.store'));
    }

    return (
        // <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ajouter Livre</h2>}>
        <div>
            <Head title="Ajouter Livre" />
            <div className="container py-4">
                <h1>Ajouter un Livre</h1>

                {recentlySuccessful && (
                    <div className="alert alert-success mb-3">Livre ajouté !</div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Titre */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titre du livre</label>
                        <input
                            type="text"
                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>

                    {/* Auteur (Select) */}
                    <div className="mb-3">
                        <label htmlFor="author_id" className="form-label">Auteur</label>
                        <select
                            className={`form-select ${errors.author_id ? 'is-invalid' : ''}`}
                            id="author_id"
                            value={data.author_id}
                            onChange={(e) => setData('author_id', e.target.value)}
                        >
                            <option value="">Sélectionner un auteur</option>
                            {authors.map(author => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            ))}
                        </select>
                        {errors.author_id && <div className="invalid-feedback">{errors.author_id}</div>}
                    </div>

                    {/* Catégorie (Select) */}
                    <div className="mb-3">
                        <label htmlFor="category_id" className="form-label">Catégorie</label>
                        <select
                            className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <div className="invalid-feedback">{errors.category_id}</div>}
                    </div>

                    {/* Année de publication */}
                    <div className="mb-3">
                        <label htmlFor="publication_year" className="form-label">Année de publication</label>
                        <input
                            type="number" // Utiliser type number pour une meilleure sémantique et validation navigateur
                            className={`form-control ${errors.publication_year ? 'is-invalid' : ''}`}
                            id="publication_year"
                            value={data.publication_year}
                            onChange={(e) => setData('publication_year', e.target.value)}
                            min="1000" // Exemple de validation côté client
                            max={new Date().getFullYear()}
                        />
                        {errors.publication_year && <div className="invalid-feedback">{errors.publication_year}</div>}
                    </div>

                    {/* Description (Optionnel) */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description (Optionnel)</label>
                        <textarea
                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                            id="description"
                            rows="3"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        ></textarea>
                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>

                    {/* ISBN (Optionnel) */}
                    <div className="mb-3">
                        <label htmlFor="isbn" className="form-label">ISBN (Optionnel)</label>
                        <input
                            type="text"
                            className={`form-control ${errors.isbn ? 'is-invalid' : ''}`}
                            id="isbn"
                            value={data.isbn}
                            onChange={(e) => setData('isbn', e.target.value)}
                        />
                        {errors.isbn && <div className="invalid-feedback">{errors.isbn}</div>}
                    </div>


                    <div className="d-flex justify-content-end">
                        <Link href={route('books.index')} className="btn btn-secondary me-2">
                            Annuler
                        </Link>
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        // </AuthenticatedLayout>
    );
}
