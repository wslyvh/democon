import { createContext } from 'react';
import { EventInfo } from 'types/EventInfo';

export const EventContext = createContext<EventInfo | undefined>(undefined);
