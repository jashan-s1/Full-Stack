import { faCode } from '@fortawesome/free-solid-svg-icons';

export const quizzesData = [
  {
    id: 1,
    icon: faCode,
    quizTitle: 'Javascript Quiz',
    quizQuestions: [
      {
        id: 1,
        mainQuestion: 'What is the purpose of JavaScript?',
        choices: [
          'A. To style HTML elements',
          'B. To add interactivity to web pages',
          'C. To define the structure of a web page',
          'D. To perform server-side operations',
        ],
        correctAnswer: 1, // This should be an index, starting from 0
        answeredResult: -1,
        statistics: {
          totalAttempts: 3,
          correctAttempts: 2,
          incorrectAttempts: 1,
        },
      },
      {
        id: 2,
        mainQuestion: 'Which keyword is used to declare variables in JavaScript?',
        choices: ['A. var', 'B. let', 'C. const', 'D. variable'],
        correctAnswer: 1, // This should be an index, starting from 0
        answeredResult: -1,
        statistics: {
          totalAttempts: 2,
          correctAttempts: 1,
          incorrectAttempts: 1,
        },
      },
    ],
  },
  {
    id: 2,
    icon: faCode,
    quizTitle: 'React Quiz',
    quizQuestions: [
      {
        id: 2,
        mainQuestion: 'What is the purpose of React?',
        choices: [
          'A. To style HTML elements',
          'B. To add interactivity to web pages',
          'C. To define the structure of a web page',
          'D. To perform server-side operations',
        ],
        correctAnswer: 1, // This should be an index, starting from 0
        answeredResult: -1,
        statistics: {
          totalAttempts: 3,
          correctAttempts: 2,
          incorrectAttempts: 1,
        },
      },
      {
        id: 2,
        mainQuestion: 'Which keyword is used to declare variables in React?',
        choices: ['A. var', 'B. let', 'C. const', 'D. variable'],
        correctAnswer: 1, // This should be an index, starting from 0
        answeredResult: -1,
        statistics: {
          totalAttempts: 2,
          correctAttempts: 1,
          incorrectAttempts: 1,
        },
      },
    ],
  },
];
