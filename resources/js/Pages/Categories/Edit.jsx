import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Adapte si besoin

export default function Edit({ auth, category }) { // "category" est passé par le contrôleur
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: category.name || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('categories.update', category.id));
    }

    return (
        // <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Modifier Catégorie</h2>}>
        <div>
            <Head title="Modifier Catégorie" />

            <div className="container py-4">
                <h1>Modifier la Catégorie</h1>

                {recentlySuccessful && ( // Ou utiliser le flash message global
                    <div className="alert alert-success mb-3">
                        Catégorie mise à jour !
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nom de la catégorie</label>
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
                        <Link href={route('categories.index')} className="btn btn-secondary me-2">
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
