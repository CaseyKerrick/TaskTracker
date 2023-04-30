const SIX_MONTHS = 180;

export type Task = {
  description: string;
  active?: boolean;
  frequency: number;
  dateLastPerformed?: string;
};

export const defaultTaskList: Task[] = [
  { description: 'Wash Dishes', frequency: 1 },
  { description: 'Scoop Litterbox', frequency: 2 },
  { description: 'Vacuum Car', frequency: SIX_MONTHS },
  { description: 'Vacuum Carpet', frequency: 7 },
  { description: 'Sweep Floors', frequency: 7 },
  { description: 'Water Plants', frequency: 3 },
  { description: 'Clip Cat Claws', frequency: 14 },
  { description: 'Give Stormy Inhaler', frequency: 1 },
  { description: 'Buy Groceries', frequency: 14 }
];