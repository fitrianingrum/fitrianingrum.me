---
title: "SQL BETWEEN for Date Range Searches — Are you sure you use it correctly?"
description: "Learn how to use SQL BETWEEN operator correctly to filter dates, as you might be wrong all this time."
hideDescription: "true"
date: 2021-03-12T14:18:05+07:00
image: ""
imageAuthor: ""
imageAuthorUrl: ""
imageSource: ""
imageSourceUrl: ""
tags: ["sql","sql server","tsql"]
categories: ["data analysis"]
keywords: ["sql between","between sql","between in sql","sql between two dates","date between","sql between inclusive","sql between dates","sql date between","sql date range"]
---

Finding data between two dates seems very basic.

Still, the fact is, working with a range of dates is one of the most common errors in the database implementation world. 

As the BETWEEN operator designates an inclusive range of values, you'll need to be extra careful when filtering dates with time portions. Or, you might cut out data for the whole day!

How is that possible? Let's see an example below.

## Example problem of using SQL BETWEEN to filter data using two dates

Suppose you have the following **SalesOrder** table. The sales order dates are stored in the DATETIME format, which contains time portions. 
(_Note: you can also find the SQL script to create the table [here](https://gist.github.com/fitrianingrum/09eeb81e97d9e711205fe736a781f492)._)

{{< table "table table-sm table-center table-code w-auto" >}}
| SalesOrderID     | SalesOrderDate          |
|------------------|------------------------:|
| 45502            | 2020-11-30 11:50:10.000 |
| 45503            | 2020-12-01 00:00:00.000 |
| 45504            | 2020-12-01 00:20:10.000 |
| 45505            | 2020-12-17 09:31:04.000 |
| 45506            | 2020-12-31 00:00:00.000 |
| 45507            | 2020-12-31 00:20:18.000 |
| 45508            | 2020-12-31 12:00:00.000 |
| 45509            | 2020-01-01 00:06:10.000 |
{{</ table >}}

You want to find all sales orders for December 2020. To do that, you write the following query:

```sql
SELECT	SalesOrderID, SalesOrderDate
FROM	SalesOrder
WHERE	SalesOrderDate BETWEEN '2020-12-01' AND '2020-12-31';
```
The WHERE condition is actually equivalent to the following clause:

```sql
WHERE	SalesOrderDate BETWEEN '2020-12-01 00:00:00.000' AND '2020-12-31 00:00:00.000'
```
Now, let's execute the query, and you will see the result as follows:

{{< table "table table-sm table-center table-code w-auto" >}}
| SalesOrderID     | SalesOrderDate          |
|------------------|------------------------:|
| 45503            | 2020-12-01 00:00:00.000 |
| 45504            | 2020-12-01 00:20:10.000 |
| 45505            | 2020-12-17 09:31:04.000 |
| 45506            | 2020-12-31 00:00:00.000 |
{{</ table >}}

What's the problem here?

Notice that **2019-12-31 00:20:18.000** and **2019-12-31 12:00:00.000** are left out of the result. 
You have actually missed all the sales that happened on December 31, 2020, after midnight. 
And of course, this problem gets worse when you move toward smaller ranges of time.

But don't worry---there are various solutions to this problem. 👇 

## Solutions: How to fix SQL BETWEEN for filtering date range

The **first solution** is to fix the BETWEEN clause to use the following condition:

```sql
WHERE	SalesOrderDate BETWEEN '2020-12-01' AND '2020-12-31 23:59:59.999'
```

Well, I know it's not nice to type **23:59:59.999** at the end of the date value. 
It can also get complicated as different databases can have many date data types with different precision. 
For example, there are SMALLDATETIME, DATETIME, DATETIME2, and DATETIMEOFFSET in SQL Server. 

The **second solution** is to change the condition to use **>=** and **<** operators instead of BETWEEN.

```sql
WHERE	SalesOrderDate >= '2020-12-01' AND SalesOrderDate < '2021-01-01'
```

Notice that in the above clause, we used **< 2021-01-01** instead of **< 2020-12-31**.

The **third solution** is to filter the dates using their month and year portions. 
Most databases have the MONTH and YEAR functions to do this. 
However, if your database doesn't, there usually a solution that is equivalent to the following code:

```sql
WHERE	YEAR(SalesOrderDate) = 2020 AND MONTH(SalesOrderDate) = 12
```

If you apply one of the solutions above, you'll see the correct result as follows:

{{< table "table table-sm table-center table-code w-auto" >}}
| SalesOrderID     | SalesOrderDate          |
|------------------|------------------------:|
| 45503            | 2020-12-01 00:00:00.000 |
| 45504            | 2020-12-01 00:20:10.000 |
| 45505            | 2020-12-17 09:31:04.000 |
| 45506            | 2020-12-31 00:00:00.000 |
| 45507            | 2020-12-31 00:20:18.000 |
| 45508            | 2020-12-31 12:00:00.000 |
{{</ table >}}

## Conclusion

You can use the BETWEEN operator in SQL to filter using a range of dates that have time portions. 
However, in this case, it's better to avoid using it. 
Use the SQL BETWEEN for discrete values only, such as DATE values without any time portions and INTEGER.