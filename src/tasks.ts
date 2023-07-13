const SIX_MONTHS = 180;
const ONE_WEEK = 7;
const TWO_WEEKS = 14;

export type Task = {
  description: string;
  active?: boolean;
  frequency: number;
  dateLastPerformed?: string;
};

export const defaultTaskList: Task[] = [
  { description: 'Wash Dishes', frequency: 1, active: true, dateLastPerformed: '7/10/2023' },
  { description: 'Scoop Litterbox', frequency: 2, dateLastPerformed: '7/9/2023' },
  { description: 'Vacuum Car', frequency: SIX_MONTHS, dateLastPerformed: '3/1/2023' },
  { description: 'Vacuum Carpet', frequency: ONE_WEEK, dateLastPerformed: '7/8/2023' },
  { description: 'Sweep Floors', frequency: ONE_WEEK, dateLastPerformed: '7/5/2023' },
  { description: 'Water Plants', frequency: 3, dateLastPerformed: '7/10/2023' },
  { description: 'Clip Cat Claws', frequency: TWO_WEEKS, dateLastPerformed: '7/8/2023' },
  { description: 'Give Stormy Inhaler', frequency: 1, dateLastPerformed: '7/10/2023' },
  { description: 'Buy Groceries', frequency: TWO_WEEKS, dateLastPerformed: '' }
];