---
title: "How to Find Week Numbers in Google Sheets"
description: "Looking for a way to find the week number of a date in Google Sheets? In this article, you'll learn how to do that easily using the WEEKNUM function."
date: 2020-05-08T12:23:59+07:00
tags: ["google sheets", "weeknum"]
image: "https://res.cloudinary.com/phi21st/image/upload/v1589005121/fitrianingrum.me/2020_calendar.png"
imageAuthor: ""
imageAuthorUrl: ""
imageSource: ""
imageSourceUrl: ""
categories: ["data analysis"]
keywords: ["google sheets weeknum", "find week number in google sheets", "week number in google sheets"]
---

You might want to track your data by the week of the year. 
For example, you might want to know whether your highest sales performance happens in the 14th, 21st, or 50th week of the year. 
In this article, you will learn how to use the `WEEKNUM` function to get the week number of the year of a date provided.

## WEEKNUM

This function returns a number representing the week of the year of the date provided. 

The syntax is as follows:

`WEEKNUM(date, [type])`

And you need to provide the following information:

{{< table "table table-sm table-bordered" >}}
| Parameter	| Description                                     |
|-----------|-------------------------------------------------|
| `date`	| This is the date for which to determine the week number. ___You can input a cell containing a date, a function returning a DATE type, or a number representing a date. ___When inputting the date, it is best to use the DATE function because text values may return an error. |
| `type`	| This parameter represents the day that the week starts on. ___It's optional, and by default, the value is 1. ___The value 1 indicates that the week starts on Sunday and ends on Saturday, while the value 2 indicates the week starts on Monday and ends on Sunday. |
{{</ table >}}

Sample usages:

{{< table "table table-sm table-bordered" >}}
| Syntax                        | Explanation                                     |
|-------------------------------|-------------------------------------------------|
| WEEKNUM("5/13/2019")            | Will return 20, because May 13, 2019, is the 20th week of 2019. ___The **type** is not defined, so, by default, the calculation uses Sunday as the first day of the week. |
| WEEKNUM("12/22/2019", 1)      | Will return 52, because December 22, 2019, is the 52nd week of 2019 if the week starts on Sunday. |
| WEEKNUM(DATE(2019, 12, 22), 2) | Will return 51, because December 22, 2019, is the 51st week of 2019 if the week starts on Monday. |
| WEEKNUM(43821, 2)              | 43821 is the number for December 22, 2019. The result will be 52 (the same as the above result). |
{{</ table >}}

To understand how to use the function in **Google Sheets**, let’s take a look at the following example. 

## Using WEEKNUM in Google Sheets

The spreadsheet in **Figure 1** below has a series of dates in cells **B3** through **B11**. 
Notice that the date format is in `mm/dd/yyyy`. 

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1589005846/fitrianingrum.me/2020_googlesheet-weeknum-fig1.jpg" 
	title="Figure 1. Sales Amount" 
	alt="Sales Amount"
	class="text-center"
	width="600">}}


We will fill the week numbers in cells **D3** through **D11** using the `WEEKNUM` function. To do that, follow the simple step-by-step below:

**Step 1**. Click on **Cell D3**.

**Step 2**. Type the formula `=WEEKNUM(B3)`, then press **Enter*. 
You will see that *D3*'s value is 3, indicating that January 15, 2020, is the 3rd week of 2020.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1589005846/fitrianingrum.me/2020_googlesheet-weeknum-fig2.jpg" 
	alt="Step 2. Type the formula"
	class="text-center"
	width="600">}}

**Step 3**. Copy the formula to the other cells by hovering your mouse over the bottom right corner of the blue box, then double-click it. 

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1589005847/fitrianingrum.me/2020_googlesheet-weeknum-fig3.jpg" 
	alt="Step 3. Copy the formula"
	class="text-center"
	width="600">}}

As a result, you got week numbers populated from **D4** through **D11**. 

Notice that the dates `4/5/2020` and `4/6/2020` have the same week number. 
It’s because we didn’t specify the `type` when entering the formula. 
Thus, the calculation uses Sunday as the first day of the week.
