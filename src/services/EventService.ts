import axios from 'axios';
import { EventInfo } from 'types/EventInfo';
import { PagedResult } from 'types/PagedResult';
import { Speaker } from 'types/Speaker';
import { Room, Slot, Submission } from 'types/Submission';

export default {
  GetEventInfo,
  GetTalks,
  GetTalk,
  GetSpeakers,
  GetEventDates,
};

async function GetEventInfo(): Promise<EventInfo | undefined> {
  try {
    const result = await axios.get(`https://pretalx.com/api/events/democon/`);

    console.log(result);
    if (result.status === 200) {
      return toEventInfo(result.data);
    }
  } catch (ex) {
    console.error('error fetching event info', ex);
  }
}

async function GetTalks(
  state?: string,
  content_locale?: string,
  type?: string,
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
        data: Array.from(result.data.results)
          .map((i) => toSubmission(i))
          .sort((a, b) => a.slot.start.getTime() - b.slot.start.getTime()),
      };
    }
  } catch (ex) {
    console.error('error fetching talks', ex);
  }
}

async function GetTalk(code: string): Promise<Submission | undefined> {
  try {
    const talks = await GetTalks('', '', '', 100, 0);
    return talks?.data.find((i) => i.code === code);

    // The submission endpoint doesn't allow for cross-origin requests and no back-end implemented is implemented yet.
    // Workaround is to get all talks and filter from there.

    // const result = await axios.get(
    //   `https://pretalx.com/api/events/democon/talks/` + code,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json',
    //     },
    //     withCredentials: true,
    //   }
    // );

    // console.log('GetTalk', code, result);
    // if (result.status === 200) {
    //   return toSubmission(result.data);
    // }
  } catch (ex) {
    console.error('error fetching talks', ex);
  }
}

async function GetSpeakers(
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
    console.error('error fetching speakers', ex);
  }
}

function GetEventDates(submissions: Array<Submission>): Array<Date> {
  const allDates = submissions.map((i) => i.slot.start.toDateString());
  const uniqueDates = allDates.filter(
    (item: string, index: number, array: string[]) =>
      array.findIndex((i) => i === item) === index
  );

  return uniqueDates.map((i) => new Date(i));
}

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
    submissions: source.submissions
      ? Array.from(source.submissions).map((i) => {
          return { code: i };
        })
      : [],
  } as Speaker;
}

function toSlot(source: any): Slot {
  return {
    room: source.room as Room,
    start: new Date(source.start),
    end: new Date(source.end),
  } as Slot;
}
