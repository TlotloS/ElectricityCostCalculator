export interface Reading {
  serial: string;
  timeOfReadingLocal: Date;
  timeOfReadingUTC: Date;
  forwardActiveEnergyType: string;
  forwardActiveEnergyValue: number;
  forwardActiveEnergyConsumption: number;
};
