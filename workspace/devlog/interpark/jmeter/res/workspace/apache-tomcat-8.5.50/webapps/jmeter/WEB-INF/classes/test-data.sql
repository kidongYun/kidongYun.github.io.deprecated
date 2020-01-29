DROP TABLE data IF EXISTS;
DROP TABLE user IF EXISTS;

CREATE TABLE data (
	no INT IDENTITY NOT NULL PRIMARY KEY ,
	name VARCHAR(128) NOT NULL,
	url VARCHAR(512) NOT NULL,
	note VARCHAR(512) NOT NULL
) ;
CREATE INDEX index_url ON data (url);


CREATE TABLE user (
	no INT IDENTITY NOT NULL PRIMARY KEY ,
	id VARCHAR(128) NOT NULL,
	password VARCHAR(128) NOT NULL,
	name VARCHAR(128) NOT NULL
) ;


-- Data Table Test Data
INSERT INTO data (name,url,note) values ('jacojang','http://www.jacojang.com:80/','jacojang"s Homepage');
INSERT INTO data (name,url,note) values ('jmeter','http://jmeter.apache.org/','Apache JMeter Homepage');
INSERT INTO data (name,url,note) values ('cocoon','http://cocoon.apache.org/','Apache Cocoon Homepage');
INSERT INTO data (name,url,note) values ('gtick','http://www.antcom.de/gtick/','What GNU GTick?');
INSERT INTO data (name,url,note) values ('mplayer','http://www.mplayerhq.hu/','Movie Player');
INSERT INTO data (name,url,note) values ('vlc','http://www.videolan.org/vlc/','VLC media player');
INSERT INTO data (name,url,note) values ('java','http://www.java.com/','Java programming language,application');
INSERT INTO data (name,url,note) values ('python','http://www.python.org:80/','Python is a programming language that lets you work quickly and integrate systems more effectively.');
INSERT INTO data (name,url,note) values ('ruby','https://www.ruby-lang.org:443/','A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write. ');
INSERT INTO data (name,url,note) values ('d','http://dlang.org/','The D programming language. Modern convenience. Modeling power. Native efficiency.');
INSERT INTO data (name,url,note) values ('perl','http://www.perl.org/','The Perl Programming Language');
INSERT INTO data (name,url,note) values ('php','http://www.php.net/','PHP is a popular general-purpose scripting language that is especially suited to web development.');
INSERT INTO data (name,url,note) values ('ada','http://www.adaic.org/','The time-tested, safe and secure programming language');
INSERT INTO data (name,url,note) values ('CUBRID','http://www.cubrid.org/','In general, CUBRID is a comprehensive open source relational database management system highly optimized for Web Applications, especially when complex web services process large amount of data and generate huge concurrent requests.');
INSERT INTO data (name,url,note) values ('firebird','http://www.firebirdsql.org/','Firebird is a relational database offering many ANSI SQL standard features that runs on Linux, Windows, and a variety of Unix platforms. Firebird offers excellent concurrency, high performance, and powerful language support for stored procedures and triggers.');
INSERT INTO data (name,url,note) values ('HSQLDB','http://hsqldb.org/','HSQLDB (HyperSQL DataBase) is the leading SQL relational database software written in Java. It offers a small, fast multithreaded and transactional database engine with in-memory and disk-based tables and supports embedded and server modes');
INSERT INTO data (name,url,note) values ('InterBase','http://www.embarcadero.com/products/interbase','InterBase is a full-featured, high performance and scalable relational database for software developers who are looking to embed a low cost, zero-admin, lightweight database into applications on Android, iOS, Windows, OS X, Linux and Solaris.');
INSERT INTO data (name,url,note) values ('PostgreSQL','http://www.postgresql.org/','PostgreSQL is a powerful, open source object-relational database system. It has more than 15 years of active development and a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness.');
INSERT INTO data (name,url,note) values ('SQLite','http://sqlite.org/','SQLite is a software library that implements a self-contained, serverless, zero-configuration, transactional SQL database engine. SQLite is the most widely deployed SQL database engine in the world. The source code for SQLite is in the public domain.');
INSERT INTO data (name,url,note) values ('Altibase','http://altibase.com/','In-Memory database with hybrid architecture');
--INSERT INTO data (name,url,note) values ('','','');


-- User Table Test Data
INSERT INTO user (id,password,name) values ('jacojang','1234','JacoJang');