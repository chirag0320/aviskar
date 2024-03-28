export enum SortingOption {
    Popular = "Most Popular",
    PriceLowToHigh = "Price: Low to High",
    PriceHighToLow = "Price: High to Low",
}

// export enum Metals {
//     Gold = 1,
//     Silver = 2,
//     Platinum = 3,
//     Palladium = 4,
//     Bitcoin = 5,
//     AustralianDollar = 6,
//     Ethereum = 7,
//     BitcoinCash = 8,
//     Litecoin = 9,
//     Ripple = 10,
//     Copper = 11
// }

// export enum MetalTypes {
//     Bar = 0,
//     Coin = 1,
//     Unallocated = 2
// }

// export enum WeightTypes {
//     Ounces = 0,
//     Grams = 1,
//     Kilograms = 2
// }

export const Metals = {
    1: "Gold",
    2: "Silver",
    3: "Platinum",
    4: "Palladium",
    5: "Bitcoin",
    6: "AustralianDollar",
    7: "Ethereum",
    8: "BitcoinCash",
    9: "Litecoin",
    10: "Ripple",
    11: "Copper"
};

export const MetalTypes = {
    0: "Bar",
    1: "Coin",
    2: "Unallocated"
};

export const WeightTypes = {
    0: "Ounces",
    1: "Grams",
    2: "Kilograms"
};

export const AddressType = {
    Shipping: 2,
    Billing: 1
}