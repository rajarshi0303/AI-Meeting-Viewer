export interface GoogleUser {
  name: string;
  picture: string;
  email: string;
}

export interface GoogleEvent {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  hangoutLink?: string;
  htmlLink: string;
  status: string;

  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  attendees?: {
    email: string;
    responseStatus?: string;
    displayName?: string;
  }[];
  organizer: {
    email: string;
    self?: boolean;
  };
  creator: {
    email: string;
    self?: boolean;
  };
  created: string;
  updated: string;
}

export interface Meeting {
  id: string;
  title: string;
  time: string;
  duration?: string;
  attendees?: string[];
  description?: string;

  location?: string;
  hangoutLink?: string;
  htmlLink?: string;
  link?: string;
  summary?: string;

  organizer?: {
    email: string;
    self?: boolean;
  };

  creator?: {
    email: string;
    self?: boolean;
  };

  created?: string;
  updated?: string;

  status?: string;

  start?: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };

  end?: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
}
