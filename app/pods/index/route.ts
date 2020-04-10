import Route from '@ember/routing/route';
import { ItemsDict, Item, CountryName, ItemAppGroup, Country } from 'covisual/types';
import fetch from 'fetch';
import { map, times } from 'lodash-es';
import { inject as service } from '@ember/service';
import Intl from 'ember-intl/services/intl';
import palette from 'covisual/utils/palette';

// @ts-ignore
import { getUserLocales } from 'get-user-locale';

export interface Index_Route_Model {
  colors: string[];
  dates: string[];
  itemsDict: ItemsDict;
  itemAppGroups: ItemAppGroup[];
}

const SupportedLocales = ['en', 'ru'];

export default class Index_Route extends Route {
  @service intl!: Intl;

  queryParams = {
    lang: { refreshModel: true },
  };

  get defaultLocale(): string {
    const locale = getUserLocales().find((locale: string) => {
      return SupportedLocales.includes(locale.split('-')[0]);
    });

    return locale?.split('-')[0] || SupportedLocales[0];
  }

  async model({ lang }: { lang: string }): Promise<Index_Route_Model> {
    this.intl.setLocale(lang || this.defaultLocale);

    const itemsResponse = await fetch('https://pomber.github.io/covid19/timeseries.json');
    const itemsDict: ItemsDict = await itemsResponse.json();
    const colors = palette(Object.keys(itemsDict).length);

    return {
      colors,
      dates: itemsDict.US.mapBy('date'),
      itemsDict,
      itemAppGroups: this.parseData(itemsDict, colors),
    };
  }

  parseData(itemsDict: ItemsDict, colors: string[]): ItemAppGroup[] {
    let i = -1;

    return map(itemsDict, (items: Item[], country: CountryName) => {
      i++;

      return {
        country: new Country(this, country, colors[i]),
        items: items.map((item: Item, index: number) => {
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
            country,
            confirmedNewDaily,
            confirmedRatioDaily,
            confirmedNewWeekly,
            confirmedRatioWeekly,
            deathsNewDaily,
            deathsRatioDaily,
            deathsNewWeekly,
            deathsRatioWeekly,
          };
        }),
      };
    })
      .filter((itemAppGroup) => itemAppGroup.items.length)
      .sortBy('country.countryLoc');
  }
}
