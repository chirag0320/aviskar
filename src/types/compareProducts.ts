export interface CompareProduct {
    productId: number;
    parentProductId: number;
    productName: string;
    shortDescription: string;
    fullDescription: string | null;
    friendlypagename: string;
    metaKeywords: string | null;
    metaDescription: string | null;
    metaTitle: string | null;
    productPrice: number;
    premiumDiscount: number;
    productWeight: number;
    imageUrl: string;
    specifications: {
        [key: string]: string;
    };
}
