export interface IPodcast {
  id: string;
  description: string;
  title: string;
  podcast: {
    id: string;
    description: string;
    image: {
      url: string;
    };
  };
  image: {
    url: string;
  };
}
