---
title: "5 Free Online Tools to Create Entity-Relationship Diagrams (ERD)"
description: "Looking for free online tools to design your relational database and collaborate with your co-workers when designing the database? Check out some of the options here. Plus, learn why it is important to model your database correctly."
date: 2020-11-19T15:28:05+07:00
image: ""
imageAuthor: ""
imageAuthorUrl: ""
imageSource: ""
imageSourceUrl: ""
tags: ["database design", "er diagram"]
categories: ["database"]
keywords: ["online tools erd", "erd online tools", "entity relationship diagram", "database diagram online", "online database diagram", "er diagram online"]
---

It's a best practice to design and model your database correctly at the early stage of development. 
It will help you identify potential challenges early on before they become major flaws. 
Even if your system is already built and running in production, it's not too late to model your existing database to understand it thoroughly.

## Why modeling your database is important

The database is the backbone of almost any software project. However, too often, too little time is spent on designing it as right as possible the first time. 
And too much time is spent on thinking about how to build a system as quickly as possible.

The problem with that mindset is that you will obviously miss common things, and late in the project, you have to go back to tweak or fix the design.
You will often need to add several major tables, split tables apart, or even nearly starting over.

It will be It will be more difficult to make changes to your systems as more users exist. 
And in the end, doing maintenance is far more costly than initially creating the system.

{{< blockquote >}}
A picture is worth a thousand words.
{{< /blockquote >}}

Entity-Relationship (ER) Diagram is one of the graphical representation tools that are very useful to document your database. 
By modeling the entities, attributes, and relationships correctly, it will be easier for you and your team to start implementing a new application or modify the existing one.

## The 5 Online Tools to Create ER Diagrams

There are standalone applications that you can use. 
However, but they can be expensive and are often specific to a particular database.

There are also many free online tools out there, which run in web browsers and can be used to develop database diagrams for various RDBMSs. 
However, in this article, I'll pick only 5, and here is the list:

### 1. Draw.io

Website: [draw.io](https://www.draw.io/)

I put this tool on the first list because it's a completely free web application. 
You can access all of its functionalities for free and without limitations.

If you just need to create ER diagrams and share them with co-workers, then [draw.io](https://www.draw.io/) is probably the best option for you! 

This tool is very easy to use. You can create a diagram from scratch easily and quickly, then download it as PDF, PNG, JPG, or SVG, even without login or registration.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1606464649/fitrianingrum.me/2020-online-erd-tools/drawio.jpg" 
	title="draw.io - database diagram"
	alt="draw.io - database diagram"
	width="600"
	class="text-center" >}}

You may be wondering how [draw.io](https://www.draw.io/) earns money.
_Well_, they offers different pricing options for various [integrations](https://www.diagrams.net/integrations.html). 
So, for example, if you use draw.io with Atlassian Confluence and JIRA, there will be a monthly or yearly fee.

### 2. Lucidchart 

Website: [lucidchart.com](https://www.lucidchart.com/)

To start creating a new diagram in [Lucidchart](https://www.lucidchart.com/), first, you need to sign up for a free account if you don't have any.
After that, you can create a new diagram from a template or start from a blank.

While there are no templates in [draw.io](https://www.draw.io/), [Lucidchart](https://www.lucidchart.com/) has many beautiful ones to choose from before creating an ER diagram.
You can also choose between Crow's Foot notation or UML notation when creating a diagram from templates.

See the following example of an ER that uses Crow's Foot notation:

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1606464649/fitrianingrum.me/2020-online-erd-tools/lucidchart-er-crows-foot.jpg" 
	title="Lucidchart - Crow's Foot notation" 
	alt="Lucidchart - Crow's Foot notation"
	width="540"
	class="text-center" >}}

In [Lucidchart](https://www.lucidchart.com/), sharing a diagram is very similar to share a document in Google Drive.
You can share it publicly by using a shareable link or to specific people by entering their email address. 
You can also set its edit, comment, and share permission easily.

For the [Free Plan](https://lucid.app/pricing/lucidchart#/pricing), you can access 100 free templates and edit up to 3 documents, with each document can contain up to 60 objects.

### 3. SqlDBM

Website: [sqldbm.com](https://sqldbm.com/)

Unlike Lucidchart, [SqlDBM](https://sqldbm.com/) doesn't require you to create an account if you just want to play around creating a database diagram. 

Before creating a diagram, you will need to choose the RDBMS that you're going to use.
[SqlDBM](https://sqldbm.com/) supports many popular database types, such as Microsoft SQL Server, MySQL, PostgreSQL, Amazon Redshift, and Snowflake.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1606464649/fitrianingrum.me/2020-online-erd-tools/sqldbm-er-diagram.jpg" 
	title="SqlDBM - database diagram" 
	alt="SqlDBM - database diagram"
	width="600"
	class="text-center" >}}

If you'd like to save your diagram, sign up for a free account and then sign in. 

[SqlDBM](https://sqldbm.com/) also allows you to generate SQL scripts that will build your diagram in your chosen RDBMS. 
It can save you a lot of time when converting your diagram into a real database.

This tool is suitable for a wide range of users, namely Developers, Project Managers, BI Consultants, Teachers, and Students.

### 4. dbdiagrams.io

Website: [dbdiagrams.io](https://dbdiagram.io/)

This tool is mainly designed for Developers and Data Analysts.

To create a diagram, you need to write codes similar to SQL commands for creating tables. 
As you type in the left-pane, the visual display on the right-pane refreshes to show you what the diagram looks like based on the table names, columns, and relationships you defined.

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1606464649/fitrianingrum.me/2020-online-erd-tools/dbdiagramsio.jpg" 
	title="dbdiagram.io - database diagram"
	alt="dbdiagram.io - database diagram"
	width="600"
	class="text-center" >}}

This tool allows you to share your diagrams and export them in PDF, PNG, or SQL format.
If you want to export the SQL scripts, currently, there are a few database options available to choose: SQL Server, MySQL, and PostgreSQL.

There are two plans available: [Free and Pro](https://dbdiagram.io/pricing). _And_ for the Free Plan, you can create up to 10 diagrams. 
If you'd like to go for Pro, the price is $9 per month.

### 5. Quick DBD

Website: [quickdatabasediagrams.com](https://www.quickdatabasediagrams.com/)

[Quick DBD](https://www.quickdatabasediagrams.com/) has similar features with the [dbdiagrams.io](https://dbdiagram.io/), in ways such as:
- You need to write codes to build the diagram.
- It does not require you to sign up first before creating a diagram.
- It allows you to export diagrams 
- It allows you to generate SQL scripts of your chosen DBMS

However, this tool is a bit easier to use because the code that you need to write is shorter and cleaner. 

{{< figure src="https://res.cloudinary.com/phi21st/image/upload/v1606464649/fitrianingrum.me/2020-online-erd-tools/quickdbd.jpg" 
	title="Quick DBD - database diagram"
	alt="Quick DBD - database diagram"
	width="600"
	class="text-center" >}}

It also has two plans: Free (basic) and Pro. If you'd like to go for Pro, the price is $14 per month, which is higher than [dbdiagrams.io](https://dbdiagram.io/)'s.

## Conclusion 

When it comes to model your relational database, you actually don't need anything more than a pencil and some paper. 
However, if you want to collaborate with your co-workers when creating ER diagrams, there are many online tools you can choose.

One of the 5 online tools explained in this article may be the best option for you. 
You'll probably like [draw.io](https://www.draw.io/) the most because it's free and easy to use.
_Or_, if you're a Developer, you may like [SqlDBM](https://sqldbm.com/), [dbdiagrams.io](https://dbdiagram.io/), or [Quick DBD](https://www.quickdatabasediagrams.com/).

Have a quick try of each of them, and if you have comments you'd like to share, feel free to write in the comment section below 😉