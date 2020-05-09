---
title: "Summarizing Data using CUBE and ROLLUP"
description: "Looking for the ways of displaying totals or a grand total in your query result? Click to learn how to do that using CUBE and ROLLUP."
date: 2020-04-28T05:43:35+07:00
image: "https://res.cloudinary.com/phi21st/image/upload/v1588051806/fitrianingrum.me/2020_cube-rollup.png"
tags: ["sql server","sql","t-sql"]
categories: ["data analysis"]
keywords: ["cube","rollup","sql server cube","sql server rollup","how to use cube rollup", "cube vs rollup"]
---

When aggregating and summarizing data, you can use `CUBE` and `ROLLUP` to display total summaries.
While CUBE adds summarizing total values to a result set based on columns in the `GROUP BY` clause, 
`ROLLUP` adds hierarchical data summaries based on the ordering of columns.
In this article, I'll demonstrate the ways of summarizing data using these operators.

I'll start by describing how to summarize data with `CUBE`. 

{{< note >}}
All the SQL code in the examples can be executed in SQL Server's AdventureWorks2017 sample database.
{{< /note >}}

## Summarizing the total using CUBE

The `CUBE` operator adds rows to your result set, summarizing total values based on the columns in the `GROUP BY` clause.
It is often used for reporting purposes, providing a simple way to return totals by grouped columns.

Now, let's see the following query that returns the total sales for each territory group in Europe and Pacific:

{{< highlight sql "linenos=table,hl_lines=5">}}
SELECT	st.[Group] TerritoryGroup, SUM(soh.TotalDue) Sales
FROM	Sales.SalesOrderHeader soh
		INNER JOIN Sales.SalesTerritory st ON soh.TerritoryID = st.TerritoryID
WHERE	st.[Group] IN ('Europe','Pacific')
GROUP BY CUBE(st.[Group])
{{</ highlight>}}

The result would be as follows:

{{< table "table table-sm w-auto" >}}
| TerritoryGroup| Sales		    |
|---------------|--------------:|
| Europe		| 22173617.6297 |
| Pacific		| 11814376.0952	|
| NULL			| 33987993.7249 |
{{</ table >}}

See that an extra row was added to the bottom of the result set that shows the total sales for all territory groups.

In the next query, I'll add the `CountryRegionCode` in the `SELECT` list and also in the `GROUP BY` clause.

{{< highlight sql "linenos=table,hl_lines=5">}}
SELECT	st.[Group] TerritoryGroup, st.CountryRegionCode Country, SUM(soh.TotalDue) Sales
FROM	Sales.SalesOrderHeader soh
		INNER JOIN Sales.SalesTerritory st ON soh.TerritoryID = st.TerritoryID
WHERE	st.[Group] IN ('Europe','Pacific')
GROUP BY CUBE(st.[Group], st.CountryRegionCode)
{{</ highlight>}}

The result is as follows:

{{< table "table table-sm w-auto" >}}
| TerritoryGroup| Country	|		Sales	|
|---------------|-----------|--------------:|
| Pacific		| AU		| 11814376.0952	|
| NULL			| AU		| 11814376.0952	|
| Europe		| DE		| 5479819.5755	|
| NULL			| DE		| 5479819.5755	|
| Europe		| FR		| 8119749.346	|
| NULL			| FR		| 8119749.346	|
| Europe		| GB		| 8574048.7082	|
| NULL			| GB		| 8574048.7082	|
| NULL			| NULL		| 33987993.7249	|
| Europe		| NULL		| 22173617.6297	|
| Pacific		| NULL		| 11814376.0952	|
{{</ table >}}

See that the result displays all possible combinations of column grouping.
Totals were generated not only for the territory group but also for the country.

In the last three rows, you also see the total sales across all territory groups and countries (a row with NULLs values for both **TerritoryGroup** and **Country**),
 and then by territory group.

## Summarizing the total using ROLLUP 

The `ROLLUP` is used to add hierarchical data summaries based on the ordering of columns in the `GROUP BY` clause.
Thus, the order of the columns you place in the `GROUP BY ROLLUP` clause impacts how data is aggregated. 

Let's see the query below that retrieves the territory group, country, and total sales for Europe and Pacific territory groups.

{{< highlight sql "linenos=table,hl_lines=5">}}
SELECT	st.[Group] TerritoryGroup, st.CountryRegionCode Country, SUM(soh.TotalDue) TotalSales
FROM	Sales.SalesOrderHeader soh
		INNER JOIN Sales.SalesTerritory st ON soh.TerritoryID = st.TerritoryID
WHERE	st.[Group] IN ('Europe','Pacific')
GROUP BY ROLLUP(st.[Group], st.CountryRegionCode)
{{</ highlight>}}

The result is:
{{< table "table table-sm w-auto" >}}
| TerritoryGroup| Country	|		Sales	|
|---------------|-----------|--------------:|
| Europe		| DE		| 5479819.5755	|
| Europe		| FR		| 8119749.346	|
| Europe		| GB		| 8574048.7082	|
| Europe		| NULL		| 22173617.6297	|
| Pacific		| AU		| 11814376.0952	|
| Pacific		| NULL		| 11814376.0952	|
| NULL			| NULL		| 33987993.7249	|
{{</ table >}}

Notice that the row with Europe or Pacific territory group and the NULL country holds the total sales for the territory group.
And the last row was the grand total of all sales.

In the following clause:

{{< highlight sql "linenos=inline,linenostart=5">}}
GROUP BY ROLLUP(st.[Group], st.CountryRegionCode)
{{</ highlight>}}

`ROLLUP` aggregates a grand total and totals by territory group. 
Totals were not generated for the country but would have been had the `CUBE` was used instead. 