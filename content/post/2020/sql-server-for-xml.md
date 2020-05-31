---
title: "Generating Results in XML using SQL Server FOR XML"
description: "This article contains various examples of querying relational tables into XML format as an output using FOR XML clause. I keep forgetting the code and keep googling, so I put them in this post."
date: 2020-05-31T09:47:28+07:00
image: ""
imageAuthor: ""
imageAuthorUrl: ""
imageSource: ""
imageSourceUrl: ""
tags: ["sql", "sql server", "tsql", xml]
categories: ["data analysis"]
keywords: ["sql server xml", "sql server for xml", "sql server query xml", "sql server return xml", "sql export to xml", "sql query output to xml file", "xml raw", "for xml raw", "for xml auto", "for xml path", "sql server for xml auto", "sql server xml output"]
---

SQL Server allows us to query the data (which is stored in the table) in XML format by using `FOR XML` clause. 
This clause has several modes: `AUTO`, `RAW`, and `PATH` that we can choose based on our needs. 

There is also the `EXPLICIT` mode, which is the original method for defining the structure of the XML result. 
However, this method is deprecated and should not be used for new development. We should use the `PATH` mode instead of `EXPLICIT`.

While `FOR XML RAW` and `FOR XML AUTO` are useful for generating XML quickly, 
`FOR XML PATH` provides much greater control and flexibility over the end result.

## FOR XML RAW

It's useful for ad hoc row querying or when the structure of the XML result is not known beforehand. When using this mode, the tag name is `row` by default. 

### --- RAW mode basic example

Notice that in the following basic example, the tag name is by default, `row`. 

```sql
SELECT	soh.SalesOrderID
		, soh.SalesOrderNumber
		, soh.OrderDate
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML RAW 
```

Result:

{{< highlight xml>}}
<row SalesOrderID="43704" SalesOrderNumber="SO43704" OrderDate="2011-06-01T00:00:00" />
<row SalesOrderID="51612" SalesOrderNumber="SO51612" OrderDate="2013-06-25T00:00:00" />
<row SalesOrderID="57361" SalesOrderNumber="SO57361" OrderDate="2013-10-02T00:00:00" />
{{< /highlight>}}

### --- RAW mode with a custom tag name

However, we can override the default tag name for the element. 
The following example changes the default tag name from `row` to `SalesOrder`.

```sql
SELECT	soh.SalesOrderID
		, soh.SalesOrderNumber
		, soh.OrderDate
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML RAW ('SalesOrder')
```
Result:

{{< highlight xml>}}
<SalesOrder SalesOrderID="43704" SalesOrderNumber="SO43704" OrderDate="2011-06-01T00:00:00" />
<SalesOrder SalesOrderID="51612" SalesOrderNumber="SO51612" OrderDate="2013-06-25T00:00:00" />
<SalesOrder SalesOrderID="57361" SalesOrderNumber="SO57361" OrderDate="2013-10-02T00:00:00" />
{{< /highlight>}}

### --- RAW mode with a root element

Another example with a root element named `SalesOrders`:

```sql
SELECT	soh.SalesOrderID
		, soh.SalesOrderNumber
		, soh.OrderDate
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML RAW ('SalesOrder'), ROOT ('SalesOrders')
```

Result:

{{< highlight xml>}}
<SalesOrders>
  <SalesOrder SalesOrderID="43704" SalesOrderNumber="SO43704" OrderDate="2011-06-01T00:00:00" />
  <SalesOrder SalesOrderID="51612" SalesOrderNumber="SO51612" OrderDate="2013-06-25T00:00:00" />
  <SalesOrder SalesOrderID="57361" SalesOrderNumber="SO57361" OrderDate="2013-10-02T00:00:00" />
</SalesOrders>
{{< /highlight>}}

### --- RAW mode with changing attributes to elements

We can also change the attributes to elements by adding `ELEMENTS`

```sql
SELECT	soh.SalesOrderID
		, soh.SalesOrderNumber
		, soh.OrderDate
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML RAW ('SalesOrder'), ROOT ('SalesOrders'), ELEMENTS
```

Result:

{{< highlight xml>}}
<SalesOrders>
  <SalesOrder>
    <SalesOrderID>43704</SalesOrderID>
    <SalesOrderNumber>SO43704</SalesOrderNumber>
    <OrderDate>2011-06-01T00:00:00</OrderDate>
  </SalesOrder>
  <SalesOrder>
    <SalesOrderID>51612</SalesOrderID>
    <SalesOrderNumber>SO51612</SalesOrderNumber>
    <OrderDate>2013-06-25T00:00:00</OrderDate>
  </SalesOrder>
  <SalesOrder>
    <SalesOrderID>57361</SalesOrderID>
    <SalesOrderNumber>SO57361</SalesOrderNumber>
    <OrderDate>2013-10-02T00:00:00</OrderDate>
  </SalesOrder>
</SalesOrders>
{{< /highlight>}}

## FOR XML AUTO

This mode is similar to the `RAW` mode, but the tag name is the **table name** by default. 
It's particularly useful when we need to map the XML result back to the original columns in the source table.

### --- AUTO mode basic example

Each row in the table becomes one row of an XML element. Table alias `soh` becomes tag, and columns become attributes.

```sql
SELECT	soh.SalesOrderID
		, soh.SalesOrderNumber
		, soh.OrderDate
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML AUTO
```
Result:

{{< highlight xml>}}
<soh SalesOrderID="43704" SalesOrderNumber="SO43704" OrderDate="2011-06-01T00:00:00" />
<soh SalesOrderID="51612" SalesOrderNumber="SO51612" OrderDate="2013-06-25T00:00:00" />
<soh SalesOrderID="57361" SalesOrderNumber="SO57361" OrderDate="2013-10-02T00:00:00" />
{{< /highlight >}}

### --- AUTO mode with a custom root element

If we want to give a root element named `SalesOrder`:

```sql
SELECT	soh.SalesOrderID
		, soh.SalesOrderNumber
		, soh.OrderDate
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML AUTO, ROOT ('SalesOrders')
```
Result:

{{< highlight xml>}}
<SalesOrders>
  <soh SalesOrderID="43704" SalesOrderNumber="SO43704" OrderDate="2011-06-01T00:00:00" />
  <soh SalesOrderID="51612" SalesOrderNumber="SO51612" OrderDate="2013-06-25T00:00:00" />
  <soh SalesOrderID="57361" SalesOrderNumber="SO57361" OrderDate="2013-10-02T00:00:00" />
</SalesOrders>
{{< /highlight >}}

## FOR XML PATH

We use this mode when we know the structure of the XML result in advance. It is a safer option than the `RAW` or `AUTO` modes in production code.
Rows and columns are formatted as elements by default. 

### --- PATH mode basic example

```sql
SELECT	soh.SalesOrderID
		, soh.SalesOrderNumber
		, soh.OrderDate
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML PATH
```

Result:

{{< highlight xml>}}
<row>
  <SalesOrderID>43704</SalesOrderID>
  <SalesOrderNumber>SO43704</SalesOrderNumber>
  <OrderDate>2011-06-01T00:00:00</OrderDate>
</row>
<row>
  <SalesOrderID>51612</SalesOrderID>
  <SalesOrderNumber>SO51612</SalesOrderNumber>
  <OrderDate>2013-06-25T00:00:00</OrderDate>
</row>
<row>
  <SalesOrderID>57361</SalesOrderID>
  <SalesOrderNumber>SO57361</SalesOrderNumber>
  <OrderDate>2013-10-02T00:00:00</OrderDate>
</row>
{{< /highlight >}}

### --- PATH mode with an element name

We can also override the default element `row`. 
The following example changes the default element `row` to `SalesOrder`.

```sql
SELECT	soh.SalesOrderID
		, soh.SalesOrderNumber
		, soh.OrderDate
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML PATH ('SalesOrder')
```

Result:

{{< highlight xml>}}
<SalesOrder>
  <SalesOrderID>43704</SalesOrderID>
  <SalesOrderNumber>SO43704</SalesOrderNumber>
  <OrderDate>2011-06-01T00:00:00</OrderDate>
</SalesOrder>
<SalesOrder>
  <SalesOrderID>51612</SalesOrderID>
  <SalesOrderNumber>SO51612</SalesOrderNumber>
  <OrderDate>2013-06-25T00:00:00</OrderDate>
</SalesOrder>
<SalesOrder>
  <SalesOrderID>57361</SalesOrderID>
  <SalesOrderNumber>SO57361</SalesOrderNumber>
  <OrderDate>2013-10-02T00:00:00</OrderDate>
</SalesOrder>
{{< /highlight>}}

### --- PATH mode with a custom root element

Then with a root element named `SalesOrders`.

```sql
SELECT	soh.SalesOrderID
		, soh.SalesOrderNumber
		, soh.OrderDate
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML PATH ('SalesOrder'), ROOT ('SalesOrders')
```

Result:

{{< highlight xml>}}
<SalesOrders>
  <SalesOrder>
    <SalesOrderID>43704</SalesOrderID>
    <SalesOrderNumber>SO43704</SalesOrderNumber>
    <OrderDate>2011-06-01T00:00:00</OrderDate>
  </SalesOrder>
  <SalesOrder>
    <SalesOrderID>51612</SalesOrderID>
    <SalesOrderNumber>SO51612</SalesOrderNumber>
    <OrderDate>2013-06-25T00:00:00</OrderDate>
  </SalesOrder>
  <SalesOrder>
    <SalesOrderID>57361</SalesOrderID>
    <SalesOrderNumber>SO57361</SalesOrderNumber>
    <OrderDate>2013-10-02T00:00:00</OrderDate>
  </SalesOrder>
</SalesOrders>
{{< /highlight>}}

## Nested element examples

See the difference between the `RAW` and `PATH` modes below.

### --- RAW mode with a nested element

```sql
SELECT	soh.SalesOrderID
	, soh.SalesOrderNumber
	, soh.CustomerID
	, (SELECT	sd.SalesOrderDetailID
			, sd.ProductID
			, sd.LineTotal
	   FROM		Sales.SalesOrderDetail sd 
	   WHERE	sd.SalesOrderID = soh.SalesOrderID
	   FOR XML PATH ('SalesOrderDetail'), ROOT ('SalesOrderDetails'), TYPE	   	
	   )
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML RAW ('SalesOrder'), ROOT ('SalesOrders')
```

Result:

{{< highlight sql >}}
<SalesOrders>
  <SalesOrder SalesOrderID="43704" SalesOrderNumber="SO43704" CustomerID="11005">
    <SalesOrderDetails>
      <SalesOrderDetail>
        <SalesOrderDetailID>360</SalesOrderDetailID>
        <ProductID>778</ProductID>
        <LineTotal>3374.990000</LineTotal>
      </SalesOrderDetail>
    </SalesOrderDetails>
  </SalesOrder>
  <SalesOrder SalesOrderID="51612" SalesOrderNumber="SO51612" CustomerID="11005">
    <SalesOrderDetails>
      <SalesOrderDetail>
        <SalesOrderDetailID>38954</SalesOrderDetailID>
        <ProductID>780</ProductID>
        <LineTotal>2319.990000</LineTotal>
      </SalesOrderDetail>
      <SalesOrderDetail>
        <SalesOrderDetailID>38955</SalesOrderDetailID>
        <ProductID>930</ProductID>
        <LineTotal>35.000000</LineTotal>
      </SalesOrderDetail>
      <SalesOrderDetail>
        <SalesOrderDetailID>38956</SalesOrderDetailID>
        <ProductID>921</ProductID>
        <LineTotal>4.990000</LineTotal>
      </SalesOrderDetail>
      <SalesOrderDetail>
        <SalesOrderDetailID>38957</SalesOrderDetailID>
        <ProductID>873</ProductID>
        <LineTotal>2.290000</LineTotal>
      </SalesOrderDetail>
    </SalesOrderDetails>
  </SalesOrder>
  <SalesOrder SalesOrderID="57361" SalesOrderNumber="SO57361" CustomerID="11005">
    <SalesOrderDetails>
      <SalesOrderDetail>
        <SalesOrderDetailID>63669</SalesOrderDetailID>
        <ProductID>955</ProductID>
        <LineTotal>2384.070000</LineTotal>
      </SalesOrderDetail>
    </SalesOrderDetails>
  </SalesOrder>
</SalesOrders>
{{< /highlight >}}

### --- PATH mode with a nested element

```sql
SELECT	soh.SalesOrderID
	, soh.SalesOrderNumber
	, soh.CustomerID
	, (SELECT	sd.SalesOrderDetailID
			, sd.ProductID
			, sd.LineTotal
	   FROM		Sales.SalesOrderDetail sd 
	   WHERE	sd.SalesOrderID = soh.SalesOrderID
	   FOR XML PATH ('SalesOrderDetail'), ROOT ('SalesOrderDetails'), TYPE)
FROM	Sales.SalesOrderHeader soh
WHERE	soh.CustomerID IN (11005)
FOR XML PATH ('SalesOrder'), ROOT ('SalesOrders')
```

Result:

{{< highlight sql >}}
<SalesOrders>
  <SalesOrder>
    <SalesOrderID>43704</SalesOrderID>
    <SalesOrderNumber>SO43704</SalesOrderNumber>
    <CustomerID>11005</CustomerID>
    <SalesOrderDetails>
      <SalesOrderDetail>
        <SalesOrderDetailID>360</SalesOrderDetailID>
        <ProductID>778</ProductID>
        <LineTotal>3374.990000</LineTotal>
      </SalesOrderDetail>
    </SalesOrderDetails>
  </SalesOrder>
  <SalesOrder>
    <SalesOrderID>51612</SalesOrderID>
    <SalesOrderNumber>SO51612</SalesOrderNumber>
    <CustomerID>11005</CustomerID>
    <SalesOrderDetails>
      <SalesOrderDetail>
        <SalesOrderDetailID>38954</SalesOrderDetailID>
        <ProductID>780</ProductID>
        <LineTotal>2319.990000</LineTotal>
      </SalesOrderDetail>
      <SalesOrderDetail>
        <SalesOrderDetailID>38955</SalesOrderDetailID>
        <ProductID>930</ProductID>
        <LineTotal>35.000000</LineTotal>
      </SalesOrderDetail>
      <SalesOrderDetail>
        <SalesOrderDetailID>38956</SalesOrderDetailID>
        <ProductID>921</ProductID>
        <LineTotal>4.990000</LineTotal>
      </SalesOrderDetail>
      <SalesOrderDetail>
        <SalesOrderDetailID>38957</SalesOrderDetailID>
        <ProductID>873</ProductID>
        <LineTotal>2.290000</LineTotal>
      </SalesOrderDetail>
    </SalesOrderDetails>
  </SalesOrder>
  <SalesOrder>
    <SalesOrderID>57361</SalesOrderID>
    <SalesOrderNumber>SO57361</SalesOrderNumber>
    <CustomerID>11005</CustomerID>
    <SalesOrderDetails>
      <SalesOrderDetail>
        <SalesOrderDetailID>63669</SalesOrderDetailID>
        <ProductID>955</ProductID>
        <LineTotal>2384.070000</LineTotal>
      </SalesOrderDetail>
    </SalesOrderDetails>
  </SalesOrder>
</SalesOrders>
{{< /highlight >}}