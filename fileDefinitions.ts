export interface Item {
  itemKey: string;
  itemName: string;
  shortDescription?: string;
  longDescription?: string;
  pictureURL?: string;
  searchTerms?: string;
};

export interface Location {
  locationKey: string;
  locationName: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  shortDescription?: string;
  longDescription?: string;
  websiteURL?: string;
};

export interface ItemLocation {
  itemKey: string;
  locationKey: string;
  priorityNumber?: string;
};

export interface RelatedItem {
  itemKeyA: string;
  itemKeyB: string;
};

export interface ItemReuse {
  itemKey: string;
  reuseIndex: string;
  reuseName: string;
  reuseDescription: string;
  websiteURL?: string;
};


export interface FileDefinition {
  fileName: string;
  primaryKey: string[];
  columnNames: string[];
};


export const fileDefinition_items: FileDefinition = {
  fileName: "items.csv",
  primaryKey: ["itemKey"],
  columnNames: ["itemKey", "itemName", "shortDescription", "longDescription", "pictureURL", "searchTerms"]
};

export const fileDefinition_locations: FileDefinition = {
  fileName: "locations.csv",
  primaryKey: ["locationKey"],
  columnNames: ["locationKey", "locationName", "address", "latitude", "longitude", "shortDescription", "longDescription", "websiteURL"]
};


export const fileDefinitions: FileDefinition[] = [
  fileDefinition_items,
  fileDefinition_locations, {
    fileName: "itemLocations.csv",
    primaryKey: ["itemKey", "locationKey"],
    columnNames: ["itemKey", "locationKey", "priorityNumber"]
  }, {
    fileName: "relatedItems.csv",
    primaryKey: ["itemKeyA", "itemKeyB"],
    columnNames: ["itemKeyA", "itemKeyB"]
  }, {
    fileName: "itemReuses.csv",
    primaryKey: ["itemKey", "reuseIndex"],
    columnNames: ["itemKey", "reuseIndex", "reuseName", "reuseDescription", "websiteURL"]
  }];
