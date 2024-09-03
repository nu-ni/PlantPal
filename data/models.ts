export type PlantCollection = {
    id?: number;
    title: string;
    lastActive: Date;
};

export type Plant = {
    id?: number;
    title: string;
    frequency: number;
    waterAmount: number;
    collectionId: number;
    image: string;
};

export type Dict = {
    [key: string]: string;
};
