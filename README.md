ZHAW_oneExpense
===============

1Choose a type of application2Configure the application3Next steps
Your application has been created. Continue to the application overview page.

Making code changes
Install the Git client for your operating system, and from your command line run

git clone ssh://547f4d2becb8d4be98000046@oneexpense-scalcsan.rhcloud.com/~/git/oneexpense.git/
cd oneexpense/
This will create a folder with the source code of your application. After making a change, add, commit, and push your changes.

git add .
git commit -m 'My changes'
git push
When you push changes the OpenShift server will report back its status on deploying your code. The server will run any of your configured deploy hooks and then restart the application.

Manage your app
The console is convenient, but if you need deeper control try our other client tools

Command-Line
All of the capabilities of OpenShift are exposed through our command line tool, rhc. Follow these steps to install the client on Linux, Mac OS X, or Windows.

After installing the RHC read more on how to manage your application from the command line in our User Guide.

JBoss Developer Studio
The JBoss Developer Studio is a full featured IDE with OpenShift integration built in. It gives you the ability to create, edit and deploy applications without having to leave the IDE. Links to download, install and use the JBoss Developer Studio for Linux, Mac OS X, or Windows can be found on the JBoss Developer Studio tools page.


MongoDB 2.4 database added.  Please make note of these credentials:

Root User:     admin
Root Password: T8lP13mr5Q6T
Database Name: oneexpense

Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
ssh://547f4d2becb8d4be98000046@oneexpense-scalcsan.rhcloud.com/~/git/oneexpense.git/
ssh://547f4d2becb8d4be98000046@oneexpense-scalcsan.rhcloud.com/~/git/oneexpense.git/
