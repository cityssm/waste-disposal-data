/*
 * Row Types
 * Note that row data is in CSV files, and CSV files do not have type information.
 * Data that should numeric is marked appropriately as a comment,
 * and is validated with `npm test`
 */

export interface Item {
  itemKey: string;
  itemName: string;
  shortDescription?: string;
  longDescription?: string;
  searchTerms?: string;
};

export interface Location {
  locationKey: string;
  locationName: string;
  address?: string;
  latitude?: string; // number
  longitude?: string; // number
  shortDescription?: string;
  longDescription?: string;
  websiteURL?: string;
};

export interface ItemLocation {
  itemKey: string;
  locationKey: string;
};

export interface RelatedItem {
  itemKeyA: string;
  itemKeyB: string;
};

export interface ItemReuse {
  itemKey: string;
  reuseName: string;
  reuseDescription?: string;
  websiteURL?: string;
};

/*
 * File Definitions
 */

export interface FileDefinition {
  fileName: string;
  columns: string[];
  primaryKeyColumns: string[];
  numericColumns?: string[];
  requiredColumns?: string[];
};

export const fileDefinition_items: FileDefinition = {
  fileName: "items.csv",
  columns: ["itemKey", "itemName", "shortDescription", "longDescription", "searchTerms"],
  primaryKeyColumns: ["itemKey"],
  requiredColumns: ["itemKey", "itemName"]
};

export const fileDefinition_locations: FileDefinition = {
  fileName: "locations.csv",
  columns: ["locationKey", "locationName", "address", "latitude", "longitude", "shortDescription", "longDescription", "websiteURL"],
  primaryKeyColumns: ["locationKey"],
  numericColumns: ["latitude", "longitude"],
  requiredColumns: ["locationKey", "locationName"]
};

export const fileDefinitions: FileDefinition[] = [
  fileDefinition_items,
  fileDefinition_locations, {
    fileName: "itemLocations.csv",
    columns: ["itemKey", "locationKey"],
    primaryKeyColumns: ["itemKey", "locationKey"],
    requiredColumns: ["itemKey", "locationKey"]
  }, {
    fileName: "relatedItems.csv",
    columns: ["itemKeyA", "itemKeyB"],
    primaryKeyColumns: ["itemKeyA", "itemKeyB"],
    requiredColumns: ["itemKeyA", "itemKeyB"]
  }, {
    fileName: "itemReuses.csv",
    columns: ["itemKey", "reuseName", "reuseDescription", "websiteURL"],
    primaryKeyColumns: ["itemKey", "reuseName"],
    requiredColumns: ["itemKey", "reuseName"]
  }];
