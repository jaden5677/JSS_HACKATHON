import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { useAppData } from '@/app/state/AppData';

type CreateCategoryForm = {
  title: string;
  description: string;
  category: 'festival' | 'culture' | 'music' | 'food' | 'community';
  image: string;
};

export function Apply() {
  const navigate = useNavigate();
  const { addTopic } = useAppData();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
  } = useForm<CreateCategoryForm>({
    defaultValues: {
      category: 'community',
      image: '',
    },
  });

  const onSubmit = (data: CreateCategoryForm) => {
    try {
      const created = addTopic({
        title: data.title,
        description: data.description,
        category: data.category,
        image: data.image || undefined,
      });
      navigate(`/topic/${created.id}`);
    } catch (e) {
      setError('title', { message: e instanceof Error ? e.message : 'Could not create category.' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
              <PlusCircle size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Create a Category</h1>
              <p className="text-sm text-neutral-600">
                Categories are for Trinidad &amp; Tobago content only.
              </p>
            </div>
          </div>

          {isSubmitSuccessful && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-teal-50 text-teal-800 mb-6">
              <CheckCircle className="mt-0.5" size={18} />
              <div>
                <p className="font-semibold">Category created.</p>
                <p className="text-sm opacity-90">Taking you to the category page…</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
              <input
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g. Tobago Heritage, Local Food Spots, Pan Yard Tips"
                {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Min 3 characters' } })}
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
              <textarea
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 min-h-24 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="What should people post here?"
                {...register('description', { required: 'Description is required', minLength: { value: 10, message: 'Min 10 characters' } })}
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
              <select
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                {...register('category', { required: true })}
              >
                <option value="community">Community</option>
                <option value="culture">Culture</option>
                <option value="festival">Festival</option>
                <option value="music">Music</option>
                <option value="food">Food</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Image URL (optional)</label>
              <input
                className="w-full rounded-lg border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Leave blank to auto-generate"
                {...register('image')}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-teal-600 text-white font-semibold py-3 hover:bg-teal-700 transition-colors"
            >
              Create Category
            </button>

            <p className="text-xs text-neutral-500">
              Prototype note: categories and posts are saved in your browser (localStorage).
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
