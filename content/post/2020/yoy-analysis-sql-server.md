---
title: "Year-over-Year (YoY) Analysis in SQL Server"
description: "Learn how to do a Year-over-Year (YoY) analysis to identify the actual performance indicators without being burdened by seasonality between months or quarters."
date: 2020-05-25T10:36:07+07:00
tags: ["sql", "tsql", "sql server"]
image: "https://res.cloudinary.com/phi21st/image/upload/v1588132801/fitrianingrum.me/analytics.png"
imageAuthor: "Timur Saglambilek"
imageAuthorUrl: "https://www.pexels.com/@marketingtuig"
imageSource: "Pexels"
imageSourceUrl: "https://www.pexels.com/photo/185576"
categories: ["data analysis"]
keywords: ["yoy analysis sql", "year over year sql", "year over year analysis sql", "yoy analysis sql server"]
---

A year-over-year (YoY) analysis compares data for the current year relative to last year. 
Different from monthly and quarterly analysis, the YoY analysis is not burdened by seasonality. 
Thus, it offers a true robust comparison for understanding the performance throughout the year. 

This article shows an example of a YoY analysis using T-SQL. 
For the demonstration, we will use the SQL Server AdventureWorks2017 sample database.

## Example

Suppose we want to compare monthly sales in 2013 relative to 2012.
To do that, first, we will create a Common Table Expression (CTE) to define the monthly sales in 2013. 
Then, we will join the results with the previous year's sales and calculate the percent growth.

### Step 1. Finding monthly sales in 2013 using CTE

The following MonthlySalesCTE defines monthly sales for 2013.
Pay attention to lines 2-7.

{{< highlight sql "linenos=table,hl_lines=2-7">}}
WITH MonthlySalesCTE(CteYear, CteMonth, CteSales) AS (
	SELECT	YEAR(soh.OrderDate), 
			MONTH(soh.OrderDate),
			SUM(soh.TotalDue)
	FROM	Sales.SalesOrderHeader soh
	WHERE	YEAR(soh.OrderDate) = 2013
	GROUP BY YEAR(soh.OrderDate), MONTH(soh.OrderDate)
)
SELECT	cte.CteYear CalendarYear, 
		cte.CteMonth CalendarMonth,
		cte.CteSales CurrentSales
FROM	MonthlySalesCTE cte
ORDER BY cte.CteYear DESC, cte.CteMonth DESC
{{< /highlight >}}

Result:

{{< table "table table-sm w-auto" >}}

| CalendarYear	| CalendarMonth	| CurrentSales  | 
|--------------:|--------------:|--------------:|
| 2013			| 12			| 4560577.0958	| 
| 2013			| 11			| 3694667.9998	| 
| 2013			| 10			| 5374375.9418	| 
| 2013			| 9				| 5083505.3374	| 
| 2013			| 8				| 3733973.0032	| 
| 2013			| 7				| 5521840.8445	| 
| 2013			| 6				| 5726265.2635	| 
| 2013			| 5				| 3658084.9461	| 
| 2013			| 4				| 2840711.1734	| 
| 2013			| 3				| 3831605.9389	| 
| 2013			| 2				| 2600218.8667	| 
| 2013			| 1				| 2340061.5521	| 

Also, notice that you can actually change the year `2013` with any year you'd like, for example, the current year 🙂.

{{< /table >}}

### Step 2. Joining with the previous year's sales and calculate the percent growth

Pay attention to lines 12-18, where we add a JOIN to the previous year's sales and display the `PreviousSales` and `PctGrowth` columns.

{{< highlight sql "linenos=table,hl_lines=12-18">}}
WITH MonthlySalesCTE(CteYear, CteMonth, CteSales) AS (
	SELECT	YEAR(soh.OrderDate), 
			MONTH(soh.OrderDate),
			SUM(soh.TotalDue)
	FROM	Sales.SalesOrderHeader soh
	WHERE	YEAR(soh.OrderDate) = 2013
	GROUP BY YEAR(soh.OrderDate), MONTH(soh.OrderDate)
)
SELECT	cte.CteYear CalendarYear, 
		cte.CteMonth CalendarMonth,
		cte.CteSales CurrentSales,
		CAST(SUM(soh.TotalDue) AS DECIMAL(12,4)) PreviousSales,
		CAST(((cte.CteSales - SUM(soh.TotalDue)) / CteSales) AS decimal(3,2)) AS PctGrowth
FROM	Sales.SalesOrderHeader soh	
		INNER JOIN MonthlySalesCTE cte 
			ON YEAR(soh.OrderDate) = cte.CteYear - 1 AND MONTH(soh.OrderDate) = cte.CteMonth 
GROUP BY cte.CteYear, cte.CteMonth, cte.CteSales
ORDER BY cte.CteMonth DESC
{{< /highlight >}}

Result:

{{< table "table table-sm w-auto" >}}

| CalendarYear	| CalendarMonth	| CurrentSales	| PreviousSales	| PctGrowth |
|--------------:|--------------:|--------------:|--------------:|----------:|
| 2013			| 12			| 4560577.0958	| 3176848.1687  | 0.30		|
| 2013			| 11			| 3694667.9998	| 2097153.1292  | 0.43		|
| 2013			| 10			| 5374375.9418	| 2858060.1970  | 0.47		|
| 2013			| 9				| 5083505.3374	| 3881724.1860  | 0.24		|
| 2013			| 8				| 3733973.0032	| 2442451.1831  | 0.35		|
| 2013			| 7				| 5521840.8445	| 3840231.4590  | 0.30		|
| 2013			| 6				| 5726265.2635	| 4610647.2153  | 0.19		|
| 2013			| 5				| 3658084.9461	| 3452924.4537  | 0.06		|
| 2013			| 4				| 2840711.1734	| 1871923.5039  | 0.34		|
| 2013			| 3				| 3831605.9389	| 3336347.4716  | 0.13		|
| 2013			| 2				| 2600218.8667	| 1649051.9001  | 0.37		|
| 2013			| 1				| 2340061.5521	| 4458337.4444  | -0.91		|

We can see that the sales performance in January 2013 was bad compared to the previous year's, while the rest were considerably good.