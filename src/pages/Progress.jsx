import { useEffect, useState } from 'react';
import { BookOpen, Layers, Clock, Flame, Award, Lock, Sparkles } from 'lucide-react';
import { CircularProgress, PageHeading, AnimatedBar } from '../components/shared';
import { course, modules, progressStats, weeklyActivity, achievements, student } from '../data/courseData';

function StatCard({ icon: Icon, label, value, delay = 0 }) {
  return (
    <div
      style={{ animationDelay: `${delay}ms` }}
      className="animate-fade-up group rounded-2xl border border-charcoal-border bg-charcoal-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/25 hover:shadow-lg hover:shadow-black/20"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/5 text-gold-500 transition-transform duration-300 group-hover:scale-110">
        <Icon size={15} />
      </div>
      <p className="mt-3.5 font-serif text-2xl text-cream">{value}</p>
      <p className="mt-0.5 text-xs text-cream/45">{label}</p>
    </div>
  );
}

function ModuleProgressRow({ module, delay = 0 }) {
  const total = module.lessons.length;
  const completed = module.lessons.filter((l) => l.status === 'completed').length;
  const percent = Math.round((completed / total) * 100);

  return (
    <div style={{ animationDelay: `${delay}ms` }} className="animate-fade-up py-3.5">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-cream/80">{module.title}</span>
        <span className="text-xs text-cream/40">
          {completed}/{total} · {percent}%
        </span>
      </div>
      <AnimatedBar percent={percent} />
    </div>
  );
}

function WeeklyChart({ data }) {
  const [hovered, setHovered] = useState(null);
  const max = Math.max(...data.map((d) => d.minutes), 1);
  const bestDay = data.reduce((best, d) => (d.minutes > best.minutes ? d : best), data[0]);

  return (
    <div className="flex items-end justify-between gap-2 sm:gap-3" style={{ height: 160 }}>
      {data.map((d, i) => {
        const isBest = d.day === bestDay.day && d.minutes > 0;
        return (
          <div
            key={d.day}
            className="group relative flex flex-1 flex-col items-center gap-2"
            onMouseEnter={() => setHovered(d.day)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === d.day && (
              <div className="animate-fade-in absolute -top-8 rounded-md border border-gold-500/40 bg-charcoal px-2 py-1 text-[10px] font-medium text-cream shadow-lg">
                {d.minutes} min
              </div>
            )}
            <div className="flex h-32 w-full items-end overflow-hidden rounded-t-md">
              <div
                style={{
                  height: `${(d.minutes / max) * 100}%`,
                  minHeight: d.minutes ? 4 : 0,
                  transitionDelay: `${i * 60}ms`,
                }}
                className={`w-full rounded-t-md transition-all duration-700 ease-out ${
                  isBest
                    ? 'bg-gradient-to-t from-gold-500 to-gold-100'
                    : 'bg-gradient-to-t from-gold-700 to-gold-300 group-hover:from-gold-500 group-hover:to-gold-100'
                }`}
              />
            </div>
            <span
              className={`text-[10px] uppercase tracking-wide ${
                isBest ? 'font-semibold text-gold-400' : 'text-cream/40'
              }`}
            >
              {d.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function AchievementRow({ achievement, delay = 0 }) {
  return (
    <div style={{ animationDelay: `${delay}ms` }} className="animate-fade-up flex items-center gap-3">
      <div
        className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-transform duration-300 hover:scale-105 ${
          achievement.earned
            ? 'border-gold-500 bg-gradient-to-br from-gold-300 to-gold-500 text-charcoal shadow-[0_0_12px_1px_rgba(229,184,66,0.25)]'
            : 'border-charcoal-border text-cream/25'
        }`}
      >
        {achievement.earned ? <Award size={15} /> : <Lock size={13} />}
      </div>
      <div className="min-w-0 flex-1">
        <span className={`block text-sm ${achievement.earned ? 'text-cream/90' : 'text-cream/35'}`}>
          {achievement.label}
        </span>
      </div>
      {achievement.earned && (
        <span className="flex-none text-[10px] font-medium uppercase tracking-wide text-gold-500">
          Earned
        </span>
      )}
    </div>
  );
}

export default function Progress() {
  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div>
      <PageHeading
        eyebrow="Your Learning"
        title="Progress"
        subtitle="Track how far you've come and keep the momentum going."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* OVERALL PROGRESS RING */}
        <div className="animate-fade-up rounded-2xl border border-charcoal-border bg-gradient-to-br from-charcoal-card to-charcoal-soft p-6 text-center transition-shadow duration-300 hover:shadow-xl hover:shadow-black/20 lg:h-fit">
          <div className="flex justify-center">
            <CircularProgress percent={course.overallProgress} size={140} />
          </div>
          <p className="mt-4 text-sm text-cream/60">Overall course progress</p>
          <div className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 px-3 py-1 text-xs text-gold-300">
            <Flame size={12} />
            {progressStats.dayStreak}-day streak, {student.name}
          </div>
        </div>

        <div className="space-y-8">
          {/* STATS ROW */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard
              icon={BookOpen}
              label="Lessons Completed"
              value={`${progressStats.lessonsCompleted}/${progressStats.totalLessons}`}
              delay={0}
            />
            <StatCard
              icon={Layers}
              label="Modules Completed"
              value={`${progressStats.modulesCompleted}/${progressStats.totalModules}`}
              delay={80}
            />
            <StatCard icon={Clock} label="Hours Learned" value={progressStats.hoursLearned} delay={160} />
            <StatCard icon={Flame} label="Day Streak" value={progressStats.dayStreak} delay={240} />
          </div>

          {/* WEEKLY ACTIVITY */}
          <div className="animate-fade-up rounded-2xl border border-charcoal-border bg-charcoal-card p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
                This Week's Activity
              </p>
              <span className="text-[11px] text-cream/35">Hover a bar for details</span>
            </div>
            <WeeklyChart data={weeklyActivity} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* PER-MODULE PROGRESS */}
        <div className="rounded-2xl border border-charcoal-border bg-charcoal-card p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
            Module Breakdown
          </p>
          <div className="divide-y divide-charcoal-border/70">
            {modules.map((m, i) => (
              <ModuleProgressRow key={m.id} module={m} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="rounded-2xl border border-charcoal-border bg-charcoal-card p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
              Achievements
            </p>
            <span className="flex items-center gap-1 text-[11px] text-cream/40">
              <Sparkles size={12} className="text-gold-500" />
              {earnedCount}/{achievements.length}
            </span>
          </div>
          <div className="space-y-4">
            {achievements.map((a, i) => (
              <AchievementRow key={a.id} achievement={a} delay={i * 70} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
