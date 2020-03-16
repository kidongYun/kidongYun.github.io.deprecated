---
layout: post
title:  "Interpark - How to use the mysql dump file."
date:   2020-02-24 11:21:54 +0900
categories: interpark graphql typescript node
---

> This article is just for recording the way how to use rgw mysql dump file.

### Export (dump)

> First of all, You have to move the directory to the root of mysql. and then You can see the _mysqldump.exe_ file. at there, Let's start to type the below command. then your file will save with the below file name.

```
    mysqldump -u [user id] -p [database name] > [.sql file]
```

### Import

> It has to go the root directory either. and then follow the below.

```
    mysql -u [user id] -p database name < [.sql file]
```