import { useNavigate } from 'react-router-dom';
import type { Category } from '../types';
import CategoryCard from '../components/CategoryCard';

const CATEGORIES: Category[] = ['yoga', 'stretching', 'rehab', 'physiotherapy'];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen px-4 pt-12 pb-8 max-w-lg mx-auto">
      <div className="animate-fade-in">
        <h1 className="font-display text-5xl text-green-900 leading-tight">
          Yoga Me
        </h1>
        <p className="mt-2 text-gray-500 text-base">
          Choose your practice and begin.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {CATEGORIES.map(cat => (
          <CategoryCard
            key={cat}
            category={cat}
            onClick={() => navigate(`/setup?category=${cat}`)}
          />
        ))}
      </div>

      <p className="mt-auto pt-10 text-center text-xs text-gray-400">
        {new Date().getFullYear()} · Move well, feel better.
      </p>
    </div>
  );
}
