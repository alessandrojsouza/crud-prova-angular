import { Student } from './Student';
export interface Post {
  id?: number;
  title: string;
  description: string;
  dateTime: Date;
  studentId: number;
}
