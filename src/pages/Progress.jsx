import { BookOpen, Layers, Clock, Flame, Award, Lock } from 'lucide-react';
import { CircularProgress, PageHeading } from '../components/shared';
import { course, modules, progressStats, weeklyActivity, achievements } from '../data/courseData';

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-charcoal-border bg-charcoal-card p-5">
      <Icon size={17} className="text-gold-500" />
      <p className="mt-3 font-serif text-2xl text-cream">{value}</p>
      <p className="mt-0.5 text-xs text-cream/45">{label}</p>
    </div>
  );
}

function ModuleProgressRow({ module }) {
  const total = module.lessons.length;
  const completed = module.lessons.filter((l) => l.status === 'completed').length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="py-3">
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-cream/80">{module.title}</span>
        <span className="text-xs text-cream/40">{percent}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-charcoal-border/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function WeeklyChart({ data }) {
  const max = Math.max(...data.map((d) => d.minutes), 1);
  return (
    <div className="flex items-end justify-between gap-2 sm:gap-3" style={{ height: 140 }}>
      {data.map((d) => (
        <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-28 w-full items-end">
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-gold-700 to-gold-300"
              style={{ height: `${(d.minutes / max) * 100}%`, minHeight: d.minutes ? 4 : 0 }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-wide text-cream/40">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

export default function Progress() {
  return (
    <div>
      <PageHeading
        eyebrow="Your Learning"
        title="Progress"
        subtitle="Track how far you've come and keep the momentum going."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* OVERALL PROGRESS RING */}
        <div className="rounded-2xl border border-charcoal-border bg-charcoal-card p-6 text-center lg:h-fit">
          <div className="flex justify-center">
            <CircularProgress percent={course.overallProgress} size={140} />
          </div>
          <p className="mt-4 text-sm text-cream/60">Overall course progress</p>
        </div>

        <div className="space-y-8">
          {/* STATS ROW */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard
              icon={BookOpen}
              label="Lessons Completed"
              value={`${progressStats.lessonsCompleted}/${progressStats.totalLessons}`}
            />
            <StatCard
              icon={Layers}
              label="Modules Completed"
              value={`${progressStats.modulesCompleted}/${progressStats.totalModules}`}
            />
            <StatCard icon={Clock} label="Hours Learned" value={progressStats.hoursLearned} />
            <StatCard icon={Flame} label="Day Streak" value={progressStats.dayStreak} />
          </div>

          {/* WEEKLY ACTIVITY */}
          <div className="rounded-2xl border border-charcoal-border bg-charcoal-card p-6">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
              This Week's Activity
            </p>
            <WeeklyChart data={weeklyActivity} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* PER-MODULE PROGRESS */}
        <div className="rounded-2xl border border-charcoal-border bg-charcoal-card p-6">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
            Module Breakdown
          </p>
          <div className="divide-y divide-charcoal-border/70">
            {modules.map((m) => (
              <ModuleProgressRow key={m.id} module={m} />
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="rounded-2xl border border-charcoal-border bg-charcoal-card p-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
            Achievements
          </p>
          <div className="space-y-3">
            {achievements.map((a) => (
              <div key={a.id} className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border ${
                    a.earned ? 'border-gold-500 bg-gold-500 text-charcoal' : 'border-charcoal-border text-cream/25'
                  }`}
                >
                  {a.earned ? <Award size={15} /> : <Lock size={13} />}
                </div>
                <span className={`text-sm ${a.earned ? 'text-cream/90' : 'text-cream/35'}`}>
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
