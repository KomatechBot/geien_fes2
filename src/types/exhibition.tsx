export type Exhibition = {
  id: string;
  title: string;
  creator: string;
  creatorId: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  category: string;
  isCurrentlyDisplayed: boolean;
  description: string;
  longDescription: string;
  location: string;
  displayPeriod: number;
  openingHours: number;
  tags: string[];
};
