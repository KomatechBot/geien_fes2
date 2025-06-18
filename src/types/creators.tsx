import { Exhibition } from "./exhibition";
import { Workshop } from "./workshop";

export type Creator = {
    id: string;
    name: string;
    type: string;
    description: string;
    longDescription: string;
    specialties: string;
    memberCount: number;
    establishedYear: number;
    contact: string;
    website: string;
    socialMedia: string;
    exhibitions: Exhibition[];
    upcomingEvents: Workshop[];
    achievements: string;
}