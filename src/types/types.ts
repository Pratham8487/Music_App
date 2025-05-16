export interface Hosts {
  stream: string;
  images: string;
}

export interface AudioAds {
  default: {
    start: number;
    interval: number;
    unit: "track";
  };
}

export interface InterstitialDisplayAds {
  start: number;
  interval: number;
  unit: "sec";
}

export interface DisplayAds {
  interstitial: InterstitialDisplayAds;
}

export interface BigNativeAdsHome {
  iphone: {
    enabled: boolean;
  };
  ipad: {
    enabled: boolean;
  };
  android: {
    enabled: boolean;
  };
  android_tablet: {
    enabled: boolean;
  };
}

export interface Ads {
  audio: AudioAds;
  display: DisplayAds;
  big_native_ads_home: BigNativeAdsHome;
}

export interface Artist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}

export interface Album {
  id: number;
  title: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  md5_image: string;
  tracklist: string;
  type: string;
}

export interface Track {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  md5_image: string;
  artist: Artist;
  album: Album;
  type: string;
}

export interface ApiResponse {
  data?: Track[];
  country_iso?: string;
  tracks?: any;
  artists?: any;
  country?: string;
  open?: boolean;
  pop?: string;
  upload_token?: string;
  upload_token_lifetime?: number;
  user_token?: string | null;
  hosts?: Hosts;
  ads?: Ads;
  has_podcasts?: boolean;
  offers?: any[];
  total?: number;
  next?: string;
}
