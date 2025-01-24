export default function getRarityClass(rarity: number): string {
  switch (rarity) {
    case 1: return 'one-star-gradient'
    case 2: return 'two-stars-gradient'
    case 3: return 'three-stars-gradient'
    case 4: return 'four-stars-gradient'
    case 5: return 'five-stars-gradient'
    default: return 'five-stars-gradient'
  }
}
