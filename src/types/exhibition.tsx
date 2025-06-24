export type Exhibition = {
  id: string;
  title: string;
  creator: string;
  creatorGroup: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  images: {
    url: string;
    height?: number;
    width?: number;
  }[];
  category: string;
  isCurrentlyDisplayed: boolean;
  description: string;
  longDescription: string;
  location: string;
  displayPeriod: string;
  openingHours: string;
  tags: string[];
  createdAt: string;
};
