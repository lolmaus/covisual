# covisual

https://lolmaus.gihub.io/covisual



## What is this?

This chart's goal is to show the severity of coronavirus epidemic in a country. The higher the line goes, the less control the country has over the spread of the virus.

It is based on a simple metric explained [in this video](https://www.youtube.com/watch?v=54XLXg4fYsc) and implemented [in this chart](https://aatishb.com/covidtrends/):

**Number of new cases (or deaths) in the past week VS total number of cases (or deaths)**.

This metric has a number of wonderful features:

* It is a universal indicator of the current level of control per country.
* It lets you compare countries regardless of how many tests each country is doing per day. The only requirement is that they keep doing them consistently. (Lack of consistency can be seen as a sudden spike followed by sudden drop, as it appears in the beginning of the history of most countries.)
* It lets you compare countries regardless of their population size.
* You don't need to wrap your head around the logarithmic scale.

It may seem counter-intuitive that the spec does not depend on the amount of tests each country is doing per day. Seemingly, increasing the testing capacity should skew the results.

Think about of the amount of tests a country is doing as a size of a sample selection in a scientific survey. The higher is certainly the better, but even a sample size of a few hundreds of people is considered good enough in many cases.

If you're still not convinced, please watch [this video](https://www.youtube.com/watch?v=54XLXg4fYsc). It demonstrates surprising consistency of results among all countries, despite drastically different population sizes and testing capacities.



## Credit

Implemented by [Andrey Mikhaylov (lolmaus)](https://github.com/lolmaus/).

Inspired by https://www.youtube.com/watch?v=54XLXg4fYsc and https://aatishb.com/covidtrends/ .

Uses data from https://github.com/pomber/covid19

