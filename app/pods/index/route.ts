import Route from '@ember/routing/route';
import { ItemsDict, ItemApp, Item, Country } from 'covisual/types';
import fetch from 'fetch';
import { map, times } from 'lodash-es';

export interface Index_Route_Model {
  itemsDict: ItemsDict;
  itemsAppArrays: ItemApp[][];
}

export default class Index_Route extends Route {
  async model(): Promise<Index_Route_Model> {
    const itemsResponse = await fetch('https://pomber.github.io/covid19/timeseries.json');
    const itemsDict: ItemsDict = await itemsResponse.json();

    return {
      itemsDict,
      itemsAppArrays: this.parseData(itemsDict),
    };
  }

  parseData(itemsDict: ItemsDict): ItemApp[][] {
    return map(itemsDict, (items: Item[], countryName: Country) => {
      return items.map((item: Item, index: number) => {
        // prettier-ignore
        const confirmedNewDaily =
          index === 0
            ? 0
            : item.confirmed - items[index - 1].confirmed;

        // prettier-ignore
        const confirmedRatioDaily =
          item.confirmed > 0
            ? confirmedNewDaily / item.confirmed
            : 0;

        // prettier-ignore
        const deathsNewDaily =
          index === 0
            ? 0
            : item.deaths - items[index - 1].deaths;

        // prettier-ignore
        const deathsRatioDaily =
          item.deaths > 0
            ? deathsNewDaily / item.deaths
            : 0;

        const countWeekly = index > 7 ? 7 : index;

        const confirmedNewWeekly = times(countWeekly).reduce((result, day) => {
          const newIndex = index - day;

          if (newIndex <= 0) {
            return result;
          }

          const confirmedNewDaily = items[newIndex].confirmed - items[newIndex - 1].confirmed;
          return result + confirmedNewDaily;
        }, 0);

        // prettier-ignore
        const confirmedRatioWeekly =
          item.confirmed > 0
            ? confirmedNewWeekly / item.confirmed
            : 0;

        const deathsNewWeekly = times(countWeekly).reduce((result, day) => {
          const newIndex = index - day;

          if (newIndex <= 0) {
            return result;
          }

          const deathsNewDaily = items[newIndex].deaths - items[newIndex - 1].deaths;
          return result + deathsNewDaily;
        }, 0);

        // prettier-ignore
        const deathsRatioWeekly =
          item.deaths > 0
            ? deathsNewWeekly / item.deaths
            : 0;

        return {
          ...item,
          countryName,
          confirmedNewDaily,
          confirmedRatioDaily,
          confirmedNewWeekly,
          confirmedRatioWeekly,
          deathsNewDaily,
          deathsRatioDaily,
          deathsNewWeekly,
          deathsRatioWeekly,
        };
      });
    });
  }
}
