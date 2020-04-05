import Controller from '@ember/controller';
import { ItemApp, ChartData, Country } from 'covisual/types';
import { Index_Route_Model } from './route';
import { tracked } from '@glimmer/tracking';

// @ts-ignore
import distinctColors from 'distinct-colors';

export default class Index extends Controller {
  model!: Index_Route_Model;

  @tracked
  countryNamesAvailable: Country[] = [
    'Algeria',
    'Austria',
    'Bangladesh',
    'Belgium',
    'Brazil',
    'Canada',
    'China',
    'Denmark',
    'Ecuador',
    'Finland',
    'France',
    'Germany',
    'India',
    'Indonesia',
    'Iran',
    'Ireland',
    'Italy',
    'Japan',
    'Kazakhstan',
    'Korea, South',
    'Netherlands',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Turkey',
    'US',
    'United Kingdom',
  ];

  @tracked
  countryNamesSelected: Country[] = [
    // prettier-ignore
    'China',
    'Russia',
    'United Kingdom',
  ];

  get itemsAppArrays(): ItemApp[][] {
    return this.model.itemsAppArrays;
  }

  get itemsAppArraysFiltered(): ItemApp[][] {
    return this.itemsAppArrays.filter((itemsApp) =>
      this.countryNamesAvailable.includes(itemsApp[0].countryName)
    );
  }

  get chartData(): ChartData {
    const colors: string[] = distinctColors({
      count: this.itemsAppArraysFiltered.length,
      lightMin: 20,
      lightMax: 80,
      samples: this.itemsAppArraysFiltered.length,
      // @ts-ignore
    }).map((chroma) => chroma.hex());

    return {
      labels: this.itemsAppArraysFiltered[0].mapBy('date'),
      datasets: this.itemsAppArraysFiltered.map((itemsApp: ItemApp[], index: number) => {
        const label = itemsApp[0].countryName;

        return {
          label,
          data: itemsApp.map(({ confirmedRatioWeekly }) => confirmedRatioWeekly),
          fill: false,
          hidden: !this.countryNamesSelected.includes(label),
          borderColor: colors[index],
        };
      }),
    };
  }

  @tracked
  chartOptions = {
    legend: {
      position: 'right',
    },

    maintainAspectRatio: false,

    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        color: function (context: any): string {
          return context.dataset.borderColor;
        },
        font: function (context: any): any {
          const w = context.chart.width;
          return {
            size: w < 512 ? 12 : 14,
          };
        },
        formatter: function (_value: number, context: any): string {
          return context.dataset.label;
        },
        rotation: -45,
      },
    },
  };
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    index: Index;
  }
}
