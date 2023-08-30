import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { Reading } from "./utils/Reading";
import { convertDataToReadingModel } from "./utils/convertDataToReadingModelHelper";
import { calculateTotalCost } from "./utils/electricityBillingCalculatorHelpers";

const headers = [
  "Serial",
  "Time of Reading - Local",
  "Time of Reading - UTC",
  "forwardActiveEnergy Type",
  "forwardActiveEnergy Value",
  "forwardActiveEnergy Consumption(RX:1)"
];

const assumptionsText = "\x1b[35mAssumptions:\x1b[0m\n" +
  "1) The house is a residential property (Domestic stand supply)\n" +
  "2) The electricity supply is single phase, CONVENTIONAL AND PREPAID\n" +
  "3) The house is not INDIGENT (suffering from extreme poverty)\n" +
  "4) The house does not form within a (domestic complexes and/or gated domestic communities situated\n" +
  "5) The units for the measure cumulative energy and consumption fields are is (kWh)\n" +
  "within legally established townships) i.e. DOMESTIC BULK STANDARD SUPPLY do not apply\n\n" +
  "\x1b[35m========================================================================================\x1b[0m\n\n";

(() => {

  // csv file is located in the ./dist folder (i.e. the js files get compiled into there from typescript)
  const csvFilePath = path.resolve(__dirname, '../readings.csv');
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  parse(fileContent, {
    delimiter: ',',
    fromLine: 2, // skip the first line
    columns: headers,
  }, (error, result: Reading[]) => {
    if (error) {
      console.error(error);
    }
    const readings = convertDataToReadingModel(result)
    // Calculate total cost for the array of readings
    const output = calculateTotalCost(readings);
    console.log(assumptionsText);
    console.log(`Total Cost: R ${output.totalCost_FromEnergyValueDelta.toFixed(2)} (from cumilative energy delta)`);
    console.log(`Total Cost: R ${output.totalCost_FromEnergyConsumption.toFixed(2)} (from the given consumption field)`);
    console.log("\n\n\n")
  });
})();

  