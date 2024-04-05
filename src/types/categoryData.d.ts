export interface categoryData {
  loading: boolean,
  items: [],
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
  sortedItems: any[],
  clearFilters: boolean
}