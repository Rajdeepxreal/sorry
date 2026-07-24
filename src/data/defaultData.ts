import { AppCustomization, PolaroidPhoto } from '../types';

export const INITIAL_PHOTOS: PolaroidPhoto[] = [
  {
    id: '1',
    url: './Image1.jpg',
    caption: 'Your breathtaking smile that brightens my whole world, Bornaa ✨',
    
    rotation: -3
  },
  {
    id: '2',
    url: './Image2.jpg',
    caption: 'The way your eyes twinkle when you smilee... 💕',
  
    rotation: 2
  },
  {
    id: '3',
    url: './Image3.jpg',
    caption: 'Holding your soft hand in mine is my favorite feeling in the universe',
    
    rotation: -2
  },
  {
    id: '4',
    url: './Image4.jpeg',
    caption: 'Every single laugh with you is a memory I treasure forever 🌸',
    
    rotation: 4
  },
  {
    id: '5',
    url: './Image7.jpg',
    caption: 'Your gentle heart, kind soul, and infectious joy 💖',
   
    rotation: -3
  },
  {
    id: '6',
    url: './Image5.jpg',
    caption: 'Forever grateful for every single moment with you, my sweet Bornaa 🌹',
  
    rotation: 3
  }
];

export const DEFAULT_CUSTOMIZATION: AppCustomization = {
  recipientName: 'Bornaa',
  senderName: 'Rajdeep',
  heroSubtitle: 'I made this romantic space just for you, Bornaa, to tell you how deeply and sincerely sorry I am for all my mistakes..',
  apologyLetter: `Dearest Bornaaaaa,

I am writing this from the very bottom of my heart because I want you to know how deeply, truly sorry I am for my mistake. You mean absolute world to me, Bornaa, and knowing that I hurt you breaks my heart more than words could ever express.I’ve been feeling heavy about how things ended up between us, Bornaa. I am truly sorry for the ways I hurt you, and I mean that. It’s just been tough because I felt hurt by things on your end too, and it’s left us both in a bad place.I care about you, and I don't want us to hold resentment toward each other. When you're ready..., I'd really like for us to talk things through openly so we can both feel heard.

I cherish every single smile we've shared, every quiet moment, and every beautiful memory we've built together. We both are not perfect but we are perfect for each other...I know I fell short, but I promise to listen better, cherish you deeper, and love you with all my heart.

Thank you for your patience and your soft, kind soul... You are my safe haven, my best friend, and my whole universe....I LOVE YOU 3000. I LOVE YOU TO THE MOON AND BACK. I LOVE YOU INFINITE. I LOVE YOU MORE.

Please take all the time you need, Bornaa... I will always be right here, loving you with endless devotion...

With all my love and infinite romance,
Yours always & forever
Raju 💕`,
  teddyBearModelUrl: '',
  roseModelUrl: '',
  photos: INITIAL_PHOTOS,
};
