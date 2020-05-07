# TalenQ-Backend-Internship-Task
TalenQ is a recruitment-aggregation platform that brings Employers and Hiring Partners together in order to identify and hire the right candidate in a timely manner and at the right cost. TalenQ is a cloud-enabled, analytics-driven platform which uses Natural Language Processing and Machine Learning for a seamless hiring experience.

## Challenge - 
Upload an excel file (.xlsx) and read all the data from it and store it in a table in MongoDB.
Now write CREATE, UPDATE and DELETE APIs to manage the same data.
The xlsx file can have 0- 100 columns with 0-1,000,000 rows/data in it.
For now consider that this excel sheet will have only one sheet in it.

## Solution -
Implemented this application through user can now upload an .xlsx file of any size and the data of that file is stored in mongoDB using mongoose. After the uploading of file is done and is successfully stored in DB, user now can perform different types of CRUD operations.

## To Use
TO use this application you must be having NodeJs and MongoDB installed in your system.
Clone this repository and head over to terminal and and install all dependencies using command:-
- sudo npm install
After installing all dependencies, you can start the server using the command:-
- npm start
Now server is started and you can use application using following APIs:-
- To upload file:- localhost:3000/api/file/upload
- To remove all uploaded files:- localhost:3000/api/file/removeFiles
- To addData:- localhost:3000/api/data/add
- To getData:- localhost:3000/api/data/get
- To updateData:- localhost:3000/api/data/update
- To deleteData:- localhost:3000/api/data/delete
