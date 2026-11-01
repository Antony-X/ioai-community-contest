import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import RulesSection from '@/components/RulesSection';
import Footer from '@/components/Footer';
import ContestCard from '@/components/ContestCard';
import { ChevronRight } from 'lucide-react';
import { contests } from '@/data/contests.json';

const latestContest = contests
  .slice()
  .sort((a, b) => a.id - b.id)
  .filter((a) => !a.disabled)
  .at(-1);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <RulesSection />

        <section className="border-t border-black/[0.06] bg-white py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 flex items-end justify-between gap-6">
              <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.01em] text-neutral-900 md:text-4xl">
                Latest contest
              </h2>
              <button
                onClick={() => navigate('/contests')}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900"
              >
                All past contests
                <ChevronRight className="h-4 w-4 text-neutral-500" strokeWidth={1.5} />
              </button>
            </div>

            {latestContest && (
              <ContestCard
                month={latestContest.month}
                year={latestContest.year}
                title={latestContest.title}
                tasks={latestContest.tasks}
                roundId={latestContest.id}
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
