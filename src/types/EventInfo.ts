export interface EventInfo {
  name: string;
  public: boolean;
  from: Date;
  to: Date;
  timezone: string;
  urls: Array<string>;
}
