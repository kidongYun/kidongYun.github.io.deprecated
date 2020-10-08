---
layout: post
title:  "Interpark - How to use Jira Client"
date:   2020-03-16 14:30:54 +0900
categories: java jira
---

### Dependency

> You could refer 'https://mvnrepository.com/artifact/net.rcarz/jira-client/0.5' site.

```
    compile group: 'net.rcarz', name: 'jira-client', version: '0.5'
```

### Usage of Jira Client library

#### Creating Credentials Object.

> Most of Jira sites have an authentication system. You could sign in to there using this object.

```java
BasicCredentials creds = new BasicCredentials("ID", "PASSWORD");
```

#### Creating Jira Client.

> Jira Client means a sort of the clients using this system. but It's a robot not a human.

```java
JiraClient jiraClient = new JiraClient("https://pms.interpark.com/");
```

> If you should enter there with authentication then add credential object as second parameter.

```java
JiraClient jiraClient = new JiraClient("https://pms.interpark.com/", creds);
```

#### Connecting Issue.

> You could connect issue using the below code.

```java
Issue issue = jiraClient.getIssue("AIRDEV-176");
```

#### Add Watcher

> You could add the watchers using the name of each users.

```java
/* adding itself */
issue.addWatcher(jiraClient.getSelf());

/* adding another user */
issue.addWatcher("USERNAME");
```

#### Add Comment

> You could add the comments 

```java
/* It's default */
issue.addComment("It's the test written by Jira-Client.");

/* If you need to set the scope of the comment as the project members */
issue.addComment("It's the test written with 2 parameters by Jira-Client", "role", "Developers");
```

#### Get Reporter Informations

```java
System.out.println("Reporter: " + issue.getReporter());
System.out.println("Reporter's Name: " + issue.getReporter().getDisplayName());
```

#### Change the assignee

```java
issue.update()
    .field(Field.ASSIGNEE, "batman")
    .execute();         
```

#### Change transition

```java
issue.transition()
    .execute("HOLDING");
```

#### Add/Remove Label (It's like Hashtag)

```java
issue.update()
    .fieldAdd(Field.LABELS, "baz")
    .fieldRemove(Field.LABELS, "foo")
    .execute();
```

#### Change Summary

```java
issue.update()
.field(Field.SUMMARY, "tubes are clogged")
.execute();
```

#### Change Priority

```java
issue.update()
.field(Field.PRIORITY, Field.valueById("1"))
.execute();
```

#### Add Attachment
 
```java
File file = new File("C:\\Users\\John\\Desktop\\screenshot.jpg");
issue.addAttachment(file);
```

#### Create a new Issue

```java
Issue newIssue = jira.createIssue("TEST", "Bug")
    .field(Field.SUMMARY, "Bat signal is broken")
    .field(Field.DESCRIPTION, "Commissioner Gordon reports the Bat signal is broken.")
    .field(Field.REPORTER, "batman")
    .field(Field.ASSIGNEE, "robin")
    .execute();
```

```java

/* Creating Authentication */
BasicCredentials creds = new BasicCredentials("ID", "PASSWORD");



/* Creating Jira Client is needed url of your site and It could take the credential object optionally */
JiraClient jiraClient = new JiraClient("https://pms.interpark.com/", creds);

/* Connecting issue of jira */
Issue issue = jiraClient.getIssue("AIRDEV-176");

/* */
            issue.addWatcher(jiraClient.getSelf());
            issue.addWatcher("N10135");
```