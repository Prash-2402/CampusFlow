import React from 'react';

const COLORS = [
  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800/50',
  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 border border-green-200 dark:border-green-800/50',
  'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200 border border-purple-200 dark:border-purple-800/50',
  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 border border-amber-200 dark:border-amber-800/50',
  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-800/50',
  'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-200 border border-teal-200 dark:border-teal-800/50',
];

export function getSubjectColor(subject) {
  if (!subject) return COLORS[0];
  let hash = 0;
  for (let i = 0; i < subject.length; i++) {
    hash = subject.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export function Badge({ subject }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full inline-block ${getSubjectColor(subject)}`}>
      {subject}
    </span>
  );
}
