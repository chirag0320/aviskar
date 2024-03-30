import { Product } from "@/types/product";

export const sortByMostPopular = (items: Product[]) => {
    const showOnHomepage = items.filter((item) => item.showOnHomepage);
    const notShowOnHomepage = items.filter((item) => !item.showOnHomepage);
    return [...showOnHomepage, ...notShowOnHomepage];
}

export const sortByPriceLowToHigh = (items: any[]) => {
    const sortedItems = [...items].sort((a, b) => {
        return a.priceWithDetails?.price - b.priceWithDetails?.price;
    });

    return sortedItems;
}

export const sortByPriceHighToLow = (items: any[]) => {
    const sortedItems = [...items].sort((a, b) => {
        return b.priceWithDetails?.price - a.priceWithDetails?.price;
    });

    return sortedItems;
}