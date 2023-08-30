import { Reading } from "./Reading";

export const convertDataToReadingModel = (data: any[]): Reading[] => (data.map(row => ({
  serial: row.Serial,
  timeOfReadingLocal: new Date(row['Time of Reading - Local']),
  timeOfReadingUTC: new Date(row['Time of Reading - UTC']),
  forwardActiveEnergyType: row['forwardActiveEnergy Type'],
  forwardActiveEnergyValue: row['forwardActiveEnergy Value'],
  forwardActiveEnergyConsumption: row['forwardActiveEnergy Consumption(RX:1)'],
})));