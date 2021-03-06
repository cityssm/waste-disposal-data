import * as assert from "assert";

import * as fs from "fs";
import * as path from "path";

import * as Papa from "papaparse";

import * as fd from "../fileDefinitions";


const parseResults: {
  "items.csv"?: Papa.ParseResult<fd.Item>;
  "locations.csv"?: Papa.ParseResult<fd.Location>;
  "itemLocations.csv"?: Papa.ParseResult<fd.ItemLocation>;
  "relatedItems.csv"?: Papa.ParseResult<fd.RelatedItem>;
  "itemReuses.csv"?: Papa.ParseResult<fd.ItemReuse>;
  [fileName: string]: Papa.ParseResult<{}>;
} = {};


const getPrimaryKey = (fileDefinition: fd.FileDefinition, row: { [columnName: string]: string }) => {

  let key = "";

  for (const primaryKeyColumn of fileDefinition.primaryKeyColumns) {
    key += (key === "" ? "" : ":") + row[primaryKeyColumn];
  }

  return key;
};


const getKeySet = (fileDefinition: fd.FileDefinition): Set<string> => {

  const keySet = new Set<string>();

  const rows = parseResults[fileDefinition.fileName].data;

  for (const row of rows) {
    const key = getPrimaryKey(fileDefinition, row);
    keySet.add(key);
  }

  return keySet;
};


describe("Parse and Validate Files", () => {

  /*
   * Load Files
   */

  before((done) => {

    let remainingCount = fd.fileDefinitions.length;

    for (const fileDefinition of fd.fileDefinitions) {

      Papa.parse(fs.createReadStream(path.join("data", fileDefinition.fileName)), {
        header: true,
        complete: (results) => {

          parseResults[fileDefinition.fileName] = results;

          remainingCount -= 1;

          if (remainingCount <= 0) {
            done();
          }
        }
      });
    }
  });

  /*
   * Generic File Checks
   */

  describe("Generic File Checks", () => {

    for (const fileDefinition of fd.fileDefinitions) {

      const fileName = fileDefinition.fileName;

      describe(fileName, () => {

        it("exists", () => {
          assert.ok(parseResults[fileName]);
        });

        it("parsed without errors", () => {
          if (parseResults[fileName].errors.length > 0) {
            const firstError = parseResults[fileName].errors[0];
            assert.fail(firstError.row.toString() + ": " + firstError.message);
          }

          assert.ok(true);
        });

        it("has records", () => {
          assert.ok(parseResults[fileName].data.length > 0);
        });

        for (const columnName of fileDefinition.columns) {

          it("has column \"" + columnName + "\"", () => {
            assert.ok(parseResults[fileName].data[0].hasOwnProperty(columnName));
          });
        }

        it("respects the primary key", () => {
          const keySet = getKeySet(fileDefinition);
          assert.strictEqual(keySet.size, parseResults[fileName].data.length);
        });

        if (fileDefinition.numericColumns) {

          for (const columnName of fileDefinition.numericColumns) {

            it("has only numeric values in column \"" + columnName + "\"", () => {

              for (const row of parseResults[fileName].data) {

                if (isNaN(row[columnName])) {
                  assert.fail("non-numeric value = " + row[columnName]);
                }
              }

              assert.ok(true);
            });
          }
        }

        if (fileDefinition.requiredColumns) {
          for (const columnName of fileDefinition.requiredColumns) {

            it("always has values in required column \"" + columnName + "\"", () => {

              for (const row of parseResults[fileName].data) {

                if (row[columnName] === "") {
                  assert.fail();
                }
              }

              assert.ok(true);
            });
          }
        }
      });
    }

  });

  /*
   * Foreign Key Checks
   */

  describe("Foreign Key Checks", () => {

    describe("relatedItems.csv", () => {

      it("uses itemKeyA values found in the items.csv file", () => {

        const itemKeySet = getKeySet(fd.fileDefinition_items);

        for (const row of parseResults["relatedItems.csv"].data) {
          if (!itemKeySet.has(row.itemKeyA)) {
            assert.fail("invalid itemKeyA = " + row.itemKeyA);
          }
        }

        assert.ok(true);
      });

      it("uses itemKeyB values found in the items.csv file", () => {

        const itemKeySet = getKeySet(fd.fileDefinition_items);

        for (const row of parseResults["relatedItems.csv"].data) {
          if (!itemKeySet.has(row.itemKeyB)) {
            assert.fail("invalid itemKeyB = " + row.itemKeyB);
          }
        }

        assert.ok(true);
      });
    });

    describe("itemLocations.csv", () => {

      it("uses itemKey values found in the items.csv file", () => {

        const itemKeySet = getKeySet(fd.fileDefinition_items);

        for (const row of parseResults["itemLocations.csv"].data) {
          if (!itemKeySet.has(row.itemKey)) {
            assert.fail("invalid itemKey = " + row.itemKey);
          }
        }

        assert.ok(true);
      });

      it("uses locationKey values found in the locations.csv file", () => {

        const locationKeySet = getKeySet(fd.fileDefinition_locations);

        for (const row of parseResults["itemLocations.csv"].data) {
          if (!locationKeySet.has(row.locationKey)) {
            assert.fail("invalid locationKey = " + row.locationKey);
          }
        }

        assert.ok(true);
      });

    });

    describe("itemReuses.csv", () => {

      it("uses itemKey values found in the items.csv file", () => {

        const itemKeySet = getKeySet(fd.fileDefinition_items);

        for (const row of parseResults["itemReuses.csv"].data) {
          if (!itemKeySet.has(row.itemKey)) {
            assert.fail("invalid itemKey = " + row.itemKey);
          }
        }

        assert.ok(true);
      });
    });
  });

  /*
   * Specific File Checks
   */

  describe("Specific File Checks", () => {

    describe("relatedItems.csv", () => {

      it("has properly ordered keys (itemKeyA < itemKeyB)", () => {

        for (const row of parseResults["relatedItems.csv"].data) {

          const key = row.itemKeyA + ":" + row.itemKeyB;

          if (row.itemKeyA >= row.itemKeyB) {
            assert.fail("incorrectly ordered = " + key);
          }
        }

        assert.ok(true);
      });
    });
  });
});
