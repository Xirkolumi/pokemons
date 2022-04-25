export interface PokemonListItem {
  name: string;
  id: number;
  caught: boolean;
  wishlist: boolean;
  sprites: PokemonSprites;
  stats: PokemonStats[];
  moves: PokemonMove[];
  height: number;
  weight: number;
  abilities: any[];
  types: any[];
}

export interface PokemonSprites {
  other: {
    'official-artwork': {
      'front_default': string;
    }
  }
}

export interface PokemonStats {
  'base_stat': number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  }
}