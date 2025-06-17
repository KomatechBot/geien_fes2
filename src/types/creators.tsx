export type Creator = {
    id: string;
    name: string;
    type: string;
    description: string;
    longDescription: string;
    specialties?: string[];
    memberCount: string;
    establishedYear: number;
    contact: string;
    website: string;
    socialMedia: string;
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