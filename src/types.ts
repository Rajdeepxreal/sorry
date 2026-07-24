export interface PolaroidPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  location?: string;
  rotation?: number; // degree for polaroid tilt
}

export interface AppCustomization {
  recipientName: string;
  senderName: string;
  apologyLetter: string;
  heroSubtitle: string;
  teddyBearModelUrl: string; // Optional .gltf / .glb model URL
  roseModelUrl: string;      // Optional .gltf / .glb rose model URL
  photos: PolaroidPhoto[];
}

export interface ForgivenessLog {
  id?: string;
  recipientName: string;
  timestamp: string;
  userResponse: 'YES';
  userAgent?: string;
  notes?: string;
}
