import fs from 'fs';
import { createReadStream } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { parse } from 'csv-parse';

const locations = [];
const csvFilePath = join('C:', 'infection-control-alerts', 'wpsources2.csv');

createReadStream(csvFilePath)
  .pipe(parse({ columns: true, delimiter: ',' }))
  .on('data', (row) => {
    locations.push({
      title: row['name'], // Adjust the key according to your CSV column headers
      lat: parseFloat(row['lat']), // Adjust the key according to your CSV column headers
      lng: parseFloat(row['lng']) // Adjust the key according to your CSV column headers
    });
  })
  .on('end', async () => {
    console.log('CSV file successfully processed');
    await writeFile('locations.json', JSON.stringify(locations, null, 2));
  });
