import { Link } from 'react-router-dom';
import { Calculator, Megaphone, PenTool, Inbox, Palette, ArrowRight, Layers, BookOpen, Bell } from 'lucide-react';
import { GoldenWave, PageHeading, CircularProgress, AnimatedBar } from '../components/shared';
import { course, modules, catalogCourses } from '../data/courseData';

const catalogIcons = {
  calculator: Calculator,
  megaphone: Megaphone,
  pen: PenTool,
  inbox: Inbox,
  palette: Palette,
};

export default function MyCourses() {
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <div>
      <PageHeading
        eyebrow="My Courses"
        title="Continue where you left off"
        subtitle="Your enrolled course, plus what's coming next from The VA Library."
      />

      {/* CURRENT ENROLLED COURSE — premium hero treatment */}
      <Link
        to="/"
        className="animate-fade-up group relative block overflow-hidden rounded-2xl border border-charcoal-border bg-gradient-to-br from-charcoal-card to-charcoal-soft p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-xl hover:shadow-black/30 sm:p-10"
      >
        <GoldenWave className="pointer-events-none absolute -right-16 -top-16 h-[140%] w-2/3 opacity-60 transition-opacity duration-500 group-hover:opacity-90 sm:w-1/2" />

        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 sm:max-w-lg">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/50 bg-gold-500/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-300">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-[0_0_6px_2px_rgba(229,184,66,0.5)]" />
              Enrolled
            </span>

            <h2 className="mt-4 font-serif text-2xl leading-tight text-cream sm:text-3xl">
              {course.title}
            </h2>
            <p className="mt-1.5 text-sm text-cream/50">{course.instructor}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-cream/45">
              <span className="flex items-center gap-1.5">
                <Layers size={13} className="text-gold-500" />
                {modules.length} Modules
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={13} className="text-gold-500" />
                {totalLessons} Lessons
              </span>
            </div>

            <div className="mt-5 max-w-xs">
              <AnimatedBar percent={course.overallProgress} />
              <span className="mt-1.5 block text-xs text-cream/50">
                {course.overallProgress}% complete
              </span>
            </div>

            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
              Continue Learning
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>

          <div className="flex flex-none justify-center sm:justify-end">
            <CircularProgress percent={course.overallProgress} size={104} strokeWidth={8} />
          </div>
        </div>
      </Link>

      {/* CATALOG */}
      <div className="mb-5 mt-12 flex items-center gap-4">
        <p className="flex-none text-[11px] font-semibold uppercase tracking-widest text-gold-500">
          Explore More Courses
        </p>
        <div className="h-px flex-1 bg-gradient-to-r from-charcoal-border to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalogCourses.map((c, i) => {
          const Icon = catalogIcons[c.icon];
          return (
            <div
              key={c.id}
              style={{ animationDelay: `${100 + i * 80}ms` }}
              className="animate-fade-up group flex flex-col rounded-2xl border border-charcoal-border bg-charcoal-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-lg hover:shadow-black/20"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/5 text-gold-500 transition-transform duration-300 group-hover:scale-110">
                <Icon size={18} />
              </div>
              <h3 className="mt-4 text-sm font-medium text-cream">{c.title}</h3>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-cream/45">{c.desc}</p>

              <div className="mt-5 flex items-center justify-between">
                <span className="inline-block rounded-full border border-charcoal-border px-3 py-1 text-[10px] uppercase tracking-widest text-cream/40">
                  Coming Soon
                </span>
                <button
                  type="button"
                  className="flex items-center gap-1 text-[11px] font-medium text-cream/35 transition-colors hover:text-gold-300"
                >
                  <Bell size={12} />
                  Notify Me
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
