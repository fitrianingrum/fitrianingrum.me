---
title: "How to Find Ranks in SQL Server"
description: "The four significant SQL Server ranking functions are here! Learn what they are and the differences between them (including examples)."
date: 2020-04-24T11:35:56+07:00
image: "https://res.cloudinary.com/phi21st/image/upload/v1587964999/fitrianingrum.me/2020_ranking.png"
imageAuthor: "Mateusz Dach"
imageAuthorUrl: "https://www.pexels.com/@mateusz-dach-99805"
imageSource: "Pexels"
imageSourceUrl: "https://www.pexels.com/photo/332835"
tags: ["sql server","sql","t-sql"]
categories: ["data analysis"]
keywords: ["sql rank","sql server rank","ranking functions in sql server", "tsql ranking","row_number vs rank", "rank and dense_rank in sql"]
---

Often, we want to know the ranking or position of a particular row compared to other rows based on a certain ordering sequence.
In SQL Server, there are four [ranking functions](https://docs.microsoft.com/en-us/sql/t-sql/functions/ranking-functions-transact-sql?view=sql-server-ver15) 
for assigning ranks. Those are `ROW_NUMBER`, `RANK`, `DENSE_RANK`, and `NTILE`. 
This article covers how to use TSQL ranking functions and their differences.

Ranking functions are commonly used to identify the top X of something. 
In the following table, we'll see a summary of SQL Server ranking functions.

{{< table "table table-sm table-bordered" >}}
| Function name    | Description                                                 |
|------------------|-------------------------------------------------------------|
| ROW_NUMBER       | It returns an incrementing number (1,2,3...) for every row in a result set. There will be no duplicate ranking values in the result. |
| RANK             | Same as `ROW_NUMBER`, the `RANK` function assigns increment numbers in the results. However, it assigns the same numbers for the same tied values. Thus, the numbers assigned are not unique.  |
| DENSE_RANK       | This function is almost the same as `RANK`. However, `DENSE_RANK` doesn't yield gaps in the rankings. For instance, when `RANK` gives a ranking of 1,4,4,4,5, `DENSE_RANK` assigns 1,2,2,2,3. In the dense ranking results, there are no jump numbers. |
| NTILE            | It divides the result set into a defined number of buckets or groups. |
{{</ table >}}

## Syntax

Ranking functions are windowed functions. The syntax is the same for `ROW_NUMBER`, `RANK`, and `DENSE_RANK`. 
However, for `NTILE`, it has a slightly different syntax, which includes the `number_of_groups`, as shown in the table below.

{{< table "table table-sm table-bordered" >}}
| Function name | Syntax |
| -----------|-------------|
| ROW_NUMBER, RANK, or DENSE_RANK | function_name() OVER ([partition_by_clause] order_by_clause) |
| NTILE | function_name(**number_of_groups**) OVER ([partition_by_clause] order_by_clause) |
{{</ table >}}

The syntax uses the following arguments:

* __*function_name*__. It can be `ROW_NUMBER`, `RANK`, `DENSE_RANK`, or `NTILE`.
* __*partition_by_clause*__. It separates the results into partitions. This argument is optional (not mandatory). 
* __*order_by_clause*__. It determines the sorting in which the ranking numbers are assigned to the result set.
* __*number_of_groups*__. Only applicable for NTILE. It's an integer value that determines the number of buckets/groups (number of different rankings) to produce. For example, NTILE(5) would produce 5 groups.

## Examples

For the examples, we will create a table named **Book**, as shown in **Figure 1** below. 
Then, we'll rank the books using each of the ranking function and compare the results.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1587873520/fitrianingrum.me/2020-book-table.jpg" 
	title="Figure 1. The Book table" 
	alt="The Book Table"
	class="text-center"
	width="340">}}

Copy-paste and execute the following SQL code to create the table.

{{< highlight sql>}}
CREATE TABLE Book (
	BookTitle NVARCHAR(20),
	YearPublished INT,
	Price DECIMAL(6,2)
)
GO

INSERT INTO Book VALUES ('Book A', 2019, 5.28)
INSERT INTO Book VALUES ('Book B', 2020, 9.60)
INSERT INTO Book VALUES ('Book C', 2019, 5.76)
INSERT INTO Book VALUES ('Book D', 2020, 5.76)
INSERT INTO Book VALUES ('Book E', 2020, 6.00)
INSERT INTO Book VALUES ('Book F', 2019, 6.00)
INSERT INTO Book VALUES ('Book G', 2019, 5.28)
INSERT INTO Book VALUES ('Book H', 2020, 9.60)
INSERT INTO Book VALUES ('Book I', 2019, 4.32)
INSERT INTO Book VALUES ('Book J', 2020, 6.00)

SELECT * FROM Book
{{< /highlight >}}

### Example 1. Without using partition

In this example, we'll implement all the four functions to rank books based on their prices. 
Notice that we don't define any partition in the code below.

{{< highlight sql>}}
SELECT BookTitle
	, YearPublished
	, Price
	, ROW_NUMBER() OVER (ORDER BY Price DESC) RowNumber
	, RANK() OVER (ORDER BY Price DESC) Rank
	, DENSE_RANK() OVER (ORDER BY Price DESC) DenseRank
	, NTILE(2) OVER (ORDER BY Price DESC) Ntile
FROM Book
{{< /highlight >}}

The result would be as follow:

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1587874981/fitrianingrum.me/2020-ranks-without-partition.jpg" 
	title="Figure 2. SQL Server ranking functions - without partition" 
	alt="SQL Server ranking functions - without partition"
	width="600"
	class="text-center" >}}

The above result shows that the **Price** column is sorted in descending order.  

Next to it, the **RowNumber** column shows an incrementing number for each row based on the price, and the highest price has a rank value of 1.
Also, notice that the values in this column are unique (there are no duplicate values).

For the **Rank** column, see that there are duplicates in the ranking numbers because the `RANK` function assigns the same ranking numbers for prices that have the same values.
Also, there is a jump in the numbers on a change of value. For example, we see that the rank numbers are 1, 1, then it jumps to 3 in the column.

The **DenseRank** column also has the same ranking numbers for the same price values. 
See that the rank numbers are 1, 1, and then 2 in this column.
Different from the `RANK` function, `DENSE_RANK` doesn't return gaps. For dense rank, the next value after _n_ is always _n + 1_.

For the **Ntile** column, the results were divided into two groups. 
Each group has five rows as the total number of rows (10) is divisible by the total number of groups (2). 

## Example 2. Using partition

In this example, we will divide the results by the `YearPublished` by adding an optional `PARTITION BY YearPublished` in the `OVER` clause.

{{< highlight sql>}}
SELECT BookTitle
	, YearPublished
	, Price
	, ROW_NUMBER() OVER (PARTITION BY YearPublished ORDER BY Price DESC) RowNumber
	, RANK() OVER (PARTITION BY YearPublished ORDER BY Price DESC) Rank
	, DENSE_RANK() OVER (PARTITION BY YearPublished ORDER BY Price DESC) DenseRank
	, NTILE(2) OVER (PARTITION BY YearPublished ORDER BY Price DESC) Ntile
FROM Book
{{< /highlight>}}

The result would be as follows:

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1587874981/fitrianingrum.me/2020-ranks-with-partition.jpg" 
	title="Figure 3. SQL Server ranking functions - using partition" 
	alt="SQL Server ranking functions - using partition"
	width="600"
	class="text-center" >}}

From **Figure 3** above, the `YearPublished` partitioned the books into two buckets: 2019 and 2020.
And the price sorts the records in every partition in descending order.

Also, notice that the numbers in the **RowNumber**, **Rank**, **DenseRank**, and **Ntile** columns are actually similar to the numbers in **Example 1**. 
The distinction is that they're now implemented to particular partitions.

For the **Ntile** column, notice that the rank 1 (the first group) has three rows, while the second group only has two rows. 
That's because the total rows in each partition cannot be divided by the number of groups (5 isn't divisible by 2).