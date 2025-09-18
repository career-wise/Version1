// Interview Questions Database

export interface InterviewQuestion {
  id: string;
  text: string;
  category: string;
  type: 'college' | 'job';
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in seconds
  tags: string[];
  tips: string[];
}

export const interviewQuestions: InterviewQuestion[] = [
  // College Interview Questions
  {
    id: 'college_001',
    text: 'Why do you want to attend this college?',
    category: 'Motivation',
    type: 'college',
    difficulty: 'medium',
    timeLimit: 120,
    tags: ['motivation', 'research', 'fit'],
    tips: [
      'Research specific programs and opportunities',
      'Mention unique aspects of the college',
      'Connect to your personal goals'
    ]
  },
  {
    id: 'college_002',
    text: 'Tell me about a challenge you overcame in high school.',
    category: 'Personal Growth',
    type: 'college',
    difficulty: 'medium',
    timeLimit: 150,
    tags: ['resilience', 'growth', 'problem-solving'],
    tips: [
      'Use the STAR method (Situation, Task, Action, Result)',
      'Focus on what you learned',
      'Show personal growth'
    ]
  },
  {
    id: 'college_003',
    text: 'What do you hope to contribute to our campus community?',
    category: 'Community',
    type: 'college',
    difficulty: 'medium',
    timeLimit: 120,
    tags: ['community', 'involvement', 'leadership'],
    tips: [
      'Reference specific clubs or activities',
      'Connect past experiences to future contributions',
      'Show enthusiasm for community involvement'
    ]
  },
  {
    id: 'college_004',
    text: 'Describe your academic interests and career goals.',
    category: 'Academic',
    type: 'college',
    difficulty: 'easy',
    timeLimit: 180,
    tags: ['academics', 'career', 'goals'],
    tips: [
      'Be specific about your interests',
      'Connect academics to career goals',
      'Show passion for learning'
    ]
  },
  {
    id: 'college_005',
    text: 'How do you handle stress and pressure?',
    category: 'Personal Skills',
    type: 'college',
    difficulty: 'hard',
    timeLimit: 120,
    tags: ['stress-management', 'coping', 'resilience'],
    tips: [
      'Provide specific strategies you use',
      'Give examples of handling pressure',
      'Show self-awareness'
    ]
  },

  // Job Interview Questions
  {
    id: 'job_001',
    text: 'Tell me about yourself.',
    category: 'Introduction',
    type: 'job',
    difficulty: 'easy',
    timeLimit: 120,
    tags: ['introduction', 'background', 'summary'],
    tips: [
      'Keep it professional and relevant',
      'Follow a logical structure (past, present, future)',
      'Connect to the role you\'re applying for'
    ]
  },
  {
    id: 'job_002',
    text: 'Why are you interested in this position?',
    category: 'Motivation',
    type: 'job',
    difficulty: 'medium',
    timeLimit: 120,
    tags: ['motivation', 'interest', 'research'],
    tips: [
      'Research the company and role thoroughly',
      'Connect your skills to their needs',
      'Show genuine enthusiasm'
    ]
  },
  {
    id: 'job_003',
    text: 'Describe a time when you worked as part of a team.',
    category: 'Teamwork',
    type: 'job',
    difficulty: 'medium',
    timeLimit: 150,
    tags: ['teamwork', 'collaboration', 'behavioral'],
    tips: [
      'Use the STAR method',
      'Highlight your specific contribution',
      'Show how you helped the team succeed'
    ]
  },
  {
    id: 'job_004',
    text: 'What are your greatest strengths and weaknesses?',
    category: 'Self-Assessment',
    type: 'job',
    difficulty: 'hard',
    timeLimit: 180,
    tags: ['strengths', 'weaknesses', 'self-awareness'],
    tips: [
      'Choose strengths relevant to the job',
      'For weaknesses, show how you\'re improving',
      'Be honest but strategic'
    ]
  },
  {
    id: 'job_005',
    text: 'Where do you see yourself in five years?',
    category: 'Career Goals',
    type: 'job',
    difficulty: 'medium',
    timeLimit: 120,
    tags: ['career-goals', 'ambition', 'planning'],
    tips: [
      'Align with the company\'s growth opportunities',
      'Show ambition but be realistic',
      'Demonstrate commitment to growth'
    ]
  }
];

export const getQuestionsByType = (type: 'college' | 'job'): InterviewQuestion[] => {
  return interviewQuestions.filter(q => q.type === type);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): InterviewQuestion[] => {
  return interviewQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsByCategory = (category: string): InterviewQuestion[] => {
  return interviewQuestions.filter(q => q.category === category);
};

export const getRandomQuestions = (
  type: 'college' | 'job', 
  count: number, 
  difficulty?: 'easy' | 'medium' | 'hard'
): InterviewQuestion[] => {
  let questions = getQuestionsByType(type);
  
  if (difficulty) {
    questions = questions.filter(q => q.difficulty === difficulty);
  }
  
  // Shuffle and take the requested count
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};