// tslint:disable:no-console

import assert from "assert";
import fs from "fs";
import * as _ from "lodash";
import { NUM_NETWORKED_EHANDLE_BITS } from "../consts";
import { DemoFile } from "../demo";
import {
  PropType,
  SPROP_EXCLUDE,
  SPROP_INSIDEARRAY,
  SPROP_NOSCALE,
  SPROP_UNSIGNED
} from "../props";

function parseDemoFile(path: string) {
  fs.readFile(path, (err, buffer) => {
    assert.ifError(err);

    const demoFile = new DemoFile();

    demoFile.entities.on("datatablesready", () => {
      console.log("// DO NOT MODIFY!");
      console.log("// Auto-generated by ./generators/sendtabletypes.ts");
      console.log("// tslint:disable:class-name");
      console.log("");
      console.log('import { EntityHandle } from "./entityhandle";');
      console.log();
      console.log(
        "export interface Vector {\n  x: number;\n  y: number;\n  z: number;\n}"
      );
      console.log();

      for (const dt of demoFile.entities.dataTables) {
        console.log(`export interface ${dt.netTableName} {`);

        let lastElemType: string | undefined;
        for (const prop of dt.props) {
          let typeStr;

          if ((prop.flags & SPROP_EXCLUDE) !== 0) {
            console.log(`  // ${prop.dtName}.${prop.varName} - excluded`);
            continue;
          }

          if (prop.type === PropType.Int) {
            if (prop.numBits === 1) {
              typeStr = "boolean";
            } else if (
              prop.numBits === NUM_NETWORKED_EHANDLE_BITS &&
              (prop.flags & SPROP_UNSIGNED) !== 0 &&
              (prop.flags & SPROP_NOSCALE) !== 0
            ) {
              typeStr = "EntityHandle";
            } else {
              typeStr = "number";
            }
          } else if (prop.type === PropType.Float) {
            typeStr = "number";
          } else if (prop.type === PropType.Vector) {
            typeStr = "Vector";
          } else if (prop.type === PropType.VectorXY) {
            typeStr = "Vector";
          } else if (prop.type === PropType.String) {
            typeStr = "string";
          } else if (prop.type === PropType.Array) {
            if (typeof lastElemType === "undefined")
              throw new Error(
                "Array prop type was not preceded by SPROP_INSIDEARRAY"
              );

            typeStr = lastElemType + "[]";
          } else if (prop.type === PropType.DataTable) {
            console.log(`  // ${prop.varName}: DataTable;`);
            continue;
          } else if (prop.type === PropType.Int64) {
            typeStr = "Long";
          } else {
            throw new Error(`Unexpected prop type ${prop.type}`);
          }

          // Skip inside array - we'll print the PropType.Array
          // which will follow immediately after this prop
          if ((prop.flags & SPROP_INSIDEARRAY) !== 0) {
            console.log(`  // ${prop.varName}: ${typeStr} - InsideArray;`);
            lastElemType = typeStr;
            continue;
          }

          let name = prop.varName;
          if (
            name.charCodeAt(0) < 65 ||
            name.indexOf(".") !== -1 ||
            name.indexOf("[") !== -1
          ) {
            name = `["${name}"]`;
          }

          console.log(`  ${name}: ${typeStr};`);
        }

        console.log("}");
        console.log();
      }

      for (const serverClass of demoFile.entities.serverClasses) {
        const dataTableNames = _.keys(
          _.groupBy(serverClass.flattenedProps, flat => flat.table.netTableName)
        );

        console.log(`export interface ${serverClass.name} {`);

        for (const dataTable of dataTableNames) {
          if (dataTable === "DT_AnimTimeMustBeFirst") {
            continue;
          }

          console.log(`  ${dataTable}: ${dataTable};`);
        }

        console.log(`}`);
        console.log("");
      }

      demoFile.cancel();
    });

    demoFile.parse(buffer);
  });
}

parseDemoFile(process.argv[2]);
