import { Submission } from './Submission';

export interface Speaker {
  code: string;
  name: string;
  biography: string;
  submissions?: Submission[];
  avatar?: string;
}
