import type { Model, FilterState } from '~/types'

const MOCK_MODELS: Model[] = [
  {
    id: 1,
    slug: 'valentina-r',
    name: 'valentina_r',
    displayName: 'Valentina R.',
    age: 24,
    city: 'Medellín',
    country: 'CO',
    categories: ['fitness', 'lifestyle'],
    avatar: 'https://i.pravatar.cc/400?img=47',
    bio: 'Modelo fitness y lifestyle. Contenido exclusivo diario.',
    isLive: true,
    isOnline: true,
    isVerified: true,
    isPremium: false,
    viewers: 1247,
    rating: 4.9,
    reviewCount: 312,
    price: 9.99,
    currency: 'USD',
    tags: ['fitness', 'bikini', 'latam'],
  },
  {
    id: 2,
    slug: 'sofia-m',
    name: 'sofia_m',
    displayName: 'Sofía M.',
    age: 22,
    city: 'Bogotá',
    country: 'CO',
    categories: ['fashion', 'art'],
    avatar: 'https://i.pravatar.cc/400?img=45',
    bio: 'Modelo de moda y arte. Colaboro con marcas premium.',
    isLive: false,
    isOnline: true,
    isVerified: true,
    isPremium: true,
    viewers: undefined,
    rating: 4.8,
    reviewCount: 198,
    price: 14.99,
    currency: 'USD',
    tags: ['fashion', 'art', 'premium'],
  },
  {
    id: 3,
    slug: 'isabella-c',
    name: 'isabella_c',
    displayName: 'Isabella C.',
    age: 26,
    city: 'Cali',
    country: 'CO',
    categories: ['dance', 'lifestyle'],
    avatar: 'https://i.pravatar.cc/400?img=44',
    bio: 'Bailarina profesional. Shows en vivo todos los viernes.',
    isLive: true,
    isOnline: true,
    isVerified: true,
    isPremium: false,
    viewers: 834,
    rating: 4.7,
    reviewCount: 156,
    price: 7.99,
    currency: 'USD',
    tags: ['dance', 'salsa', 'cali'],
  },
  {
    id: 4,
    slug: 'camila-v',
    name: 'camila_v',
    displayName: 'Camila V.',
    age: 23,
    city: 'Barranquilla',
    country: 'CO',
    categories: ['fitness', 'wellness'],
    avatar: 'https://i.pravatar.cc/400?img=48',
    bio: 'Entrenadora personal y modelo. Tu guía fitness definitiva.',
    isLive: false,
    isOnline: false,
    isVerified: false,
    isPremium: false,
    viewers: undefined,
    rating: 4.6,
    reviewCount: 89,
    price: 5.99,
    currency: 'USD',
    tags: ['fitness', 'wellness', 'nutrition'],
  },
  {
    id: 5,
    slug: 'mariana-l',
    name: 'mariana_l',
    displayName: 'Mariana L.',
    age: 25,
    city: 'Medellín',
    country: 'CO',
    categories: ['fashion', 'lifestyle'],
    avatar: 'https://i.pravatar.cc/400?img=49',
    bio: 'Fashion blogger y modelo. Tendencias exclusivas cada semana.',
    isLive: false,
    isOnline: true,
    isVerified: true,
    isPremium: true,
    viewers: undefined,
    rating: 4.9,
    reviewCount: 427,
    price: 19.99,
    currency: 'USD',
    tags: ['fashion', 'blogger', 'trends'],
  },
  {
    id: 6,
    slug: 'daniela-p',
    name: 'daniela_p',
    displayName: 'Daniela P.',
    age: 21,
    city: 'Bogotá',
    country: 'CO',
    categories: ['art', 'photography'],
    avatar: 'https://i.pravatar.cc/400?img=46',
    bio: 'Artista visual y fotógrafa. Proyectos creativos únicos.',
    isLive: true,
    isOnline: true,
    isVerified: false,
    isPremium: false,
    viewers: 412,
    rating: 4.5,
    reviewCount: 64,
    price: 6.99,
    currency: 'USD',
    tags: ['art', 'photography', 'creative'],
  },
  {
    id: 7,
    slug: 'laura-s',
    name: 'laura_s',
    displayName: 'Laura S.',
    age: 27,
    city: 'Cartagena',
    country: 'CO',
    categories: ['travel', 'lifestyle'],
    avatar: 'https://i.pravatar.cc/400?img=43',
    bio: 'Travel creator y modelo. El mundo desde mi perspectiva.',
    isLive: false,
    isOnline: false,
    isVerified: true,
    isPremium: false,
    viewers: undefined,
    rating: 4.7,
    reviewCount: 203,
    price: 8.99,
    currency: 'USD',
    tags: ['travel', 'beach', 'lifestyle'],
  },
  {
    id: 8,
    slug: 'andrea-t',
    name: 'andrea_t',
    displayName: 'Andrea T.',
    age: 29,
    city: 'Pereira',
    country: 'CO',
    categories: ['fitness', 'dance'],
    avatar: 'https://i.pravatar.cc/400?img=42',
    bio: 'Instructora de yoga y zumba. Bienestar y energía positiva.',
    isLive: true,
    isOnline: true,
    isVerified: true,
    isPremium: true,
    viewers: 2103,
    rating: 5.0,
    reviewCount: 581,
    price: 12.99,
    currency: 'USD',
    tags: ['yoga', 'zumba', 'wellness'],
  },
]

export const useModels = () => {
  const models = ref<Model[]>(MOCK_MODELS)
  const loading = ref(false)

  const filters = ref<FilterState>({
    search: '',
    ageMin: null,
    ageMax: null,
    city: '',
    category: '',
    status: 'all',
    sortBy: 'popular',
  })

  const filteredModels = computed(() => {
    let result = [...models.value]

    if (filters.value.search) {
      const q = filters.value.search.toLowerCase()
      result = result.filter(m =>
        m.displayName.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.tags.some(t => t.includes(q)),
      )
    }

    if (filters.value.ageMin) {
      result = result.filter(m => m.age >= (filters.value.ageMin ?? 0))
    }

    if (filters.value.ageMax) {
      result = result.filter(m => m.age <= (filters.value.ageMax ?? 99))
    }

    if (filters.value.city) {
      result = result.filter(m => m.city.toLowerCase() === filters.value.city.toLowerCase())
    }

    if (filters.value.category) {
      result = result.filter(m => m.categories.includes(filters.value.category))
    }

    if (filters.value.status === 'live') {
      result = result.filter(m => m.isLive)
    }
    else if (filters.value.status === 'online') {
      result = result.filter(m => m.isOnline)
    }

    switch (filters.value.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        result.sort((a, b) => b.id - a.id)
        break
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
      default:
        result.sort((a, b) => (b.viewers ?? 0) - (a.viewers ?? 0))
    }

    return result
  })

  const liveCount = computed(() => models.value.filter(m => m.isLive).length)
  const onlineCount = computed(() => models.value.filter(m => m.isOnline).length)

  const cities = computed(() => [...new Set(models.value.map(m => m.city))].sort())

  const resetFilters = () => {
    filters.value = {
      search: '',
      ageMin: null,
      ageMax: null,
      city: '',
      category: '',
      status: 'all',
      sortBy: 'popular',
    }
  }

  return {
    models,
    filters,
    filteredModels,
    liveCount,
    onlineCount,
    cities,
    loading,
    resetFilters,
  }
}
