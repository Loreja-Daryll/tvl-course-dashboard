import { useState } from 'react';
import { User, Mail, Camera, ShieldCheck, Check, AlertTriangle } from 'lucide-react';
import { PageHeading, Toggle, initialsFrom } from '../components/shared';
import { student } from '../data/courseData';

const sections = [
  { id: 'profile', label: 'Profile' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Security' },
  { id: 'danger-zone', label: 'Danger Zone' },
];

function Field({ label, type = 'text', defaultValue, placeholder, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-cream/50">{label}</span>
      <div className="flex items-center gap-2.5 rounded-lg border border-charcoal-border bg-charcoal-soft px-3.5 py-2.5 transition-colors focus-within:border-gold-500/60">
        {Icon && <Icon size={14} className="flex-none text-cream/30" />}
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-cream placeholder:text-cream/30 focus:outline-none"
        />
      </div>
    </label>
  );
}

function SectionCard({ id, eyebrow, children }) {
  return (
    <div
      id={id}
      className="scroll-mt-24 rounded-2xl border border-charcoal-border bg-charcoal-card p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20 sm:p-7"
    >
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-gold-500">{eyebrow}</p>
      {children}
    </div>
  );
}

function SaveButton({ onClick, label = 'Save Changes', variant = 'solid' }) {
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    onClick?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const base =
    variant === 'solid'
      ? 'bg-gradient-to-r from-gold-500 to-gold-300 text-charcoal'
      : 'border border-gold-500 text-gold-300 hover:bg-gold-500 hover:text-charcoal';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`mt-5 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold-500/20 ${base}`}
    >
      {saved ? (
        <>
          <Check size={15} />
          Saved
        </>
      ) : (
        label
      )}
    </button>
  );
}

export default function Settings() {
  // TODO: replace with real update handlers wired to your API
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [replyNotifs, setReplyNotifs] = useState(true);
  const [announcementNotifs, setAnnouncementNotifs] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[180px_1fr]">
      {/* STICKY MINI NAV */}
      <nav className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:h-fit lg:flex-col lg:overflow-visible lg:pb-0">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex-none rounded-lg px-3 py-2 text-sm text-cream/50 transition-colors hover:bg-charcoal-soft hover:text-gold-300 lg:flex-auto"
          >
            {s.label}
          </a>
        ))}
      </nav>

      <div className="min-w-0 max-w-2xl">
        <PageHeading
          eyebrow="Account"
          title="Settings"
          subtitle="Manage your profile, notifications, and account security."
        />

        <div className="space-y-6">
          {/* PROFILE */}
          <SectionCard id="profile" eyebrow="Profile">
            <div className="mb-6 flex items-center gap-4">
              <div className="group relative flex h-16 w-16 flex-none cursor-pointer items-center justify-center rounded-full border-2 border-gold-500 bg-charcoal-soft font-serif text-xl text-gold-300">
                {initialsFrom(student.name)}
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-charcoal/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <Camera size={16} className="text-cream" />
                </div>
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm text-cream/90">
                  {student.name}
                  <span className="rounded-full border border-gold-500/40 bg-gold-500/5 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gold-300">
                    Member
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-cream/40">Member since {student.joinedDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" defaultValue={student.name} icon={User} />
              <Field label="Email Address" type="email" defaultValue={student.email} icon={Mail} />
            </div>
            <SaveButton />
          </SectionCard>

          {/* NOTIFICATIONS */}
          <SectionCard id="notifications" eyebrow="Notifications">
            <div className="divide-y divide-charcoal-border/70">
              <Toggle checked={emailNotifs} onChange={setEmailNotifs} label="Email me about course updates" />
              <Toggle checked={replyNotifs} onChange={setReplyNotifs} label="Notify me on discussion replies" />
              <Toggle
                checked={announcementNotifs}
                onChange={setAnnouncementNotifs}
                label="Notify me about new course announcements"
              />
            </div>
          </SectionCard>

          {/* SECURITY */}
          <SectionCard id="security" eyebrow="Security">
            <div className="mb-5 flex items-center gap-2 text-xs text-cream/40">
              <ShieldCheck size={14} className="text-gold-500" />
              Use a password you don't use anywhere else.
            </div>
            <div className="space-y-4">
              <Field label="Current Password" type="password" placeholder="••••••••" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="New Password" type="password" placeholder="••••••••" />
                <Field label="Confirm New Password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <SaveButton label="Update Password" variant="outline" />
          </SectionCard>

          {/* DANGER ZONE */}
          <div
            id="danger-zone"
            className="scroll-mt-24 rounded-2xl border border-rose-900/40 bg-rose-950/10 p-6 sm:p-7"
          >
            <p className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-rose-400/80">
              <AlertTriangle size={13} />
              Danger Zone
            </p>
            <p className="mb-4 text-xs text-cream/40">
              Deactivating your account will pause access to all courses and community discussions.
            </p>
            <button
              type="button"
              className="rounded-full border border-rose-900/50 px-5 py-2.5 text-sm font-semibold text-rose-400/90 transition-colors hover:bg-rose-950/40"
            >
              Deactivate Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
