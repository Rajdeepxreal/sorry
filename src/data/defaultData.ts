import { AppCustomization, PolaroidPhoto } from '../types';

export const INITIAL_PHOTOS: PolaroidPhoto[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    caption: 'Your breathtaking smile that brightens my whole world, Bornaa ✨',
    date: 'Golden Hour Walk',
    location: 'Our Favorite Spot',
    rotation: -3
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    caption: 'The way your eyes twinkle when you laugh 💕',
    date: 'Cozy Afternoon',
    location: 'Little Cafe',
    rotation: 2
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
    caption: 'Holding your soft hand in mine is my favorite feeling in the universe 🌅',
    date: 'Weekend Getaway',
    location: 'Sunset Viewpoint',
    rotation: -2
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    caption: 'Every single laugh with you is a memory I treasure forever 🌸',
    date: 'Movie & Coffee Night',
    location: 'Home',
    rotation: 4
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    caption: 'Your gentle heart, kind soul, and infectious joy 💖',
    date: 'Stargazing Night',
    location: 'Under the Stars',
    rotation: -3
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    caption: 'Forever grateful for every single moment with you, my sweet Bornaa 🌹',
    date: 'Autumn Afternoon',
    location: 'Park Stroll',
    rotation: 3
  }
];

export const DEFAULT_CUSTOMIZATION: AppCustomization = {
  recipientName: 'Bornaa',
  senderName: 'Raj',
  heroSubtitle: 'I made this romantic space just for you, Bornaa, to tell you how deeply and sincerely sorry I am.',
  apologyLetter: `Dearest Bornaa,

I am writing this from the very bottom of my heart because I want you to know how deeply, truly sorry I am for my mistake. You mean absolute world to me, Bornaa, and knowing that I hurt you breaks my heart more than words could ever express.

I cherish every single smile we've shared, every quiet moment, and every beautiful memory we've built together. You bring so much light, warmth, and magic into my life every single day. I know I fell short, but I promise to listen better, cherish you deeper, and love you with all my heart.

Thank you for your patience and your soft, kind soul. You are my safe haven, my best friend, and my whole universe.

Please take all the time you need, Bornaa. I will always be right here, loving you with endless devotion.

With all my love and infinite romance,
Yours always & forever
Raju 💕`,
  teddyBearModelUrl: '',
  roseModelUrl: '',
  photos: INITIAL_PHOTOS,
};
