import { useState } from 'react';
import { PageHeading, Toggle, initialsFrom } from '../components/shared';
import { student } from '../data/courseData';

function Field({ label, type = 'text', defaultValue, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-cream/50">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-charcoal-border bg-charcoal-soft px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold-500/60 focus:outline-none"
      />
    </label>
  );
}

export default function Settings() {
  // TODO: replace with real update handlers wired to your API
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [replyNotifs, setReplyNotifs] = useState(true);
  const [announcementNotifs, setAnnouncementNotifs] = useState(false);

  return (
    <div className="max-w-2xl">
      <PageHeading eyebrow="Account" title="Settings" subtitle="Manage your profile and notification preferences." />

      {/* PROFILE */}
      <div className="rounded-2xl border border-charcoal-border bg-charcoal-card p-6">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
          Profile
        </p>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 flex-none items-center justify-center rounded-full border-2 border-gold-500 bg-charcoal-soft font-serif text-xl text-gold-300">
            {initialsFrom(student.name)}
          </div>
          <div>
            <p className="text-sm text-cream/90">{student.name}</p>
            <p className="text-xs text-cream/40">Member since {student.joinedDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name" defaultValue={student.name} />
          <Field label="Email Address" type="email" defaultValue={student.email} />
        </div>
        <button
          type="button"
          className="mt-5 rounded-full bg-gradient-to-r from-gold-500 to-gold-300 px-5 py-2.5 text-sm font-semibold text-charcoal transition-transform hover:-translate-y-0.5"
        >
          Save Changes
        </button>
      </div>

      {/* NOTIFICATIONS */}
      <div className="mt-6 rounded-2xl border border-charcoal-border bg-charcoal-card p-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
          Notifications
        </p>
        <div className="divide-y divide-charcoal-border/70">
          <Toggle checked={emailNotifs} onChange={setEmailNotifs} label="Email me about course updates" />
          <Toggle checked={replyNotifs} onChange={setReplyNotifs} label="Notify me on discussion replies" />
          <Toggle
            checked={announcementNotifs}
            onChange={setAnnouncementNotifs}
            label="Notify me about new course announcements"
          />
        </div>
      </div>

      {/* PASSWORD */}
      <div className="mt-6 rounded-2xl border border-charcoal-border bg-charcoal-card p-6">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-widest text-gold-500">
          Change Password
        </p>
        <div className="space-y-4">
          <Field label="Current Password" type="password" placeholder="••••••••" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="New Password" type="password" placeholder="••••••••" />
            <Field label="Confirm New Password" type="password" placeholder="••••••••" />
          </div>
        </div>
        <button
          type="button"
          className="mt-5 rounded-full border border-gold-500 px-5 py-2.5 text-sm font-semibold text-gold-300 transition-colors hover:bg-gold-500 hover:text-charcoal"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
