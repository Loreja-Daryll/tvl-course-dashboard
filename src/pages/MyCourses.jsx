import { Link } from 'react-router-dom';
import { Calculator, Megaphone, PenTool, Inbox, Palette, ArrowRight } from 'lucide-react';
import { GoldenWave, PageHeading } from '../components/shared';
import { course, catalogCourses } from '../data/courseData';

const catalogIcons = {
  calculator: Calculator,
  megaphone: Megaphone,
  pen: PenTool,
  inbox: Inbox,
  palette: Palette,
};

export default function MyCourses() {
  return (
    <div>
      <PageHeading
        eyebrow="My Courses"
        title="Continue where you left off"
        subtitle="Your enrolled course, plus what's coming next from The VA Library."
      />

      {/* CURRENT ENROLLED COURSE */}
      <Link
        to="/"
        className="group relative block overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-card p-6 transition-colors hover:border-gold-500/50 sm:p-8"
      >
        <GoldenWave className="pointer-events-none absolute -right-10 -top-10 h-full w-2/3 opacity-70 sm:w-1/2" />
        <div className="relative">
          <span className="inline-block rounded-full border border-gold-500/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-300">
            Enrolled
          </span>
          <h2 className="mt-3 max-w-lg font-serif text-2xl text-cream sm:text-3xl">
            {course.title}
          </h2>
          <p className="mt-1 text-sm text-cream/50">{course.instructor}</p>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-charcoal-border/70">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
                style={{ width: `${course.overallProgress}%` }}
              />
            </div>
            <span className="text-xs text-cream/50">{course.overallProgress}% complete</span>
          </div>

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
            Continue Learning
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>

      {/* CATALOG */}
      <p className="mb-3 mt-10 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
        Explore More Courses
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalogCourses.map((c) => {
          const Icon = catalogIcons[c.icon];
          return (
            <div
              key={c.id}
              className="rounded-2xl border border-charcoal-border bg-charcoal-card p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 text-gold-500">
                <Icon size={18} />
              </div>
              <h3 className="mt-4 text-sm font-medium text-cream">{c.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-cream/45">{c.desc}</p>
              <span className="mt-4 inline-block rounded-full border border-charcoal-border px-3 py-1 text-[10px] uppercase tracking-widest text-cream/40">
                Coming Soon
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
