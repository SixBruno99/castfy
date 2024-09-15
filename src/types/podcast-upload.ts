export interface IPodcastUpload {
  fileId: string;
  title: string;
  description: string;
  image: File;
}

export interface IAudioUpload {
  audio: File;
}
