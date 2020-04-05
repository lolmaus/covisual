import Controller from '@ember/controller';
import { ItemApp, ChartData, Country, Stat } from 'covisual/types';
import { Index_Route_Model } from './route';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

// @ts-ignore
import distinctColors from 'distinct-colors';

interface Option {
  label: string;
  isLogarithmic: boolean;
  stat: Stat;
  isBold: boolean;
}

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

  options: Option[] = [
    {
      label: 'New weekly cases (linear)',
      isLogarithmic: false,
      stat: 'confirmedNewWeekly',
      isBold: false,
    },
    {
      label: 'New weekly cases (logarithmic)',
      isLogarithmic: true,
      stat: 'confirmedNewWeekly',
      isBold: false,
    },
    {
      label: 'Weekly/total cases ratio (linear)',
      isLogarithmic: false,
      stat: 'confirmedRatioWeekly',
      isBold: true,
    },
    {
      label: 'New weekly deaths (linear)',
      isLogarithmic: false,
      stat: 'deathsNewWeekly',
      isBold: false,
    },
    {
      label: 'New weekly deaths (logarithmic)',
      isLogarithmic: true,
      stat: 'deathsNewWeekly',
      isBold: false,
    },
    {
      label: 'Weekly/total deaths ratio (linear)',
      isLogarithmic: false,
      stat: 'deathsRatioWeekly',
      isBold: true,
    },
  ];

  @tracked option: Option = this.options.findBy('stat', 'confirmedRatioWeekly')!;

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
          data: itemsApp.map((item) => item[this.option.stat]),
          fill: false,
          hidden: !this.countryNamesSelected.includes(label),
          borderColor: colors[index],
        };
      }),
    };
  }

  get chartOptions(): any {
    return {
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

      scales: {
        yAxes: [
          {
            display: true,
            type: this.option.isLogarithmic ? 'logarithmic' : 'linear',
          },
        ],
      },
    };
  }

  @action
  selectOption(option: Option): void {
    this.option = option;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    index: Index;
  }
}
