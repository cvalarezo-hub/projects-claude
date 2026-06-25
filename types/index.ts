export interface Model {
  id: number
  slug: string
  name: string
  displayName: string
  age: number
  city: string
  country: string
  categories: string[]
  avatar: string
  cover?: string
  bio: string
  isLive: boolean
  isOnline: boolean
  isVerified: boolean
  isPremium: boolean
  viewers?: number
  rating: number
  reviewCount: number
  price: number
  currency: string
  tags: string[]
}

export interface Agency {
  id: number
  name: string
  slug: string
  logo: string
  city: string
  modelsCount: number
  rating: number
  isVerified: boolean
}

export interface FilterState {
  search: string
  ageMin: number | null
  ageMax: number | null
  city: string
  category: string
  status: 'all' | 'live' | 'online'
  sortBy: 'popular' | 'newest' | 'rating' | 'price_asc' | 'price_desc'
}

export interface Category {
  label: string
  value: string
  icon?: string
}

export type NavItem = {
  label: string
  to: string
  icon?: string
  badge?: string | number
}
