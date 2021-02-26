export interface Item {
    itemKey: string;
    itemName: string;
    shortDescription?: string;
    longDescription?: string;
    searchTerms?: string;
}
export interface Location {
    locationKey: string;
    locationName: string;
    address?: string;
    latitude?: string;
    longitude?: string;
    shortDescription?: string;
    longDescription?: string;
    websiteURL?: string;
}
export interface ItemLocation {
    itemKey: string;
    locationKey: string;
}
export interface RelatedItem {
    itemKeyA: string;
    itemKeyB: string;
}
export interface ItemReuse {
    itemKey: string;
    reuseName: string;
    reuseDescription?: string;
    websiteURL?: string;
}
export interface FileDefinition {
    fileName: string;
    columns: string[];
    primaryKeyColumns: string[];
    numericColumns?: string[];
    requiredColumns?: string[];
}
export declare const fileDefinition_items: FileDefinition;
export declare const fileDefinition_locations: FileDefinition;
export declare const fileDefinitions: FileDefinition[];
