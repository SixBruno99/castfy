export interface IPodcastUpload {
  id: string;
  title: string;
  description: string;
  image: File;
}

export interface IAudioUpload {
  audio: File;
}
