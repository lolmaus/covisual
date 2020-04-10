export interface Dict<T> {
  [index: string]: T;
}

export interface Item {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface ItemApp extends Item {
  country: Country;
  confirmedNewDaily: number;
  confirmedNewWeekly: number;
  confirmedRatioDaily: number;
  confirmedRatioWeekly: number;
  deathsNewDaily: number;
  deathsNewWeekly: number;
  deathsRatioDaily: number;
  deathsRatioWeekly: number;
}

export enum Metric {
  NewWeekly = 'new-weekly',
  Total = 'total',
  RatioNewWeeklyTotal = 'ratio-new-weekly-total',
}

export enum Subject {
  Deaths = 'deaths',
  Confirmed = 'confirmed',
}

export type Stat =
  | 'confirmed'
  | 'confirmedNewDaily'
  | 'confirmedNewWeekly'
  | 'confirmedRatioDaily'
  | 'confirmedRatioWeekly'
  | 'deaths'
  | 'deathsNewDaily'
  | 'deathsRatioDaily'
  | 'deathsNewWeekly'
  | 'deathsRatioWeekly';

export interface ItemAppGroup {
  country: Country;
  items: ItemApp[];
}

export type ItemsDict = Dict<Item[]>;

export enum Preset {
  Top30Confirmed = 'top-30-by-confirmed',
  Top30Deaths = 'top-30-by-deaths',
  Africa = 'africa',
  Asia = 'asia',
  Australia = 'australia',
  Europe = 'europe',
  NorthAmerica = 'north-america',
  SouthAmerica = 'south-america',
  Ships = 'ships',
}

export type Country =
  | 'Afghanistan'
  | 'Albania'
  | 'Algeria'
  | 'Andorra'
  | 'Angola'
  | 'Antigua and Barbuda'
  | 'Argentina'
  | 'Armenia'
  | 'Australia'
  | 'Austria'
  | 'Azerbaijan'
  | 'Bahamas'
  | 'Bahrain'
  | 'Bangladesh'
  | 'Barbados'
  | 'Belarus'
  | 'Belgium'
  | 'Belize'
  | 'Benin'
  | 'Bhutan'
  | 'Bolivia'
  | 'Bosnia and Herzegovina'
  | 'Botswana'
  | 'Brazil'
  | 'Brunei'
  | 'Bulgaria'
  | 'Burkina Faso'
  | 'Burma'
  | 'Burundi'
  | 'Cabo Verde'
  | 'Cambodia'
  | 'Cameroon'
  | 'Canada'
  | 'Central African Republic'
  | 'Chad'
  | 'Chile'
  | 'China'
  | 'Colombia'
  | 'Congo (Brazzaville)'
  | 'Congo (Kinshasa)'
  | 'Costa Rica'
  | 'Croatia'
  | 'Cuba'
  | 'Cyprus'
  | 'Czechia'
  | 'Denmark'
  | 'Diamond Princess'
  | 'Djibouti'
  | 'Dominica'
  | 'Dominican Republic'
  | 'Ecuador'
  | 'Egypt'
  | 'El Salvador'
  | 'Equatorial Guinea'
  | 'Eritrea'
  | 'Estonia'
  | 'Eswatini'
  | 'Ethiopia'
  | 'Fiji'
  | 'Finland'
  | 'France'
  | 'Gabon'
  | 'Gambia'
  | 'Georgia'
  | 'Germany'
  | 'Ghana'
  | 'Greece'
  | 'Grenada'
  | 'Guatemala'
  | 'Guinea-Bissau'
  | 'Guinea'
  | 'Guyana'
  | 'Haiti'
  | 'Holy See'
  | 'Honduras'
  | 'Hungary'
  | 'Iceland'
  | 'India'
  | 'Indonesia'
  | 'Iran'
  | 'Iraq'
  | 'Ireland'
  | 'Israel'
  | 'Italy'
  | 'Jamaica'
  | 'Japan'
  | 'Jordan'
  | 'Kazakhstan'
  | 'Kenya'
  | 'Korea, South'
  | 'Kosovo'
  | 'Kuwait'
  | 'Kyrgyzstan'
  | 'Laos'
  | 'Latvia'
  | 'Lebanon'
  | 'Liberia'
  | 'Libya'
  | 'Liechtenstein'
  | 'Lithuania'
  | 'Luxembourg'
  | 'Madagascar'
  | 'Malawi'
  | 'Malaysia'
  | 'Maldives'
  | 'Mali'
  | 'Malta'
  | 'Mauritania'
  | 'Mauritius'
  | 'Mexico'
  | 'Moldova'
  | 'Monaco'
  | 'Mongolia'
  | 'Montenegro'
  | 'Morocco'
  | 'Mozambique'
  | 'MS Zaandam'
  | 'Namibia'
  | 'Nepal'
  | 'Netherlands'
  | 'New Zealand'
  | 'Nicaragua'
  | 'Niger'
  | 'Nigeria'
  | 'North Macedonia'
  | 'Norway'
  | 'Oman'
  | 'Pakistan'
  | 'Panama'
  | 'Papua New Guinea'
  | 'Paraguay'
  | 'Peru'
  | 'Philippines'
  | 'Poland'
  | 'Portugal'
  | 'Qatar'
  | 'Romania'
  | 'Russia'
  | 'Rwanda'
  | 'Saint Kitts and Nevis'
  | 'Saint Lucia'
  | 'Saint Vincent and the Grenadines'
  | 'San Marino'
  | 'Saudi Arabia'
  | 'Senegal'
  | 'Serbia'
  | 'Seychelles'
  | 'Sierra Leone'
  | 'Singapore'
  | 'Slovakia'
  | 'Slovenia'
  | 'Somalia'
  | 'South Africa'
  | 'Spain'
  | 'Sri Lanka'
  | 'Sudan'
  | 'Suriname'
  | 'Sweden'
  | 'Switzerland'
  | 'Syria'
  | 'Taiwan*'
  | 'Tanzania'
  | 'Thailand'
  | 'Timor-Leste'
  | 'Togo'
  | 'Trinidad and Tobago'
  | 'Tunisia'
  | 'Turkey'
  | 'Uganda'
  | 'Ukraine'
  | 'United Arab Emirates'
  | 'United Kingdom'
  | 'Uruguay'
  | 'US'
  | 'Uzbekistan'
  | 'Venezuela'
  | 'Vietnam'
  | 'West Bank and Gaza'
  | 'Zambia'
  | 'Zimbabwe'
  | "Cote d'Ivoire";

export const Countries: Country[] = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burma',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo (Brazzaville)',
  'Congo (Kinshasa)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Diamond Princess',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea-Bissau',
  'Guinea',
  'Guyana',
  'Haiti',
  'Holy See',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Korea, South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'MS Zaandam',
  'Namibia',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'San Marino',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Somalia',
  'South Africa',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan*',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'Uruguay',
  'US',
  'Uzbekistan',
  'Venezuela',
  'Vietnam',
  'West Bank and Gaza',
  'Zambia',
  'Zimbabwe',
  "Cote d'Ivoire",
];

export const CountriesAfrica: Country[] = [
  'Algeria',
  'Angola',
  'Benin',
  'Botswana',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cameroon',
  'Central African Republic',
  'Chad',
  'Congo (Brazzaville)',
  'Congo (Kinshasa)',
  "Cote d'Ivoire",
  'Djibouti',
  'Egypt',
  'Equatorial Guinea',
  'Eritrea',
  'Eswatini',
  'Ethiopia',
  'Gabon',
  'Gambia',
  'Ghana',
  'Guinea-Bissau',
  'Guinea',
  'Kenya',
  'Liberia',
  'Libya',
  'Madagascar',
  'Malawi',
  'Mali',
  'Mauritania',
  'Mauritius',
  'Morocco',
  'Mozambique',
  'Namibia',
  'Niger',
  'Nigeria',
  'Rwanda',
  'Senegal',
  'Seychelles',
  'Sierra Leone',
  'Somalia',
  'South Africa',
  'Sudan',
  'Tanzania',
  'Togo',
  'Tunisia',
  'Uganda',
  'West Bank and Gaza',
  'Zambia',
  'Zimbabwe',
];

export const CountriesAsia: Country[] = [
  'Afghanistan',
  'Armenia',
  'Azerbaijan',
  'Bahrain',
  'Bangladesh',
  'Bhutan',
  'Brunei',
  'Burma',
  'Cambodia',
  'China',
  'Cyprus',
  'Georgia',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Israel',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Korea, South',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Lebanon',
  'Malaysia',
  'Maldives',
  'Mongolia',
  'Nepal',
  'Oman',
  'Pakistan',
  'Philippines',
  'Qatar',
  'Russia',
  'Saudi Arabia',
  'Singapore',
  'Sri Lanka',
  'Syria',
  'Taiwan*',
  'Thailand',
  'Timor-Leste',
  'Turkey',
  'United Arab Emirates',
  'Uzbekistan',
  'Vietnam',
];

export const CountriesEurope: Country[] = [
  'Albania',
  'Andorra',
  'Austria',
  'Belarus',
  'Belgium',
  'Bosnia and Herzegovina',
  'Bulgaria',
  'Croatia',
  'Czechia',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Holy See',
  'Hungary',
  'Iceland',
  'Ireland',
  'Italy',
  'Kosovo',
  'Latvia',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Moldova',
  'Monaco',
  'Montenegro',
  'Netherlands',
  'North Macedonia',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Russia',
  'San Marino',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
  'Turkey',
  'Ukraine',
  'United Kingdom',
];

export const CountriesNorthAmerica: Country[] = [
  'Antigua and Barbuda',
  'Bahamas',
  'Barbados',
  'Belize',
  'Canada',
  'Costa Rica',
  'Cuba',
  'Dominica',
  'Dominican Republic',
  'El Salvador',
  'Grenada',
  'Guatemala',
  'Haiti',
  'Honduras',
  'Jamaica',
  'Mexico',
  'Nicaragua',
  'Panama',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Trinidad and Tobago',
  'US',
];

export const CountriesSouthAmerica: Country[] = [
  'Argentina',
  'Bolivia',
  'Brazil',
  'Chile',
  'Colombia',
  'Ecuador',
  'Guyana',
  'Paraguay',
  'Peru',
  'Suriname',
  'Uruguay',
  'Venezuela',
];

// prettier-ignore
export const CountriesAustralia: Country[] = [
  'Australia',
  'Fiji',
  'New Zealand',
  'Papua New Guinea',
];

// prettier-ignore
export const CountriesShips: Country[] = [
  'Diamond Princess',
  'MS Zaandam',
];
