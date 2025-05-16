import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Import du layout

export default function Index({ auth, categories }) { // 'auth' et 'categories' sont des props
    const { props } = usePage();
    const flash = props.flash || {};
    const { delete: destroyCategory, processing } = useForm();

    function handleDelete(categoryId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Les livres associés pourraient être affectés.')) {
            destroyCategory(route('categories.destroy', categoryId), {
                preserveScroll: true,
            });
        }
    }

    return (
        <AuthenticatedLayout
            user={auth.user} // Passer l'objet utilisateur
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Gestion des Catégories</h2>} // Définir l'en-tête
        >
            <Head title="Catégories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fs-5">Liste des Catégories</h3>
                                <Link href={route('categories.create')} className="btn btn-primary btn-sm">
                                    Ajouter une Catégorie
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

                            {categories.length > 0 ? (
                                <ul className="list-group">
                                    {categories.map((category) => (
                                        <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center dark:bg-gray-700 dark:text-gray-300">
                                            {category.name}
                                            <div>
                                                <Link
                                                    href={route('categories.edit', category.id)}
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                >
                                                    Modifier
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(category.id)}
                                                    className="btn btn-sm btn-outline-danger"
                                                    disabled={processing}
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Aucune catégorie trouvée.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
