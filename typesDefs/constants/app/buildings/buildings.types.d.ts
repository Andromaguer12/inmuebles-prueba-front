export interface BuildingMediaCard {
  _id: string;
  mediaType: 'image' | 'video',
  link: string,
  name: string
}

export interface BuildingCard {
  _id: string;
  address: string;
  name: string;
  description: string;
  price: number;
  squareMeters: number;
  media: BuildingMediaCard[]
}
