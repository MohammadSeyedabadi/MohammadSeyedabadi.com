---
local: true
lang: en
slug: performance-tuning-in-database
otherPageSlug: تنظیم-عملکرد-در-دیتابیس
title: Performance tuning in database
createdAt: 2025-05-19
lastModified: 2025-05-19
image: /images/posts/performance-tuning-in-database/database.png
excerpt: Multilevel dropdown menus are a staple of web design. With the ability to provide multiple options to select from, they make navigation bars dynamic and organized.
tags:
  - database
---
Some time ago, I did some research on database performance tuning and I want to write about it here. In the following, each of the following topics will be briefly discussed.

1. [Definition of performance tuning](#Definition-of-performance-tuning)
2. [An overview of database](#An-overview-of-database)
3. [SQL Vs NoSQL](#SQL-Vs-NoSQL)
4. [Performance tuning from an overall perspective](#Performance-tuning-from-an-overall-perspective)
5. [Performance tuning in SQL-Software level](#Performance-tuning-in-SQL-Software-level)
6. [Performance tuning in SQL-Hardware level](#Performance-tuning-in-SQL-Hardware-level)
7. [Performance tuning in NoSQL-Software level](#Performance-tuning-in-NoSQL-Software-level)
8. [Performance tuning in NoSQL-Hardware level](#Performance-tuning-in-NoSQL-Hardware-level)
    1. [Replication and Sharding](#Replication-and-Sharding)
9. [Performance tuning in network](#Performance-tuning-in-network)
10. [Is Performance tuning always done ?](#Is-Performance-tuning-always-done-?)

## Definition of performance tuning

Performance tuning is the process of analyzing and optimizing a system (database, network, or even automobile) with the goal of achieving the best possible performance under given constraints.

## An overview of database

What is a database? A database is like a large filing cabinet, except it's electronic and stores digital information instead of paper documents. A database stores, manages, and retrieves information. A database is essentially software that runs on a computer called a server. A database can also be a collection of databases, servers, and the network that connects the servers. Now, let's look at the two main types of databases that we encounter.

## SQL Vs NoSQL

SQL databases, also known as relational databases, store data in tables. Tables have rows and columns, and each table can have relationships with other tables.

![relational databases](/images/posts/performance-tuning-in-database/relational-database.png)

In NoSQL databases we have more flexibility, meaning we can store data in different formats such as:
1. document
2. Key-Value pairs
3. graph
4. wide column

![Data Structure in NoSQL](/images/posts/performance-tuning-in-database/nosql-data-structure.png)

Each of these two database models has its own advantages and disadvantages, but in many projects there is no need to prefer one over the other and the best thing to do is to use a combination of both.

| Aspects | SQL | NoSQL |
| :----- | :----- | :----- |
| Type | Relational | Non-relational |
| Data | Structured | Structured, semi-structured, and unstructured |
| Schema | Static | Dynamic |
| Scalability | Vertical | Horizontal |
| Transactions | ACID | Eventual consistency |
| Flexibility | Less | More |
| Language | Structured Query Language (SQL) | Languages ​​specific to each NoSQL database |
| Use cases | Suitable for complex queries and transactions | Suitable for rapid development and scalability |
| Examples | MySQL, PostgreSQL, Oracle, SQLite | MongoDB, Cassandra, Redis, Elasticsearch |

Using SQL and NoSQL together in a project is a powerful technique, often known as __polyglot persistence__, and is a design approach that leverages the strengths of each database type to manage different types of data and tasks. Of course, this method is for large projects and is not suitable for small projects.

## Performance tuning from an overall perspective

Performance tuning is the process of optimizing a system for the highest level of performance. Take a BMW GTR M3 for example. This car is great in normal mode, but if our goal is to participate in competitions, we need to make some changes to the car. For example, putting tires that have less friction or increasing engine power. Of course, note that although these changes are great for racing, they are not good at all for normal conditions. For example, the tires must have a standard level of friction so that the car has the necessary safety and the engine noise should not bother the citizens, in addition, these changes have a much higher maintenance cost and this means spending on things that may never be used.

Image of a BMW GTR M3 before and after Performance tuning:

![BMW GTR M3](/images/posts/performance-tuning-in-database/BMW.png)

Performance tuning in a database is a process that covers everything from query optimization to hardware resource management, and it is not a one-time task, but an ongoing process that involves monitoring, diagnosing, and modifying system behavior, just like we have in the case of car racing.

![Monitoring Databases and Cars](/images/posts/performance-tuning-in-database/f1-monitor.png)

In short, performance tuning in a database is important for the following reasons:
1. __Speed:__ Reduce query execution time
2. __Scalability:__ Manage users as workloads increase
3. __Resource efficiency:__ Optimize CPU, memory, and ... usage

Each of these can be achieved by changes in software or hardware architecture. I will give a very general explanation below, but if this topic is to be learned well and implemented in practice, you should go to reference sources, such as this book:

![Database Performance Tuning Book](/images/posts/performance-tuning-in-database/database-tuning.jpg)

## Performance tuning in SQL-Software level

__Query Optimization:__
1. __Query Rewriting:__ Write the names of the required columns instead of using SELECT *
2. __Automated Tools:__ Use tools to analyze how queries are executed and identify bottlenecks

__Indexing Strategies:__
1. __Create appropriate indexes:__ Index columns that are frequently used
2. __Periodic Index Checking:__ Periodically check indexes to keep the program optimized

__Database Configuration:__
1. __Parameter Setting:__ Modify configuration files to allocate appropriate memory, cache size, and disk I/O settings
2. __Connection pooling:__ A technique for optimally managing database access

__Storage Mechanisms:__
1. __Result Caching:__ Store the results of common queries
2. __Memory Storage:__ Store frequently used data on other databases, to reduce pressure on the main database

## Performance tuning in SQL-Hardware level

__Upgrading various components:__
1. __Hard:__ Using SSD instead of HDD for faster data access
2. __RAM:__ For faster processing
3. __CPU:__ Multi-core or faster CPUs for increased speed and complex processing

__Server configuration:__
1. __Load balancing:__ Distributing the load of queries across multiple servers

## Performance tuning in NoSQL-Software level

__Scaling:__
1. __Horizontal Scaling:__ Distributing data across multiple servers to manage load and optimize access speed
2. __Replication and Consistency:__ How fast data is distributed across other servers
3. __Shard keys:__ Choosing good shard keys to divide data evenly and support search patterns
4. __Caching:__ Just like SQL, storing frequently used data in a way that is optimized for access

__Data Modeling and Schema Design:__
1. __Choosing the right data model:__ We choose a data model according to the situation
2. __Flexible Schema:__ Organizing information in a way that makes it fast to find what we are looking for
3. __Denormalization:__ Based on user requests, lists are created (made of combinations of Several lists (which may contain duplicate information, but since they are widely used, the system speed increases.

## Performance tuning in NoSQL-Hardware level

1. __Distributed Node Optimization:__ Each node in a cluster should be balanced
2. __Network performance:__ Since data in NoSQL environments is often distributed across multiple servers or even data centers, the network can have a significant impact
3. __Replication and Sharding:__ NoSQL databases often use Replication to distribute data across nodes and Sharding to partition and ensure data availability.

So far, I have briefly mentioned some aspects of database performance tuning. Next, I will mention some aspects of network performance tuning because, as I mentioned before, for example, in the case of Replication and Sharding, we need communication between different nodes, so the role of the network becomes more colorful here. But before I give examples of performance tuning about the network, I think it would be good to explain Replication and Sharding a little more. Just note that we can have this method in SQL or a combination of SQL and NoSQL in some way.

### Replication and Sharding

Sharding and Replication are both fundamental strategies in NoSQL databases and serve distinct purposes in how data is managed and scaled.

__Replication__

Replication creates multiple copies of the same data across servers (nodes). The main purpose is to ensure high availability and fault tolerance. If one node fails, other nodes have the same data and can continue to serve queries. This method significantly increases the system's resilience in the face of hardware failures or network problems.

__Consistency considerations:__ Operations such as data deletion must be synchronized between copies, either synchronously or asynchronously.

__Sharding__

Sharding divides a large data set into smaller, more manageable chunks called shards. This allows the system to spread the workload across multiple nodes and increase throughput.

__Considerations for managing complex queries:__ Queries that target a specific shard are fast, but queries that span multiple shards may add complexity to the system.

## Performance tuning in network

1. __Bandwidth Optimization:__ Adjusting the amount of data that can be sent over the network
2. __Latency Reduction:__ Configuring routing protocols to choose a better path, i.e. reducing the number of hops between the source and destination
3. __Hardware setup:__ Using high-quality network tools and configuring them properly

## Is Performance tuning always done ?

![Venn Diagram to Describe an Engineer](/images/posts/performance-tuning-in-database/venn-en.png)

The image above is a Venn diagram to describe an engineer, any engineer. According to this diagram, engineers should do their work quickly and dirty. But this will cost a lot in the long run or even in the short run, so you should try to proceed with principles from the very beginning.
