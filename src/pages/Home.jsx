import { useState } from 'react';
import { ChevronDown, Play, FileText, Lock, Check, Download, FolderOpen, Users, GraduationCap, MessageCircle } from 'lucide-react';
import { CircularProgress, GoldenWave, AnimatedBar } from '../components/shared';
import { student, course, modules, recentActivity, quickLinks } from '../data/courseData';

function LessonIcon({ type, status }) {
  const base = 'flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-transform duration-300';

  if (status === 'completed') {
    return (
      <div className={`${base} border-gold-500 bg-gold-500 text-charcoal`}>
        <Check size={16} strokeWidth={2.5} />
      </div>
    );
  }
  if (status === 'locked') {
    return (
      <div className={`${base} border-charcoal-border text-cream/30`}>
        <Lock size={14} />
      </div>
    );
  }
  return (
    <div className={`${base} border-gold-500/50 text-gold-500 group-hover:scale-110 group-hover:border-gold-500`}>
      {type === 'video' ? <Play size={14} /> : <FileText size={14} />}
    </div>
  );
}

function ResourceChip({ resource, delay = 0 }) {
  return (
    <a
      href={resource.url}
      style={{ animationDelay: `${delay}ms` }}
      className="animate-fade-in inline-flex items-center gap-1.5 rounded-full border border-charcoal-border bg-charcoal-soft px-3 py-1.5 text-xs text-cream/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500/60 hover:text-gold-300 hover:shadow-md hover:shadow-gold-500/5"
    >
      <Download size={12} />
      {resource.name}
      <span className="text-cream/35">· {resource.size}</span>
    </a>
  );
}

function LessonRow({ lesson }) {
  const isLocked = lesson.status === 'locked';

  return (
    <div className="group border-t border-charcoal-border/70 px-4 py-4 transition-colors duration-200 first:border-t-0 hover:bg-charcoal-soft/40 sm:px-6">
      <div className="flex items-center gap-4">
        <LessonIcon type={lesson.type} status={lesson.status} />

        <div className="min-w-0 flex-1">
          <p className={`truncate text-sm font-medium ${isLocked ? 'text-cream/40' : 'text-cream'}`}>
            {lesson.title}
          </p>
          <p className="mt-0.5 text-xs text-cream/40">{lesson.duration}</p>

          {lesson.status === 'active' && typeof lesson.progress === 'number' && lesson.progress > 0 && (
            <div className="mt-2 max-w-xs">
              <AnimatedBar percent={lesson.progress} />
            </div>
          )}
        </div>

        <div className="flex-none">
          {lesson.status === 'completed' && (
            <span className="text-xs font-medium text-gold-300">Completed</span>
          )}
          {lesson.status === 'active' && (
            <a
              href={lesson.videoUrl ?? '#'}
              className="inline-block rounded-full border border-gold-500 px-4 py-1.5 text-xs font-semibold text-gold-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-500 hover:text-charcoal hover:shadow-lg hover:shadow-gold-500/20"
            >
              {typeof lesson.progress === 'number' && lesson.progress > 0 ? 'Continue' : 'Start Lesson'}
            </a>
          )}
          {lesson.status === 'locked' && <Lock size={16} className="text-cream/25" />}
        </div>
      </div>

      {lesson.resources?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 pl-[3.25rem]">
          {lesson.resources.map((res, i) => (
            <ResourceChip key={res.name} resource={res} delay={i * 80} />
          ))}
        </div>
      )}
    </div>
  );
}

function ModuleCard({ module, defaultOpen = false, index = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const total = module.lessons.length;
  const completed = module.lessons.filter((l) => l.status === 'completed').length;

  return (
    <div
      style={{ animationDelay: `${index * 90}ms` }}
      className="animate-fade-up overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-card transition-all duration-300 hover:border-gold-500/25 hover:shadow-lg hover:shadow-black/20"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
            {module.title}
          </p>
          <p className="mt-1 text-xs text-cream/40">
            {completed} of {total} lessons complete
          </p>
        </div>
        <ChevronDown
          size={18}
          className={`flex-none text-cream/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Smooth height expand/collapse using the CSS grid-rows trick —
          no JS height measurement needed, works with any content length. */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {module.lessons.map((lesson) => (
            <LessonRow key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
}

const quickLinkIcons = { download: Download, folder: FolderOpen, users: Users };

function QuickLinksBar({ links }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {links.map((link, i) => {
        const Icon = quickLinkIcons[link.icon];
        return (
          <a
            key={link.label}
            href={link.url}
            style={{ animationDelay: `${i * 90}ms` }}
            className="animate-fade-up group flex items-center gap-3 rounded-xl border border-charcoal-border bg-charcoal-card px-4 py-3.5 text-sm text-cream/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500/50 hover:text-gold-300 hover:shadow-md hover:shadow-black/20"
          >
            <Icon size={16} className="text-gold-500 transition-transform duration-200 group-hover:scale-110" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

const activityIcons = { graduation: GraduationCap, message: MessageCircle };

function RecentActivity({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const Icon = activityIcons[item.icon];
        return (
          <div
            key={item.title}
            style={{ animationDelay: `${400 + i * 100}ms` }}
            className="animate-fade-up flex items-start gap-3"
          >
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-gold-500/40 text-gold-500">
              <Icon size={15} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm text-cream/90">{item.title}</p>
              <p className="truncate text-xs text-cream/40">{item.subtitle}</p>
              <p className="mt-0.5 text-[11px] text-cream/30">{item.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
      {/* LEFT / CENTER COLUMN */}
      <div className="min-w-0 space-y-8">
        {/* CURRENT COURSE HERO */}
        <div className="animate-fade-up relative overflow-hidden rounded-2xl border border-charcoal-border bg-charcoal-card p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/20 sm:p-8">
          <GoldenWave className="pointer-events-none absolute -right-10 -top-10 h-full w-2/3 opacity-70 sm:w-1/2" />
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
              Current Course
            </p>
            <h1 className="mt-2 max-w-lg font-serif text-3xl leading-tight text-cream sm:text-4xl">
              {course.title}
            </h1>
            <div className="mt-4 h-px w-16 bg-gold-500" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-cream/50">
              {course.subtitle}
            </p>
            <p className="mt-1 text-sm text-cream/60">{course.instructor}</p>
          </div>
        </div>

        {/* MODULES */}
        <div className="space-y-4">
          {modules.map((module, i) => (
            <ModuleCard key={module.id} module={module} defaultOpen={i < 2} index={i + 1} />
          ))}
        </div>

        {/* COURSE RESOURCES */}
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
            Course Resources
          </p>
          <QuickLinksBar links={quickLinks} />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
        <div
          style={{ animationDelay: '150ms' }}
          className="animate-fade-up rounded-2xl border border-charcoal-border bg-charcoal-card p-6 text-center transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20"
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
            Your Progress
          </p>
          <div className="flex justify-center">
            <CircularProgress percent={course.overallProgress} />
          </div>
          <p className="mt-4 text-xs text-cream/45">Keep going, {student.name}.</p>
        </div>

        <div
          style={{ animationDelay: '250ms' }}
          className="animate-fade-up rounded-2xl border border-charcoal-border bg-charcoal-card p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
            Recent Activity
          </p>
          <RecentActivity items={recentActivity} />
        </div>
      </div>
    </div>
  );
}
