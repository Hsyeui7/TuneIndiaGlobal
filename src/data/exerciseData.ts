import { Exercise } from '../types';

export const PRACTICE_EXERCISES: Exercise[] = [
  {
    id: 'ex-01',
    title: 'Spider Chromatic Finger Independence',
    category: 'Finger Independence',
    difficulty: 'Beginner',
    description: 'Build finger dexterity, wrist flexibility, and clean string fretting without extraneous tension.',
    targetBpm: 80,
    instructions: [
      'Set metronome to 60 BPM.',
      'Play fret 1-2-3-4 across all 6 strings sequentially.',
      'Keep all non-playing fingers hovering close to the fretboard.',
      'Reverse the pattern: 4-3-2-1 moving backwards.',
      'Gradually increase metronome by 5 BPM once perfectly clean.'
    ]
  },
  {
    id: 'ex-02',
    title: 'Pentatonic Speed Burst Ladders',
    category: 'Speed & Dexterity',
    difficulty: 'Intermediate',
    description: 'Develop rapid pick hand coordination and clean string crossing in 16th note bursts.',
    targetBpm: 120,
    instructions: [
      'Play 4 notes per beat in minor pentatonic Position 1.',
      'Group notes in 6-note sequences: Up 6 notes, back down 2 notes.',
      'Maintain strict alternate picking (Down-Up-Down-Up).',
      'Focus on strict microsecond sync between left and right hands.'
    ]
  },
  {
    id: 'ex-03',
    title: 'Major & Minor 7th Chord Inversion Mapping',
    category: 'Scales',
    difficulty: 'Advanced',
    description: 'Memorize Maj7, Min7, and Dom7 inversions on string groups 1-2-3-4 and 2-3-4-5.',
    targetBpm: 75,
    instructions: [
      'Select a key on the Circle of Fifths.',
      'Play Root Position, 1st Inversion, 2nd Inversion, and 3rd Inversion up the neck.',
      'Sing out each chord member voice (Root, 3rd, 5th, 7th) while fretting.'
    ]
  },
  {
    id: 'ex-04',
    title: 'Metronome Gap Rhythm Training',
    category: 'Rhythm',
    difficulty: 'Intermediate',
    description: 'Test and lock in your internal rhythm clock with missing metronome measure clicks.',
    targetBpm: 90,
    instructions: [
      'Set metronome to play 3 bars on, 1 bar silent.',
      'Keep continuous time during the silent measure without rushing or dragging.',
      'Check if your downbeat aligns perfectly when the click resumes.'
    ]
  }
];
