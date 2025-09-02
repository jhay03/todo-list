export interface TodoItem {
  _id?: string;
  name: string;
  description: string;
  tags: string[];
  completed: boolean;
  priority: string;
}
