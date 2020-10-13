import { Speaker } from './Speaker';

export interface Submission {
  code: string;
  speakers: Speaker[];
  title: string;
  type: string;
  track: string;
  state: string;
  abstract: string;
  description: string;
  duration: number;
  slot_count: number;
  do_not_record: boolean;
  is_featured: boolean;
  content_locale: string;
  slot: Slot;
  image?: string;
  resources: string[];
}

export interface Room {
  en: string;
}

export interface Slot {
  room: Room;
  start: Date;
  end: Date;
}
