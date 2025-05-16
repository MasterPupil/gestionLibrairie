import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('authors.store')); // Envoie les données au backend
    }

    return (
        // <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ajouter un Auteur</h2>}>
        <div>
            <Head title="Ajouter Auteur" />

            <div className="container py-4">
                <h1>Ajouter un Auteur</h1>

                {recentlySuccessful && (
                    <div className="alert alert-success mb-3">Auteur ajouté !</div>
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
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        // </AuthenticatedLayout>
    );
}