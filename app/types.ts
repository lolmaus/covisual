export interface Dict<T> {
  [index: string]: T;
}

export interface Item {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

export type Stat =
  | 'confirmedNewDaily'
  | 'confirmedNewWeekly'
  | 'confirmedRatioDaily'
  | 'confirmedRatioWeekly'
  | 'deathsNewDaily'
  | 'deathsRatioDaily'
  | 'deathsNewWeekly'
  | 'deathsRatioWeekly';

export const Stats: Stat[] = [
  'confirmedNewWeekly',
  'confirmedRatioWeekly',
  'deathsNewWeekly',
  'deathsRatioWeekly',
];

export interface ItemApp extends Item {
  countryName: Country;
  confirmedNewDaily: number;
  confirmedNewWeekly: number;
  confirmedRatioDaily: number;
  confirmedRatioWeekly: number;
  deathsNewDaily: number;
  deathsNewWeekly: number;
  deathsRatioDaily: number;
  deathsRatioWeekly: number;
}

export type ItemsDict = Dict<Item[]>;

export interface ChartData {
  labels: Date[];
  datasets: ChartDataSet[];
}

export interface ChartDataSet {
  label: string;
  data: number[];
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
  | 'Benin'
  | 'Bhutan'
  | 'Bolivia'
  | 'Bosnia and Herzegovina'
  | 'Brazil'
  | 'Brunei'
  | 'Bulgaria'
  | 'Burkina Faso'
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
  | "Cote d'Ivoire"
  | 'Croatia'
  | 'Diamond Princess'
  | 'Cuba'
  | 'Cyprus'
  | 'Czechia'
  | 'Denmark'
  | 'Djibouti'
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
  | 'Guatemala'
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
  | 'Kuwait'
  | 'Kyrgyzstan'
  | 'Latvia'
  | 'Lebanon'
  | 'Liberia'
  | 'Liechtenstein'
  | 'Lithuania'
  | 'Luxembourg'
  | 'Madagascar'
  | 'Malaysia'
  | 'Maldives'
  | 'Malta'
  | 'Mauritania'
  | 'Mauritius'
  | 'Mexico'
  | 'Moldova'
  | 'Monaco'
  | 'Mongolia'
  | 'Montenegro'
  | 'Morocco'
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
  | 'Saint Lucia'
  | 'Saint Vincent and the Grenadines'
  | 'San Marino'
  | 'Saudi Arabia'
  | 'Senegal'
  | 'Serbia'
  | 'Seychelles'
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
  | 'Taiwan*'
  | 'Tanzania'
  | 'Thailand'
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
  | 'Zambia'
  | 'Zimbabwe'
  | 'Dominica'
  | 'Grenada'
  | 'Mozambique'
  | 'Syria'
  | 'Timor-Leste'
  | 'Belize'
  | 'Laos'
  | 'Libya'
  | 'West Bank and Gaza'
  | 'Guinea-Bissau'
  | 'Mali'
  | 'Saint Kitts and Nevis'
  | 'Kosovo'
  | 'Burma'
  | 'MS Zaandam'
  | 'Botswana'
  | 'Burundi'
  | 'Sierra Leone'
  | 'Malawi';
