export interface categoryRequestBody {
    search : string,
    pageNo : number,
    pageSize : number,
    sortBy : string,
    sortOrder : string,
    filters : {
        // minPrice : number,
        // maxPrice : number,
        specification : {
            [key: string]: string[]
        }
    }
}