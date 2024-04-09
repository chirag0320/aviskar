export interface categoryData {
  loading: boolean,
  items: [] | null,
  count: 0,
  categories: [],
  price: {
    minPrice: number,
    maxPrice: number
  } | null,
  specifications: {},
  manufactureres: [],
  productDetailsData: any,
  sortBy: SortingOption | null,
  sortedItems: any[] | null,
  clearFilters: boolean
}