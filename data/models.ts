export type PlantCollection = {
    id?: number;
    title: string;
    lastActive: Date;
    count?: number;
};

export type Plant = {
    id?: number;
    title: string;
    frequency: number;
    waterAmount: number;
    collectionId: number;
    image: Blob;
};

export type Dict = {
    [key: string]: string;
};
