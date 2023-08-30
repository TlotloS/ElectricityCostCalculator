import { Reading } from "./Reading";
import { TotalCosts } from "./TotalCost";

// the tarrif band rates
const tariffBands = [
  { lower: 0, upper: 100, rate: 0.24137 }, //  241,37 c/kWh
  { lower: 101, upper: 400, rate: 0.28247 }, // 282,47 c/kWh
  { lower: 401, upper: 650, rate: 0.30775 }, // 307,75 c/kWh
  { lower: 651, upper: Infinity, rate: 0.33176 }, // 331,76 c/kWh
];

// calculate cost based on consumption and tariff bands
const calculateCost = (consumption: number): number => {
  // get the tarrif band rate
  const rate = tariffBands.find(band => band.lower <= consumption && consumption <= band.upper)?.rate ?? 0;
  const cost = consumption * rate;
  return cost;
};


// Calculate total cost for an array of readings
export const calculateTotalCost = (readings: Reading[]): TotalCosts => {
  let totalCost_FromEnergyValueDelta = 0;
  let totalCost_FromEnergyConsumption = 0;
  // calculate previous reading value
  let prevCumulativeReading = readings[0].forwardActiveEnergyValue - readings[0].forwardActiveEnergyConsumption ;

  readings.forEach((reading) => {
    const consumption_energyValueDelta = reading.forwardActiveEnergyValue - prevCumulativeReading;
    totalCost_FromEnergyValueDelta += calculateCost(consumption_energyValueDelta);
    totalCost_FromEnergyConsumption += calculateCost(reading.forwardActiveEnergyConsumption);
    prevCumulativeReading = reading.forwardActiveEnergyValue;
    if (totalCost_FromEnergyValueDelta - totalCost_FromEnergyConsumption != 0)
    {
      console.log({totalCost_FromEnergyValueDelta,totalCost_FromEnergyConsumption, reading})
    } 
  });

  return {
    totalCost_FromEnergyValueDelta, 
    totalCost_FromEnergyConsumption
  };
};
