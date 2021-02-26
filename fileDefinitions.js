"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDefinitions = exports.fileDefinition_locations = exports.fileDefinition_items = void 0;
;
;
;
;
;
;
exports.fileDefinition_items = {
    fileName: "items.csv",
    columns: ["itemKey", "itemName", "shortDescription", "longDescription", "pictureURL", "searchTerms"],
    primaryKeyColumns: ["itemKey"],
    requiredColumns: ["itemKey", "itemName"]
};
exports.fileDefinition_locations = {
    fileName: "locations.csv",
    columns: ["locationKey", "locationName", "address", "latitude", "longitude", "shortDescription", "longDescription", "websiteURL"],
    primaryKeyColumns: ["locationKey"],
    numericColumns: ["latitude", "longitude"],
    requiredColumns: ["locationKey", "locationName"]
};
exports.fileDefinitions = [
    exports.fileDefinition_items,
    exports.fileDefinition_locations, {
        fileName: "itemLocations.csv",
        columns: ["itemKey", "locationKey", "priorityNumber"],
        primaryKeyColumns: ["itemKey", "locationKey"],
        numericColumns: ["priorityNumber"],
        requiredColumns: ["itemKey", "locationKey"]
    }, {
        fileName: "relatedItems.csv",
        columns: ["itemKeyA", "itemKeyB"],
        primaryKeyColumns: ["itemKeyA", "itemKeyB"],
        requiredColumns: ["itemKeyA", "itemKeyB"]
    }, {
        fileName: "itemReuses.csv",
        columns: ["itemKey", "reuseIndex", "reuseName", "reuseDescription", "websiteURL"],
        primaryKeyColumns: ["itemKey", "reuseIndex"],
        numericColumns: ["reuseIndex"],
        requiredColumns: ["itemKey", "reuseIndex", "reuseName"]
    }
];
