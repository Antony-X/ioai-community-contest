import { ExternalLink, BookOpen, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task, PracticeStatus } from "@/data/types";
import { TASK_TYPE_LABELS, splitTaskType, taskTypeColor } from "@/lib/taskTypes";

interface ContestCardProps {
    month: string;
    year: string;
    title: string;
    tasks: Task[];
    roundId: number;
    highlightQuery?: string;
}

const PRACTICE_STATUS_LABEL: Record<PracticeStatus, string> = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    legacy: "Legacy",
};

const getTaskSlug = (name: string) =>
    name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();

const isTaskMatch = (task: Task, query: string) => {
    const q = query.toLowerCase();
    return (
        task.name.toLowerCase().includes(q) ||
        task.type.toLowerCase().includes(q) ||
        (task.author?.toLowerCase().includes(q) ?? false)
    );
};

const BTN =
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors duration-150 whitespace-nowrap";

const ContestCard = ({
    month,
    year,
    title,
    tasks,
    roundId,
    highlightQuery,
}: ContestCardProps) => {
    const trimmedQuery = highlightQuery?.trim() ?? "";

    return (
        <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
            <div className="flex items-baseline justify-between gap-4 border-b border-black/[0.06] px-6 py-4">
                <h3 className="text-lg font-medium text-neutral-900">
                    {month} {year}
                </h3>
                <span className="font-mono text-xs text-neutral-500">{title}</span>
            </div>

            <ul className="divide-y divide-black/[0.06]">
                {tasks.map((task, idx) => {
                    const statusLabel = task.practiceStatus
                        ? PRACTICE_STATUS_LABEL[task.practiceStatus]
                        : undefined;
                    const isMatch = trimmedQuery
                        ? isTaskMatch(task, trimmedQuery)
                        : false;

                    const competitionLabel = task.source
                        ? "Solve on Kilonova"
                        : task.nitroJudge
                            ? "Nitro Judge"
                            : "Kaggle";
                    const competitionHref = task.source ?? task.nitroJudge ?? task.kaggle!;

                    return (
                        <li
                            key={idx}
                            className={cn(
                                "flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center",
                                isMatch && "bg-aicc-purple/5"
                            )}
                        >
                            <div className="min-w-0 flex-1">
                                <h4 className="truncate text-[15px] font-medium text-neutral-900">
                                    {task.name}
                                </h4>
                                <div className="mt-1 flex min-w-0 items-center gap-3 text-sm text-neutral-500">
                                    {splitTaskType(task.type).map((t) => (
                                        <span key={t} className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-neutral-600">
                                            <span
                                                className="h-2 w-2 rounded-full"
                                                style={{ backgroundColor: taskTypeColor(t) }}
                                            />
                                            {TASK_TYPE_LABELS[t.toUpperCase()] ?? t}
                                        </span>
                                    ))}
                                    {task.author && (
                                        <span className="min-w-0 truncate">
                                            by <span className="text-neutral-700">{task.author}</span>
                                        </span>
                                    )}
                                    {statusLabel && (
                                        <span className="shrink-0 text-neutral-500">· {statusLabel}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex shrink-0 gap-2">
                                <a
                                    href={competitionHref}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={cn(BTN, "border border-black/[0.08] bg-white text-neutral-900 hover:bg-neutral-50")}
                                >
                                    {competitionLabel}
                                    <ExternalLink className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.5} />
                                </a>
                                {task.blog ? (
                                    <a
                                        href={`/solutions/round-${roundId - 1}/${getTaskSlug(task.name)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={cn(BTN, "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900")}
                                    >
                                        <BookOpen className="h-4 w-4 text-neutral-500" strokeWidth={1.5} />
                                        Solution
                                    </a>
                                ) : task.solution === "todo" ? (
                                    <span className={cn(BTN, "cursor-default text-neutral-400")}>
                                        Solution soon
                                    </span>
                                ) : (
                                    <a
                                        href={task.solution}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={cn(BTN, "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900")}
                                    >
                                        <Github className="h-4 w-4 text-neutral-500" strokeWidth={1.5} />
                                        Notebook
                                    </a>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ContestCard;
