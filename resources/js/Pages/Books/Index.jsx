import React, { useState } from 'react'; // useEffect n'était pas utilisé, je l'ai enlevé.
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Import du layout

export default function Index({ auth, books, filters }) { // 'auth', 'books', 'filters' sont des props
    const { props } = usePage();
    const flash = props.flash || {};
    const { delete: destroyBook, processing: deleting } = useForm();

    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    function handleDelete(bookId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
            destroyBook(route('books.destroy', bookId), {
                preserveScroll: true,
            });
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        router.get(route('books.index'), { search: searchTerm }, {
            preserveState: true,
            replace: true,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user} // Passer l'objet utilisateur
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Gestion des Livres</h2>} // Définir l'en-tête
        >
            <Head title="Livres" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fs-5">Liste des Livres</h3>
                                <Link href={route('books.create')} className="btn btn-primary btn-sm">
                                    Ajouter un Livre
                                </Link>
                            </div>

                            {flash.success && (
                                <div className="alert alert-success mb-3">
                                    {flash.success}
                                </div>
                            )}
                            {flash.error && (
                                <div className="alert alert-danger mb-3">
                                    {flash.error}
                                </div>
                            )}

                            <form onSubmit={handleSearch} className="mb-3">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Rechercher par titre..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className="btn btn-outline-secondary" type="submit">
                                        Rechercher
                                    </button>
                                    {searchTerm && (
                                        <button
                                            className="btn btn-outline-danger"
                                            type="button"
                                            onClick={() => {
                                                setSearchTerm('');
                                                router.get(route('books.index'), {}, { preserveState: true, replace: true });
                                            }}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Adapte la condition et le map en fonction de si 'books' est un objet de pagination ou un simple array */}
                            {(books.data ? books.data.length > 0 : books.length > 0) ? (
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Titre</th>
                                                <th>Auteur</th>
                                                <th>Catégorie</th>
                                                <th>Année Pub.</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(books.data || books).map((book) => ( // Utilise books.data si c'est un objet de pagination
                                                <tr key={book.id}>
                                                    <td>{book.title}</td>
                                                    <td>{book.author ? book.author.name : 'N/A'}</td>
                                                    <td>{book.category ? book.category.name : 'N/A'}</td>
                                                    <td>{book.publication_year}</td>
                                                    <td>
                                                        <Link
                                                            href={route('books.edit', book.id)}
                                                            className="btn btn-sm btn-outline-secondary me-2"
                                                        >
                                                            Modifier
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(book.id)}
                                                            className="btn btn-sm btn-outline-danger"
                                                            disabled={deleting}
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>Aucun livre trouvé. Essayez d'affiner votre recherche ou <Link href={route('books.create')}>ajoutez-en un nouveau</Link>.</p>
                            )}

                            {/* Section pour les liens de pagination (si 'books' est un objet de pagination) */}
                            {books.links && books.links.length > 3 && (
                                <nav className="mt-4">
                                    <ul className="pagination">
                                        {books.links.map((link, index) => (
                                            <li key={index} className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}>
                                                {/* Utilise dangerouslySetInnerHTML pour les labels qui peuvent contenir des entités HTML comme &laquo; */}
                                                <Link className="page-link" href={link.url || '#'} dangerouslySetInnerHTML={{ __html: link.label }} />
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
