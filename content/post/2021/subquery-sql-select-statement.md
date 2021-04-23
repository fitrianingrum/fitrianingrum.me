---
title: "4 Places You Can Use Subqueries in a SELECT Statement"
description: "When using subqueries in a SELECT statement, you can apply them in these four clauses: SELECT, FROM, WHERE, and HAVING."
date: 2021-04-23T10:29:50+07:00
image: ""
imageAuthor: ""
imageAuthorUrl: ""
imageSource: ""
imageSourceUrl: ""
tags: ["sql","sql server", "subquery", "tsql"]
categories: ["technology"]
keywords: ["subqueries","sql subquery in where clause","subquery","subquery in from clause"]
---

The SQL language has one basic statement for retrieving information from the database: the SELECT statement. 
You can also have one or more SELECT statements embedded within another query, which are called *subqueries*.

Subqueries can be placed in a SELECT, INSERT, UPDATE, or DELETE statement. However, this article only covers subqueries in the SELECT statement.

Now, suppose you have two tables: `Employee` and `Department`, as shown below:

**Table 1. Employee table**

{{< table "table table-sm table-code w-auto" >}}
| EmpCode | EmpFname     | EmpLname      | EmpSalary     | DeptCode   |
|:-------:|--------------|---------------|--------------:|:----------:|
| E-01    | Michelle     | Mark          | 150000        | D-03       |
| E-02    | Donald       | Collins       | 120000        | D-04       |
| E-03    | Anthony      | Harris        | 80000         | D-02       |
| E-04    | Darin        | Wilson        | 130000        | D-02       |
| E-05    | Susan        | Douglas       | 110000        | D-04       |
| E-06    | Katherine    | Johnson       | 100000        | D-03       |
{{</ table >}}

**Table 2. Department table**

{{< table "table table-sm table-code w-auto" >}}
| DeptCode  | DeptLocation  |
|:---------:|---------------|
| D-01      | Chicago       |
| D-02      | Dallas        |
| D-03      | Seattle       |
| D-04      | Denver        |
{{</ table >}}

Here's the four different places where you can use subqueries in a SELECT statement to extract info from those two tables.

## Subquery in WHERE clause

An SQL subquery in the WHERE clause is useful when you want to make a comparison between the result of the inner query and the outer one.

👉 **The following query finds the employees whose department is located in Denver.**

Query:

```sql
SELECT EmpCode, EmpFname, EmpLname, EmpSalary, DeptCode
FROM Employee 
WHERE DeptCode = (
	SELECT DeptCode 
	FROM Department
	WHERE DeptLocation = 'Denver'
)
```

Result:

{{< table "table table-sm table-code w-auto" >}}
| EmpCode | EmpFname     | EmpLname      | EmpSalary     | DeptCode   |
|:-------:|--------------|---------------|--------------:|:----------:|
| E-02    | Donald       | Collins       | 120000        | D-04       |
| E-05    | Susan        | Douglas       | 110000        | D-04       |
{{</ table >}}

The inner query returns D-04, which is the code of the department with a location equals to Denver. 
Then, this value is used by the outer query as a comparison. 
The final result set has two rows, containing only employees with department code equals to D-04.

👉 **The following query gets the employee with the highest salary.**

Notice that the comparison uses a single table:

```sql
SELECT EmpCode, EmpFname, EmpLname, EmpSalary, DeptCode
FROM Employee
WHERE EmpSalary = (
	SELECT MAX(EmpSalary) FROM Employee
)
```

Result:

{{< table "table table-sm table-code w-auto" >}}
| EmpCode | EmpFname     | EmpLname      | EmpSalary     | DeptCode   |
|:-------:|--------------|---------------|--------------:|:----------:|
| E-01    | Michelle     | Mark          | 150000        | D-03       |
{{</ table >}}

## Subquery in SELECT clause

This type of subquery is also called *scalar subquery* because the inner query returns a single value.

👉 **The following query gets the employee names, department codes, and department locations**

Notice that the locations are retrieved using a subquery in the SELECT clause:

```sql
SELECT e.EmpFname
	, e.EmpLname
	, e.DeptCode
	, (SELECT DeptLocation FROM Department d WHERE d.DeptCode = e.DeptCode) AS DeptLocation
FROM Employee e
```
Result:

{{< table "table table-sm table-code w-auto" >}}
| EmpFname     | EmpLname      | DeptCode   | DeptLocation  |
|--------------|---------------|:----------:|---------------|
| Michelle     | Mark          | D-03       | Seattle       |
| Donald       | Collins       | D-04       | Denver        |
| Anthony      | Harris        | D-02       | Dallas        |
| Darin        | Wilson        | D-02       | Dallas        |
| Susan        | Douglas       | D-04       | Denver        |
| Katherine    | Johnson       | D-03       | Seattle       |
{{</ table >}}

For every row that is returned by the outer query, the inner query gets the `DeptLocation` value from the Department table,
which has the code equal to the `DeptCode` column from the outer query.

👉 **The following query gets the list of departments and the average employee salary by each department**

```sql
SELECT d.DeptCode
	, d.DeptLocation
	, (SELECT AVG(e.EmpSalary) FROM Employee e WHERE e.DeptCode = d.DeptCode) AS AvgSalary
FROM Department d
```
Result:

{{< table "table table-sm table-code w-auto" >}}
| DeptCode  | DeptLocation  | AvgSalary     |
|:---------:|:-------------:|--------------:|
| D-01      | Chicago       | NULL          |
| D-02      | Dallas        | 105000        |
| D-03      | Seattle       | 125000        |
| D-04      | Denver        | 115000        |
{{</ table >}}

## Subquery in FROM clause

Subqueries that are used in the FROM clauses act as a virtual table. 
The inner query returns a result set (called the *derived table*), where you can select the columns and perform aggregate functions.

This type of subquery is also called *inline view*.

👉 **Here's an example.**

Assume that employees with a salary > 100000 are managers, and you want to find the average salary of these managers by department code. 

You can do this by creating a subquery that its inner query returns the department code and the salary of the managers only. 
Then, in the outer query, calculate the average of the salary by department code.

```sql
SELECT e.DeptCode, AVG(e.EmpSalary) AvgManagerSalary
FROM (
	SELECT DeptCode, EmpSalary 
	FROM Employee 
	WHERE EmpSalary > 100000
) e
GROUP BY e.DeptCode
```

Result:

{{< table "table table-sm table-code w-auto" >}}
| DeptCode  | AvgManagerSalary     |
|:---------:|---------------------:|
| D-02      | 130000               |
| D-03      | 150000               |
| D-04      | 115000               |
{{</ table >}}

Let's pay attention to the **AvgManagerSalary** value for the Department with code D-02. 
There are actually two employees in this department. 
However, the employee with the name Anthony Harris is not returned by the inner query because his salary is under 100000. 
Thus, the outer query only calculates the record of Darin Wilson and returns his salary as the final **AvgManagerSalary** for D-02.

## Subquery in HAVING clause

You can use subqueries in the HAVING clause to filter aggregate values, such as sum, count, average, maximum, and minimum.

👉 **The following query gets the list of department codes and the average salary of employees by the departments that are greater than the average salary of employees in the department D-04**

```sql
SELECT   DeptCode,
         AVG(EmpSalary) AS AvgSalary
FROM     Employee
GROUP BY DeptCode
HAVING   AVG(EmpSalary) > (
		SELECT AVG(EmpSalary)
            FROM Employee
		WHERE DeptCode = 'D-04'
   )
```
Result:

{{< table "table table-sm table-code w-auto" >}}
| DeptCode  | AvgManagerSalary     |
|:---------:|---------------------:|
| D-03      | 150000               |
{{</ table >}}

The inner query returns 115000, which is the average salary of the department with code D-04. This value is then used to filter the average values in the outer query.
