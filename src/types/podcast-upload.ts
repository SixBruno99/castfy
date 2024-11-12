export interface IPodcastUpload {
  fileId: string;
  title: string;
  description: string;
  category: string[];
  image: File;
}

export interface IAudioUpload {
  audio: File;
}
