export interface IPodcastUpload {
  fileId: string;
  title: string;
  description: string;
  categories: string[];
  image: File;
}

export interface IAudioUpload {
  audio: File;
}
