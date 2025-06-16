export type Creator = {
    id: number;
    name: string;
    type: string;
    description: string;
    longDescription: string;
    specialties: string[];
    memberCount: string;
    establishedYear: number;
    contact: string;
    website: string;
    socialMedia: {
      twitter: string,
      instagram: string,
    },
     exhibitions: [
      {
        title: string,
        description: string,
      },
    ];
    upcomingEvents: [
      {
        title: string,
        date: string,
        time: string,
        description: string,
      }
    ];
    achievements: string[];
}