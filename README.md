# Executive Scheduler

## Getting started
Start by cloning the repository.

The structure is as follows.

* SpringBootMVC-master/ (source code for back end)
* front-end/ (source code for front-end)

### Back end
To get the back-end up and running open up the project in your favorite IDE.  You have two choices of database system.  Either the in-memory HSQL database system or using PostgreSQL.

#### PostgreSQL

* Create a database
* Locate the `application.properties` file in `SpringBootMVC-master/src/main/resources`
* Input fill in the corresponding fields.  [Username] [Password] etc.
* Add the `postgresql-42.2.5.jar` file to your project classpath
* Add the user hbv with pw 1234 and database hbv to postgres

#### HSQL

* Locate the `application.properties` file in `SpringBootMVC-master/src/main/resources`
* Comment out all references to PostgreSQL
* Locate the `pom.xml` file in `SpringBootMVC-master/`
* Comment out PostgreSQL dependency
* Uncomment HSQL dependency

When all is done you should be able to run the projects back end.

### Front end
The front end uses REACT.  In order to run the front end server we make use of npm.  So make sure you have that installed.  Next open up your terminal to the front end directory and input the following.

```
front-end/$ npm install
front-end/$ npm start
```

The front end server should now be up and running.  Open up your favorite browser and head to localhost:3000.
