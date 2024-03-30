export interface categoryData {
    loading: boolean,
    items: [],
    count: 0,
    categories: [],
    price: {
        minPrice: number,
        maxPrice: number
    },
    specifications: {},
    manufactureres: [],
    productDetailsData: any,
    sortBy: SortingOption | null
}