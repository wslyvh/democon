import axios from 'axios';
import { EventInfo } from 'types/EventInfo';
import { PagedResult } from 'types/PagedResult';
import { Speaker } from 'types/Speaker';
import { Room, Slot, Submission } from 'types/Submission';

export default {
  GetEventInfo: async function (): Promise<EventInfo | undefined> {
    try {
      const result = await axios.get(`https://pretalx.com/api/events/democon/`);

      console.log(result);
      if (result.status === 200) {
        return toEventInfo(result.data);
      }
    } catch (ex) {
      console.error('error fetching account balance', ex);
    }
  },

  GetTalks: async function (
    state: string = '',
    content_locale: string = '',
    type: string,
    limit: number = 25,
    offset: number = 0
  ): Promise<PagedResult<Array<Submission>> | undefined> {
    try {
      let filter = '?';
      if (state) filter += '&state=' + state;
      if (content_locale) filter += '&content_locale=' + content_locale;
      if (type) filter += '&submission_type=' + type;
      if (limit) filter += '&limit=' + limit;
      if (offset) filter += '&offset=' + offset;

      const result = await axios.get(
        `https://pretalx.com/api/events/democon/talks/` + filter
      );

      console.log(result);
      if (result.status === 200) {
        return {
          count: result.data.count,
          next: result.data.next,
          previous: result.data.previous,
          data: Array.from(result.data.results).map(i => toSubmission(i)),
        };
      }
    } catch (ex) {
      console.error('error fetching account balance', ex);
    }
  },

  GetSpeakers: async function (
    username: string = '',
    email: string = '',
    limit: number = 25,
    offset: number = 0
  ): Promise<PagedResult<Array<Speaker>> | undefined> {
    try {
      let filter = '?';
      if (username) filter += '&user__name=' + username;
      if (email) filter += '&user__email=' + email;
      if (limit) filter += '&limit=' + limit;
      if (offset) filter += '&offset=' + offset;

      const result = await axios.get(
        `https://pretalx.com/api/events/democon/speakers/` + filter
      );

      console.log(result);
      if (result.status === 200) {
        return {
          count: result.data.count,
          next: result.data.next,
          previous: result.data.previous,
          data: Array.from(result.data.results).map((i) => toSpeaker(i)),
        };
      }
    } catch (ex) {
      console.error('error fetching account balance', ex);
    }
  },
};

function toEventInfo(source: any): EventInfo {
  return {
    name: source.name['en'],
    public: source.is_public,
    from: new Date(source.date_from),
    to: new Date(source.date_to),
    timezone: source.timezone,
    urls: source.urls,
  } as EventInfo;
}

function toSubmission(source: any): Submission {
  return {
    code: source.code,
    speakers: Array.from(source.speakers).map((i) => toSpeaker(i)),
    title: source.title,
    type: source.type,
    track: source.track,
    state: source.state,
    abstract: source.abstract,
    description: source.description,
    duration: source.duration,
    slot_count: source.slot_count,
    do_not_record: source.do_not_record,
    is_featured: source.is_featured,
    content_locale: source.content_locale,
    slot: toSlot(source.slot),
    image: source.image,
    resources: source.resources,
  } as Submission;
}

function toSpeaker(source: any): Speaker {
  return {
    code: source.code,
    name: source.name,
    biography: source.biography,
    avatar: source.avatar,
  } as Speaker;
}

function toSlot(source: any): Slot {
  return {
    room: source.room as Room,
    start: new Date(source.start),
    end: new Date(source.end),
  } as Slot;
}