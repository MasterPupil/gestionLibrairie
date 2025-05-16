import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Assure-toi que cet import est correct

export default function Index({ auth, authors }) { // 'auth' et 'authors' sont des props passées par le contrôleur Laravel
    const { props } = usePage(); // Pour accéder à toutes les props, y compris les messages flash
    const flash = props.flash || {}; // S'assurer que flash est un objet, même s'il est vide

    const { delete: destroyAuthor, processing } = useForm(); // Pour la suppression

    function handleDelete(authorId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet auteur ?')) {
            destroyAuthor(route('authors.destroy', authorId), {
                preserveScroll: true, // Garde la position de défilement après redirection
            });
        }
    }

    return (
        // C'est ici la partie cruciale : on enveloppe tout dans AuthenticatedLayout
        <AuthenticatedLayout
            user={auth.user} // On passe l'objet utilisateur connecté
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Gestion des Auteurs</h2>} // L'en-tête pour cette page
        >
            <Head title="Auteurs" /> {/* Pour le titre de l'onglet du navigateur */}

            {/* Contenu spécifique à la page des auteurs */}
            <div className="py-12"> {/* Classes de style de Breeze/Tailwind pour l'espacement */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> {/* Conteneur principal */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Titre de la section et bouton d'ajout */}
                            <div className="d-flex justify-content-between align-items-center mb-4"> {/* Classes Bootstrap pour l'alignement */}
                                <h3 className="fs-5">Liste des Auteurs</h3>
                                <Link href={route('authors.create')} className="btn btn-primary btn-sm"> {/* Bouton Bootstrap */}
                                    Ajouter un Auteur
                                </Link>
                            </div>

                            {/* Affichage des messages flash (succès/erreur) */}
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

                            {/* Liste des auteurs */}
                            {authors.length > 0 ? (
                                <ul className="list-group"> {/* Liste Bootstrap */}
                                    {authors.map((author) => (
                                        <li key={author.id} className="list-group-item d-flex justify-content-between align-items-center dark:bg-gray-700 dark:text-gray-300">
                                            {author.name}
                                            <div>
                                                <Link
                                                    href={route('authors.edit', author.id)}
                                                    className="btn btn-sm btn-outline-secondary me-2" // Boutons Bootstrap
                                                >
                                                    Modifier
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(author.id)}
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
                                <p>Aucun auteur trouvé.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
