import Controller from '@ember/controller';
import {
  CountryName,
  ItemAppGroup,
  Metric,
  Subject,
  CountriesAfrica as CountryNamesAfrica,
  CountriesAsia as CountryNamesAsia,
  CountriesEurope as CountryNamesEurope,
  CountriesNorthAmerica as CountryNamesNorthAmerica,
  CountriesSouthAmerica as CountryNamesSouthAmerica,
  CountriesAustralia as CountryNamesAustralia,
  CountriesShips as CountryNamesShips,
  Preset,
  ItemApp,
  Stat,
  Country,
  Dict,
} from 'covisual/types';
import { Index_Route_Model } from './route';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { without, keyBy } from 'lodash-es';

export default class Index extends Controller {
  readonly model!: Index_Route_Model;

  @readOnly('model.itemAppGroups')
  readonly itemAppGroups!: ItemAppGroup[];

  readonly metrics: Metric[] = Object.values(Metric);
  readonly subjects: Subject[] = Object.values(Subject);

  // prettier-ignore
  // @ts-ignore
  queryParams = [
    'metric',
    'subject',
    {isLogarithmic: {as: 'log'}},
    {countryNamesSelectedSerialized: {as: 'countries'}},
    {isCountriesModalVisible: {as: 'select-countries'}},
    {minCases: {as: 'min-cases'}},
  ];

  @tracked metric: Metric = Metric.RatioNewWeeklyTotal;
  @tracked subject: Subject = Subject.Confirmed;
  @tracked isLogarithmic = true;
  @tracked minCases = 100;

  @tracked isCountriesModalVisible = false;
  @tracked countryNamesSelectedSerialized = '';
  @tracked countriesModalFilter = '';
  @tracked hoveredDatasetIndex = -1;

  readonly presets = Object.values(Preset);

  get isLogarithmicToggleDisabled(): boolean {
    return this.metric === Metric.RatioNewWeeklyTotal;
  }

  get isLogarithmicEffective(): boolean {
    return this.isLogarithmicToggleDisabled ? true : this.isLogarithmic;
  }

  @computed('itemAppGroups.[]')
  get itemsAppGroupsTop30Confirmed(): ItemAppGroup[] {
    return this.itemAppGroups.sortBy('items.lastObject.confirmed').reverse().slice(0, 30);
  }

  @computed('itemAppGroups.[]')
  get itemsAppGroupsTop30Deaths(): ItemAppGroup[] {
    return this.itemAppGroups.sortBy('items.lastObject.deaths').reverse().slice(0, 30);
  }

  @computed('itemsAppGroupsTop30Confirmed')
  get countriesTop30Confirmed(): Country[] {
    return this.itemsAppGroupsTop30Confirmed.mapBy('country').sortBy('countryLoc');
  }

  @computed('itemsAppGroupsTop30Confirmed')
  get countriesTop30Deaths(): Country[] {
    return this.itemsAppGroupsTop30Deaths.mapBy('country').sortBy('countryLoc');
  }

  @computed('countriesTop30Confirmed')
  get countriesDefaultSerialized(): string {
    return this._serializeCountries(this.countriesTop30Confirmed);
  }

  @computed('itemAppGroups')
  get countries(): Country[] {
    return this.itemAppGroups.mapBy('country');
  }

  @computed('countries')
  get countriesByCountryName(): Dict<Country> {
    return keyBy(this.countries, 'countryName');
  }

  @computed('countriesModalFilter')
  get countriesFilteredForModal(): Country[] {
    return this.countriesModalFilter.length
      ? this.countries
          .filter((country) =>
            country.countryLoc.toLowerCase().includes(this.countriesModalFilter.toLocaleLowerCase())
          )
          .sortBy('countryLoc')
      : this.countries;
  }

  @computed('countryNamesSelectedSerialized')
  get countriesSelected(): Country[] {
    return this.countryNamesSelectedSerialized === ''
      ? this.countriesTop30Confirmed
      : this._deserializeCountries(this.countryNamesSelectedSerialized);
  }

  @computed('countriesSelected', 'itemAppGroups')
  get itemAppGroupsSelected(): ItemAppGroup[] {
    return this.itemAppGroups.filter((itemAppGroup) =>
      this.countriesSelected.includes(itemAppGroup.country)
    );
  }

  @computed('itemAppGroupsSelected', 'minCases', 'subject')
  get itemAppGroupsSelectedFiltered(): ItemAppGroup[] {
    return this.itemAppGroupsSelected.map((itemAppGroup) => {
      return {
        ...itemAppGroup,
        items: itemAppGroup.items.filter((item: ItemApp) => {
          return item[this.subject] >= this.minCases;
        }),
      };
    });
  }

  @computed('metric', 'subject')
  get statSelected(): Stat {
    switch (this.metric) {
      case Metric.NewWeekly: {
        switch (this.subject) {
          case Subject.Deaths: {
            return 'deathsNewWeekly';
          }
          case Subject.Confirmed: {
            return 'confirmedNewWeekly';
          }
        }

        break;
      }

      case Metric.Total: {
        switch (this.subject) {
          case Subject.Deaths: {
            return 'deaths';
          }
          case Subject.Confirmed: {
            return 'confirmed';
          }
        }

        break;
      }

      case Metric.RatioNewWeeklyTotal: {
        switch (this.subject) {
          case Subject.Deaths: {
            return 'deathsRatioWeekly';
          }
          case Subject.Confirmed: {
            return 'confirmedRatioWeekly';
          }
        }

        break;
      }
    }
  }

  @computed('itemAppGroupsSelectedFiltered')
  get datesEffective(): string[] {
    return this.itemAppGroupsSelectedFiltered
      .sortBy('items.length')
      .reverse()[0]
      .items.mapBy('date');
  }

  get dates(): string[] {
    return this.model.dates;
  }

  get chartData(): any {
    return {
      labels: this.datesEffective,
      datasets: this.itemAppGroupsSelectedFiltered.map((itemsAppGroup: ItemAppGroup, index) => {
        const country = itemsAppGroup.country;

        return {
          label: country.countryLoc,
          data: itemsAppGroup.items.map((item) => {
            return {
              x: item.date,
              y: item[this.statSelected],
            };
          }),
          fill: false,
          hidden: !this.countriesSelected.includes(country),
          borderColor: country.color,
          borderWidth: index === this.hoveredDatasetIndex ? 10 : 1,
          pointRadius: 0,
          pointHitRadius: 3,
        };
      }),
    };
  }

  get chartOptions(): any {
    return {
      animation: false,

      hover: {
        mode: 'asdf',
      },

      legend: {
        position: 'right',
        onClick: (event: Event): void => {
          event.stopPropagation();
        },
        onHover: (_event: Event, legendItem: any): void => {
          if (this.hoveredDatasetIndex !== legendItem.datasetIndex) {
            this.hoveredDatasetIndex = legendItem.datasetIndex;
          }
        },
      },

      maintainAspectRatio: false,

      plugins: {
        datalabels: {
          align: 180 - 45,
          anchor: 'end',
          color: function (context: any): string {
            return context.dataset.borderColor;
          },
          display: function (context: any): boolean {
            return [
              1,
              Math.floor(context.dataset.data.length / 2),
              context.dataset.data.length - 1,
            ].includes(context.dataIndex);
          },
          font: 10,
          formatter: function (_value: number, context: any): string {
            return context.dataset.label;
          },
          offset: 0,
          rotation: -45,
        },
      },

      scales: {
        yAxes: [
          {
            display: true,
            type: this.isLogarithmicEffective ? 'logarithmic' : 'linear',
          },
        ],
      },

      tooltips: {
        enabled: false,
        intersect: false,
        custom: (/* tooltip */): void => {
          if (this.hoveredDatasetIndex !== -1) {
            this.hoveredDatasetIndex = -1;
          }
        },
      },
    };
  }

  private _serializeCountries(countries: Country[]): string {
    return this._serializeCountryNames(countries.mapBy('countryName'));
  }

  private _serializeCountryNames(countryNames: CountryName[]): string {
    return countryNames
      .map((countryName) => {
        // prettier-ignore
        return countryName
          .replace(/,/g, '~')
          .replace(/ /g, '_');
      })
      .join('.');
  }

  private _deserializeCountries(countriesSerialized: string): Country[] {
    // prettier-ignore
    return countriesSerialized
      .split('.')
      .map((countrySerialized) => {
        // prettier-ignore
        const countryName: CountryName = countrySerialized
          .replace(/~/g, ',')
          .replace(/_/g, ' ') as CountryName;

        return this.countriesByCountryName[countryName];
      });
  }

  private _applyCountryNamesSerialized(newCountriesSerialized: string): void {
    // prettier-ignore
    this.countryNamesSelectedSerialized =
      newCountriesSerialized === this.countriesDefaultSerialized
          ? ''
          : newCountriesSerialized;
  }

  @action
  selectMetric(metric: Metric): void {
    this.metric = metric;
  }

  @action
  selectSubject(subject: Subject): void {
    this.subject = subject;
  }

  @action
  selectLog(event: InputEvent): void {
    if (this.isLogarithmicToggleDisabled) {
      return;
    }

    this.isLogarithmic = (event.target as HTMLInputElement).checked;
  }

  @action
  toggleCountriesModal(newState = !this.isCountriesModalVisible): void {
    this.isCountriesModalVisible = newState;
  }

  @action
  toggleCountry(country: Country, event: InputEvent): void {
    const newState = (event.target as HTMLInputElement).checked;

    // prettier-ignore
    const newCountries =
      newState
        ? [...this.countriesSelected, country].sort()
        : without(this.countriesSelected, country);

    const newCountriesSerialized = this._serializeCountries(newCountries);

    this._applyCountryNamesSerialized(newCountriesSerialized);
  }

  @action
  selectCountries(countries: Country[]): void {
    const countryNamesSelectedSerialized = this._serializeCountries(countries);
    this._applyCountryNamesSerialized(countryNamesSelectedSerialized);
  }

  @action
  selectCountryNames(countryNames: CountryName[]): void {
    const countryNamesSelectedSerialized = this._serializeCountryNames(countryNames);
    this._applyCountryNamesSerialized(countryNamesSelectedSerialized);
  }

  @action
  selectCountryOnly(country: Country): void {
    this.selectCountries([country]);
  }

  @action
  filterCountriesInModal(event: InputEvent): void {
    this.countriesModalFilter = (event.target as HTMLInputElement).value;
  }

  @action
  filterCountriesInModalReset(): void {
    this.countriesModalFilter = '';
  }

  @action
  selectPreset(preset: Preset): void {
    switch (preset) {
      case Preset.Top30Confirmed: {
        this.selectCountries(this.countriesTop30Confirmed);
        break;
      }
      case Preset.Top30Deaths: {
        this.selectCountries(this.countriesTop30Deaths);
        break;
      }
      case Preset.Africa: {
        this.selectCountryNames(CountryNamesAfrica);
        break;
      }
      case Preset.Asia: {
        this.selectCountryNames(CountryNamesAsia);
        break;
      }
      case Preset.Australia: {
        this.selectCountryNames(CountryNamesAustralia);
        break;
      }
      case Preset.Europe: {
        this.selectCountryNames(CountryNamesEurope);
        break;
      }
      case Preset.NorthAmerica: {
        this.selectCountryNames(CountryNamesNorthAmerica);
        break;
      }
      case Preset.SouthAmerica: {
        this.selectCountryNames(CountryNamesSouthAmerica);
        break;
      }
      case Preset.Ships: {
        this.selectCountryNames(CountryNamesShips);
        break;
      }
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    index: Index;
  }
}
