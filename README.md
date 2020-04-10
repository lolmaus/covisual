# covisual

https://lolmaus.github.io/covisual/



## What is this?

This chart's goal is to show the severity of coronavirus epidemic in a country. **The higher the line goes, the less control the country has over the spread of the virus.**

It is based on a simple metric explained [in this video](https://www.youtube.com/watch?v=54XLXg4fYsc) and implemented [in this chart](https://aatishb.com/covidtrends/):

**Number of new cases (or deaths) in the past week / total number of cases (or deaths)**.

This metric has a number of wonderful features:

* It is a universal indicator of the current level of control per country.
* It lets you compare countries regardless of how many tests each country is doing per day. The only requirement is that they keep doing them consistently.
* It lets you compare countries regardless of their population size.

This metric does NOT account for:
* the percentage of population affeced,
* the capacity of hospitals and remaining resources,
* the overal despair situation in a country.

It only lets you see whether the spread of the epidemic is gaining or losing speed, and lets you compare all countries by this metric, regardless of their population and testing capacity.

It may seem counter-intuitive that the metric does not depend on the amount of tests each country is doing per day. Seemingly, increasing the testing capacity should skew the results.

This is how regular charts work. If a chart is plotting total cases vs time, the rate of growth is highly dependant on the amount of tests performed by a country. More tests — more cases. Thus, it does not reflect the actual count of cases, and it's hard to judge the speed of the epidemic by looking at a conventional chart.

***

Here's an analogy.

Imagine that you want to know the ratio of males to females in a population. You start counting females, beginning with zero on day one, and your chart shows consistent growth: every day you find more and more females! Does this mean that the number of females actually increases in the population? Absolutely not.

Instead, you should be plotting `(number of females counted) / (number of people counted)`. This way, your chart will be wobbly at the first few days because the coverage is very low, but it will quickly even out and display a consistent ratio, not affected by time or counting speed.

Note that you don't need to count 100% of population in order to get the idea of the male/female ratio, given your coverage is random enough (e. g. you're not counting in female monasteries).

This is exactly what this particular chart is doing: instead of reflecting the speed of counting, it reflects the actual ratio over time.

If you're still not convinced, please watch [this video](https://www.youtube.com/watch?v=54XLXg4fYsc). It demonstrates surprising consistency of results among all countries, despite drastically different population sizes and testing capacities.



## Credit

Implemented by [Andrey Mikhaylov (lolmaus)](https://github.com/lolmaus/).

Inspired by https://www.youtube.com/watch?v=54XLXg4fYsc and https://aatishb.com/covidtrends/ .

Uses data from https://github.com/pomber/covid19

