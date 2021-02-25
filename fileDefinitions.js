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
    primaryKey: ["itemKey"],
    columnNames: ["itemKey", "itemName", "shortDescription", "longDescription", "pictureURL", "searchTerms"]
};
exports.fileDefinition_locations = {
    fileName: "locations.csv",
    primaryKey: ["locationKey"],
    columnNames: ["locationKey", "locationName", "address", "latitude", "longitude", "shortDescription", "longDescription", "websiteURL"]
};
exports.fileDefinitions = [
    exports.fileDefinition_items,
    exports.fileDefinition_locations, {
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
    }
];
