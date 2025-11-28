export type TrackDetailsOutput = { data: TrackDetailsResource };

export type TrackDetailsResource = {
  id: string;
  attributes: TrackDetailsAttributes;
};

export type TrackDetailsAttributes = {
  title: string;
  lyrics: string | null;
};

export type TrackListOutput = {
  data: Array<TrackListItemResource>;
};

export type TrackListItemResource = {
  id: string;
  attributes: TrackListItemAttributes;
};

export type TrackListItemAttributes = {
  title: string | null;
  attachments: Array<TrackAttachment>;
};

type TrackAttachment = {
  url: string;
};

const getHeaders = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey) {
    return {
      "api-key": undefined,
    };
  }
  return {
    "api-key": apiKey,
  };
};

export const getTrackDetailsByTrackId = (trackId: string) => {
  const promise: Promise<TrackDetailsOutput> = fetch(
    "https://musicfun.it-incubator.app/api/1.0/playlists/tracks/" + trackId,
    { headers: getHeaders() }
  ).then((response) => response.json());

  return promise;
};

export const getTracks = (): Promise<TrackListOutput> => {
  return fetch(
    "https://musicfun.it-incubator.app/api/1.0/playlists/tracks?pageNumber=1&pageSize=20&sortBy=publishedAt&sortDirection=desc&paginationType=offset",
    { headers: getHeaders() }
  ).then((response) => response.json());
};
