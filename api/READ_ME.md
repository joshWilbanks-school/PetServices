TO SET UP API:

1 - make sure you have python and mysql installed
2 - make sure you have all of the dependencies installed (uvicorn, sqlalchemy, pydantic, fastapi -> can be installed with 'pip install' command)
3 - create a database to be used in mysql
4 - update the config file (./api/dependencies/config) with the correct information (username, password, database name)
5 - cd to the api folder
6 - run the command 'uvicorn main:app'
7 - browse to [localhost](http://localhost:8000/docs#/)
8 - you should now be able to see and use all of the available api endpoints to store / retrieve / update / delete user data


THE WAY THE DATABASE / API IS CONFIGURED:

A 'User' has basic information that both Customer's and Service Providers will need (profile pic, name, etc)
A 'Service Provider' has additional information attatched, such as a bio, rating, etc. As more tables are made, such as user reviews, this will continue to be updated.
A 'Customer' only links back to a user currently. As more tables are made, such as pets and user reviews, this will continue to be udpated.

Example:
 To create a new Service Provider, first create a new user (post to /user/),
    then using that user id, create a new service provider (post to /service_provider/, with the "user_id" attribute set to that of the recently created user)