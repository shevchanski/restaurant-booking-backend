/* eslint-disable no-console */
import axios from 'axios';
import cheerio from 'cheerio';
import { writeFile } from 'fs/promises';

const fetchCuisines = async () => {
  try {
    const { data } = await axios.get(
      'https://en.wikipedia.org/wiki/List_of_cuisines'
    );
    const $ = cheerio.load(data);
    const cuisines: string[] = [];

    $('div.div-col ul li a').each((i, elem) => {
      cuisines.push($(elem).text().replace(' cuisine', ''));
    });

    return cuisines;
  } catch (error) {
    console.error('Error scraping cuisines:', error);
    return [];
  }
};

const saveListToFile = async (filePath: string, data: string[]) => {
  try {
    const jsoned = JSON.stringify(data);

    await writeFile(filePath, jsoned, 'utf-8');
    console.log(`Cuisines saved to ${filePath}`);
  } catch (error) {
    console.error('Error saving cuisines to file:', error);
  }
};

const main = async () => {
  const list = await fetchCuisines();
  await saveListToFile('cuisine-without.json', list);
};

main();
