import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date utilities
export const formatDate = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Truncate text utility
export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Validate email
export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ATS Resume Scoring (from your existing code)
export const calculateATSScore = (resumeData: any) => {
  let score = 0;
  let feedback = [];

  // Basic structure (30 points)
  if (resumeData.personalInfo?.fullName) score += 5;
  if (resumeData.personalInfo?.email) score += 5;
  if (resumeData.personalInfo?.phone) score += 5;
  if (resumeData.personalInfo?.location) score += 5;
  if (resumeData.professionalSummary) score += 10;

  // Experience section (40 points)
  if (resumeData.experience?.length > 0) {
    score += 20;
    const hasQuantifiableAchievements = resumeData.experience.some((exp: any) =>
      exp.description?.includes('%') ||
      exp.description?.includes('$') ||
      /\d+/.test(exp.description || '')
    );
    if (hasQuantifiableAchievements) score += 10;

    const hasActionVerbs = resumeData.experience.some((exp: any) =>
      /^(Led|Managed|Developed|Created|Implemented|Improved|Increased|Reduced)/i.test(exp.description || '')
    );
    if (hasActionVerbs) score += 10;
  }

  // Skills section (20 points)
  if (resumeData.skills?.length >= 5) score += 10;
  if (resumeData.skills?.length >= 10) score += 5;
  const hasTechnicalSkills = resumeData.skills?.some((skill: string) =>
    /programming|software|technical|coding|development/i.test(skill)
  );
  if (hasTechnicalSkills) score += 5;

  // Education section (10 points)
  if (resumeData.education?.length > 0) score += 10;

  // Generate feedback
  if (score < 50) {
    feedback.push('Add more quantifiable achievements to your experience');
    feedback.push('Include more relevant skills');
    feedback.push('Expand your professional summary');
  } else if (score < 75) {
    feedback.push('Good structure! Consider adding more technical skills');
    feedback.push('Include specific metrics in your achievements');
  } else {
    feedback.push('Excellent ATS optimization!');
    feedback.push('Your resume should pass most ATS systems');
  }

  return { score, feedback };
};