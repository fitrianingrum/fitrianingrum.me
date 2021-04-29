---
title: "Excel VBA: Connect and Query Data from SQL Server"
description: "Learn how to write Excel VBA code to connect to an SQL Server database, run SQL SELECT statements, and display the query results in a worksheet."
date: 2021-04-29T12:13:00+07:00
image: ""
imageAuthor: ""
imageAuthorUrl: ""
imageSource: ""
imageSourceUrl: ""
tags: ["excel", "vba", "sql server"]
categories: ["data analysis"]
keywords: ["excel vba sql query", "vba connect to sql server", "vba sql server connection string", "vba sql query", "excel vba sql select statement", "vba run sql query", "vba sql server"]
---

In Excel, there are various ways to display data from external sources, such as SQL Server. 
One of them is by using VBA. This approach is not straightforward and requires some programming knowledge. 
But there may be situations when you prefer using this method.

Let me give you an example:

Assume you need to create and share an Excel file that generates an interactive report from data stored in SQL Server. 
In this case, you will likely choose to use VBA because everyone who receives the file can run the report without needing to set up or install anything else. 
You program the report once, and others can run it smoothly without worrying about possible dependency errors.

## SQL Server table example

For the demonstration, I'll use the following table. But you can also follow with any table that you have in your SQL Server database.

**Table: Flower**

{{< table "table table-sm table-code w-auto" >}}
| ID | Category | Flower            | Price |
|----|:--------:|-------------------|------:|
| 1  | ROS      | Pink Rose         | 15    |
| 2  | ROS      | White Rose        | 15    |
| 3  | ROS      | Red Rose          | 20    |
| 4  | OCH      | Catasetum Orchid  | 15    |
| 5  | OCH      | Dendrobium Orchid | 18    |
| 6  | OCH      | Epidendrum Orchid | 17    |
{{</ table >}}

## Step-by-step: Connect and run SQL query using VBA

Follow the simple step-by-step below to display the table to an Excel worksheet.

### Step 1. Create a new Excel document 

For compatibility with VBA code, save your file as an Excel Macro-Enabled Workbook (**.xlsm**) document instead of an Excel Workbook (**.xlsx**).

### Step 2: Open the Visual Basic Editor by pressing Alt+F11

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_60,w_600/v1619675186/fitrianingrum.me/2021-subquery-sql-select-statement/Excel_Visual_Basic_Editor.png" 
	alt="Excel Visual Basic Editor"
	width="600">}}

### Step 3: Add a reference to Microsoft ActiveX Data Objects Library

To add the reference, click on **Tools** in the ribbon menu at the top of the VBA editor. 
In the popup, ensure the library is checked as shown below:

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_60,w_600/v1619675314/fitrianingrum.me/2021-subquery-sql-select-statement/Excel_VBA_Editor_-_Reference_to_Microsoft_ActiveX_Data_Objects_2.8_Library.png" 
	alt="Excel VBA Editor - Reference to Microsoft ActiveX Data Objects 2.8 Library"
	width="420">}}

If not checked yet, scroll down until you find the library. Then, select the latest version that you have. 
You'll need this library to create a connection to your SQL Server database.

### Step 4: Write VBA code

Double click on **ThisWorkbook** from **Project Explorer** and create `Sub Workbook_Open()`. 

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_60,w_600/v1619675459/fitrianingrum.me/2021-subquery-sql-select-statement/Excel_VBA_Editor_-_Create_a_new_Sub_in_ThisWorkbook.png" 
	alt="Excel VBA Editor - Create a new Sub in ThisWorkbook"
	width="600">}}

Then, copy-paste all of the following code into the Sub:

```vb
Private Sub Workbook_Open()
    Dim adoDbConn As New ADODB.Connection
    Dim adoDbRs As New ADODB.Recordset
    Dim selectCmd As New ADODB.Command
    
    ' Open connection to the SQL Server database
    adoDbConn.Open "Provider=SQLOLEDB;Data Source=.\MSSQL2019;Initial Catalog=ExcelVbaSql;User Id=<userid>; Password=<password>;"
    
    ' Execute the select query
    selectCmd.ActiveConnection = adoDbConn
    selectCmd.CommandText = "SELECT ID, Category, Flower, Price FROM Flower"
    
    Set adoDbRs = selectCmd.Execute(, , adCmdText)
    
    ' Clear the contents in cells where we're going to display the result
    Dim cellRange As Range
    Set cellRange = Range(Cells(2, 2), Cells(Rows.Count, 1)).EntireRow
    cellRange.ClearContents
    
    ' Activate the Worksheet
    Dim ws As Worksheet
    Set ws = Worksheets(1)
    ws.Activate
    
    ' Put the query results starting from cell B2
    If adoDbRs.EOF = False Then ws.Cells(2, 2).CopyFromRecordset adoDbRs
    
    ' Set the column header
    ws.Cells(1, 2) = "ID"
    ws.Cells(1, 3) = "Category"
    ws.Cells(1, 4) = "Flower"
    ws.Cells(1, 5) = "Price"
 
    ' Close the connection and free the memory
    adoDbRs.Close
    Set adoDbRs = Nothing
    Set selectCmd = Nothing
    
    adoDbConn.Close
    Set adoDbConn = Nothing
End Sub
```

Save, close, and re-open the Excel document. The data will be populated in the worksheet, as the following screenshot shows:

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/c_scale,q_60,w_600/v1619675460/fitrianingrum.me/2021-subquery-sql-select-statement/The_Result_of_the_Query_displayed_in_the_Worksheet.png" 
	alt="The Result of the Query displayed in the Worksheet"
	width="600">}}

## Code explanation

There are four essential parts in the VBA code above. 

First, you need to connect to SQL Server. And to do that, you need a connection string to the database. 

```vb
Dim adoDbConn As New ADODB.Connection
Dim adoDbRs As New ADODB.Recordset
Dim selectCmd As New ADODB.Command
    
' Open connection to the SQL Server database
adoDbConn.Open "Provider=SQLOLEDB;Data Source=.\MSSQL2019;Initial Catalog=ExcelVbaSql;User Id=sa; Password=Pa$$w0rd;"
```

Second, you need to execute the SELECT statement to get data from the database.

```vb
' Execute the select query
selectCmd.ActiveConnection = adoDbConn
selectCmd.CommandText = "SELECT ID, Category, Flower, Price FROM Flower"
    
Set adoDbRs = selectCmd.Execute(, , adCmdText)
```

Third, display the result of the query to the worksheet. 

```vb
' Activate the Worksheet
Dim ws As Worksheet
Set ws = Worksheets(1)
ws.Activate
    
' Put the query results starting from cell B2
If adoDbRs.EOF = False Then ws.Cells(2, 2).CopyFromRecordset adoDbRs
```

Finally, close the connection and free the memory. It's important to clean up the objects by setting them to `Nothing`.

```vb
' Close the connection and free the memory
adoDbRs.Close
Set adoDbRs = Nothing
Set selectCmd = Nothing
    
adoDbConn.Close
Set adoDbConn = Nothing
```