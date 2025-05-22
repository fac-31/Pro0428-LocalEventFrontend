export type Event = {
  _id: string;
  mode: 'Music' | 'Charity' | 'Sports' | 'Other';
  name: string;
  description: string;
  location: string;
  date: string;
  price: number;
  url: string;
};
