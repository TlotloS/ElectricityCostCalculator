# Electricity Cost Calculator

This project provides a utility to calculate electricity costs based on consumption and tariff bands. It reads data from a CSV file and performs the calculations.

## Prerequisites

- Node.js
- npm

## Installation

1. Clone the repository:

2. Navigate to the project directory:

3. Install dependencies:

## Configuration

1. Update the tariff bands in the `src/tariffBands.ts` file with the latest rates.

2. Place your CSV data file in the root folder, with the name 'readings.csv'.

## Usage

1. Open a terminal and navigate to the project directory.

2. Run the application:

3. The calculated costs for each entry in the CSV data file will be displayed in the terminal.

## Assumptions

1. The house is a residential property (Domestic stand supply).
2. The electricity supply is single phase, CONVENTIONAL AND PREPAID.
3. The house is not INDIGENT (suffering from extreme poverty).
4. The house does not form within a (domestic complexes and/or gated domestic communities situated within legally established townships) i.e. DOMESTIC BULK STANDARD SUPPLY do not apply.
5. The units for the measure cumulative energy and consumption fields are is (kWh).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
