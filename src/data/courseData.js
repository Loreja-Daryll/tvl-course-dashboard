/* =========================================================================
   MOCK DATA
   -------------------------------------------------------------------------
   Everything in this file is placeholder data. Replace each export with
   data fetched from your API / CMS / auth session. The shapes are kept
   deliberately simple so swapping in real data is a drop-in change.
   ========================================================================= */

// TODO: replace with the authenticated user from your auth/session state
export const student = {
  name: 'Maria',
  email: 'maria@example.com',
  initials: 'M',
  joinedDate: 'June 2026',
};

// TODO: replace with the course record fetched by course ID / slug
export const course = {
  title: 'VA Big Sis: AI Mastery for Virtual Assistants',
  subtitle: 'Become the VA Clients Fight to Hire',
  instructor: 'Sheena May Laguerta',
  overallProgress: 68,
};

// TODO: replace with modules + lessons fetched for this course
export const modules = [
  {
    id: 'module-1',
    title: 'Module 1: Foundations',
    lessons: [
      {
        id: 'l1',
        title: 'Welcome & Mindset Shift',
        type: 'video',
        duration: '12 min',
        status: 'completed',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        resources: [
          { name: 'Welcome Workbook.pdf', type: 'pdf', size: '1.2 MB', url: '#' },
        ],
      },
      {
        id: 'l2',
        title: 'Defining Your VA Niche',
        type: 'worksheet',
        duration: '20 min',
        status: 'active',
        progress: 75,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        resources: [
          { name: 'Niche Finder Template.pdf', type: 'pdf', size: '840 KB', url: '#' },
          { name: 'Niche Examples.docx', type: 'doc', size: '410 KB', url: '#' },
        ],
      },
      {
        id: 'l3',
        title: 'Positioning Yourself Online',
        type: 'video',
        duration: '18 min',
        status: 'locked',
        videoUrl: null,
        resources: [],
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Module 2: Working with AI',
    lessons: [
      {
        id: 'l4',
        title: 'AI Tools Every VA Should Know',
        type: 'video',
        duration: '25 min',
        status: 'active',
        progress: 0,
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        resources: [
          { name: 'AI Toolkit Checklist.pdf', type: 'pdf', size: '620 KB', url: '#' },
        ],
      },
      {
        id: 'l5',
        title: 'Prompt Writing for Client Work',
        type: 'worksheet',
        duration: '30 min',
        status: 'locked',
        videoUrl: null,
        resources: [],
      },
    ],
  },
  {
    id: 'module-3',
    title: 'Module 3: Landing Clients',
    lessons: [
      {
        id: 'l6',
        title: 'Building a Resume That Converts',
        type: 'video',
        duration: '15 min',
        status: 'locked',
        videoUrl: null,
        resources: [],
      },
      {
        id: 'l7',
        title: 'Pricing & Proposals',
        type: 'video',
        duration: '22 min',
        status: 'locked',
        videoUrl: null,
        resources: [],
      },
    ],
  },
];

// TODO: replace with real activity events from your backend
export const recentActivity = [
  {
    icon: 'graduation',
    title: 'Defining Your VA Niche',
    subtitle: 'Module 1 · Foundations',
    time: '3 hours ago',
  },
  {
    icon: 'message',
    title: 'New reply in Discussions',
    subtitle: 'AI Tools Every VA Should Know',
    time: '3 days ago',
  },
];

// TODO: point these at your real syllabus / case studies / Q&A links
export const quickLinks = [
  { label: 'Download Syllabus', icon: 'download', url: '#' },
  { label: 'View Case Studies', icon: 'folder', url: '#' },
  { label: 'Join Live Q&A', icon: 'users', url: '#' },
];

/* -------------------------------------------------------------------------
   MY COURSES PAGE — other courses in the catalog (mirrors the niches from
   the Free Learning Hub on the main site, so the catalog feels consistent
   with the rest of The VA Library).
   ------------------------------------------------------------------------- */
export const catalogCourses = [
  {
    id: 'bookkeeping',
    title: 'Bookkeeping & Accounting for VAs',
    desc: 'Master the tools and workflows clients actually pay for.',
    icon: 'calculator',
    status: 'coming-soon',
  },
  {
    id: 'social-media',
    title: 'Social Media Management Mastery',
    desc: 'Grow pages, plan content calendars, and report results.',
    icon: 'megaphone',
    status: 'coming-soon',
  },
  {
    id: 'copywriting',
    title: 'Copywriting & Content for VAs',
    desc: 'Write emails, captions, and pages that get results.',
    icon: 'pen',
    status: 'coming-soon',
  },
  {
    id: 'admin',
    title: 'Executive Assistant Essentials',
    desc: 'Inbox, calendar, and workflow systems for busy founders.',
    icon: 'inbox',
    status: 'coming-soon',
  },
  {
    id: 'design',
    title: 'Graphic Design with Canva',
    desc: 'Build a design service clients will keep coming back for.',
    icon: 'palette',
    status: 'coming-soon',
  },
];

/* -------------------------------------------------------------------------
   DISCUSSIONS PAGE
   ------------------------------------------------------------------------- */
export const discussionThreads = [
  {
    id: 'd1',
    author: 'Joyce T.',
    initials: 'JT',
    title: 'How do you price a discovery call package?',
    excerpt: "I'm about to send my first proposal and I'm not sure if I should charge for the discovery call itself...",
    tag: 'Module 3 · Landing Clients',
    replies: 14,
    time: '2 hours ago',
  },
  {
    id: 'd2',
    author: 'Ramon D.',
    initials: 'RD',
    title: 'Best free AI tools for social media captions?',
    excerpt: 'Curious what everyone is using besides ChatGPT — looking for something more built for scheduling too.',
    tag: 'Module 2 · Working with AI',
    replies: 9,
    time: '5 hours ago',
  },
  {
    id: 'd3',
    author: 'Sheena May Laguerta',
    initials: 'SL',
    title: 'Live Q&A recap: Positioning yourself as a premium VA',
    excerpt: "For everyone who couldn't join live, here's a summary of the biggest questions and my answers...",
    tag: 'Announcement',
    replies: 27,
    time: '1 day ago',
  },
  {
    id: 'd4',
    author: 'Angela P.',
    initials: 'AP',
    title: 'Struggling to pick between admin and social media niche',
    excerpt: 'I like both equally honestly haha. How did you all decide which one to commit to first?',
    tag: 'Module 1 · Foundations',
    replies: 6,
    time: '2 days ago',
  },
];

/* -------------------------------------------------------------------------
   PROGRESS PAGE
   ------------------------------------------------------------------------- */
export const progressStats = {
  lessonsCompleted: 3,
  totalLessons: 9,
  modulesCompleted: 0,
  totalModules: 3,
  hoursLearned: 4.5,
  dayStreak: 5,
};

export const weeklyActivity = [
  { day: 'Mon', minutes: 25 },
  { day: 'Tue', minutes: 40 },
  { day: 'Wed', minutes: 0 },
  { day: 'Thu', minutes: 55 },
  { day: 'Fri', minutes: 15 },
  { day: 'Sat', minutes: 60 },
  { day: 'Sun', minutes: 30 },
];

export const achievements = [
  { id: 'a1', label: 'First Lesson Complete', earned: true },
  { id: 'a2', label: '5-Day Streak', earned: true },
  { id: 'a3', label: 'Module 1 Master', earned: false },
  { id: 'a4', label: 'AI Toolkit Explorer', earned: false },
  { id: 'a5', label: 'Community Contributor', earned: false },
];
