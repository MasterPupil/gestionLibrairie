import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ auth, author }) { 
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: author.name || '', 
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('authors.update', author.id)); // utilise méthode PUT et l'ID de l'auteur
    }

    return (
        // <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modifier Auteur</h2>}>
        <div>
            <Head title="Modifier Auteur" />

            <div className="container py-4">
                <h1>Modifier l'Auteur</h1>

                {recentlySuccessful && (
                    <div className="alert alert-success mb-3">
                        Auteur mis à jour !
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nom de l'auteur</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link href={route('authors.index')} className="btn btn-secondary me-2">
                            Annuler
                        </Link>
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                            {processing ? 'Mise à jour...' : 'Mettre à jour'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        // </AuthenticatedLayout>
    );
}
