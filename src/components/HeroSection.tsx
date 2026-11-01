import { ArrowRight, ExternalLink } from "lucide-react";
import data from "../data/contests.json";
import type { ContestsData } from "@/data/types";
import {
  TASK_TYPE_COLORS,
  TASK_TYPE_LABELS,
  splitTaskType,
  taskTypeColor,
} from "@/lib/taskTypes";

const DATA = data as ContestsData;
const filteredContests = DATA.contests
  .slice()
  .sort((a, b) => a.id - b.id)
  .filter((a) => !a.disabled);
const totalTasks =
  filteredContests.reduce((acc, c) => acc + c.tasks.length, 0) +
  (DATA.standaloneTasks?.length ?? 0);

const roundsNewestFirst = filteredContests.slice().reverse();

const HeroSection = () => {
  return (
    <section id="hero" className="bg-white pt-16">
      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-16">
        <div>
          <p className="text-sm text-neutral-500">AI Community Contest</p>
          <h1 className="mt-4 text-[40px] font-medium leading-[1.06] tracking-[-0.02em] text-neutral-900 md:text-[60px] md:tracking-[-0.03em]">
            Practice contests for AI olympiads
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-[30px] text-neutral-600">
            Monthly Kaggle rounds set by IOAI alumni. Sharpen your skills, learn
            from a community of 600+ members and prepare for the international
            level.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="https://discord.gg/7GfxrqRreY"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-aicc-purple px-5 font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition-[background-color,transform] duration-150 hover:bg-[#7a00e0] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aicc-purple"
            >
              Join the Discord to participate
              <ExternalLink className="h-4 w-4 opacity-80" strokeWidth={1.5} />
            </a>
            <a
              href="/contests"
              className="inline-flex h-12 items-center gap-2 rounded-[10px] border border-black/[0.08] bg-white px-5 font-medium text-neutral-900 transition-colors duration-150 hover:bg-neutral-50"
            >
              Past contests
              <ArrowRight className="h-4 w-4 text-neutral-500" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* The moment: every round so far, one dot per task, colored by domain */}
        <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          <div className="flex h-14 items-center justify-between border-b border-black/[0.06] px-5">
            <p className="text-[15px] font-medium text-neutral-900">Round archive</p>
            <p className="font-mono text-xs tabular-nums text-neutral-500">
              {filteredContests.length} rounds · {totalTasks} tasks
            </p>
          </div>

          <ul>
            {roundsNewestFirst.map((round, i) => (
              <li key={round.id}>
                <a
                  href="/contests"
                  className="grid h-10 grid-cols-[44px_1fr_auto] items-center px-5 transition-colors duration-150 hover:bg-neutral-50"
                >
                  <span className="font-mono text-xs tabular-nums text-neutral-500">
                    R{round.title.replace(/\D/g, "")}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-neutral-800">
                    {round.month} {round.year}
                    {i === 0 && (
                      <span className="text-xs font-medium text-aicc-purple">Latest</span>
                    )}
                  </span>
                  <span className="flex gap-2">
                    {round.tasks.map((task, t) => {
                      const types = splitTaskType(task.type);
                      return (
                        <span
                          key={t}
                          title={task.name}
                          className="flex w-[68px] items-center gap-1.5 font-mono text-xs text-neutral-600"
                        >
                          <span className="flex -space-x-0.5">
                            {types.map((type) => (
                              <span
                                key={type}
                                className="h-2 w-2 rounded-full ring-2 ring-white"
                                style={{ backgroundColor: taskTypeColor(type) }}
                              />
                            ))}
                          </span>
                          {types.map((type) => TASK_TYPE_LABELS[type.toUpperCase()] ?? type).join("+")}
                        </span>
                      );
                    })}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-black/[0.06] px-5 py-3">
            {Object.keys(TASK_TYPE_COLORS).map((key) => (
              <span key={key} className="flex items-center gap-1.5 text-xs text-neutral-500">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: TASK_TYPE_COLORS[key] }}
                />
                {TASK_TYPE_LABELS[key]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
