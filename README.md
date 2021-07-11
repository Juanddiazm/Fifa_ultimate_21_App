# Fifa_ultimate_21_App

The application is configured to work with docker-compose
To build the app:

**sudo docker-compose build**

**sudo docker-compose up**

**The front runs in**:
http://localhost:3000/

**The Back runs in**:
http://localhost:1337/

**ApiKey=0e83c042-434b-432e-abd6-8fede268c0ce**

**MongoDB URL is:**
mongodb://localhost:27018/fifa_ultimate_21

The script to extract the data from the endpoint https://www.easports.com/fifa/ultimate-team/api/fut/item is in:
**back_fifa_21/src/utils/extractData.ts** Line 22 has the instructions to extract the desired number of pages and if 23 is uncommented, all the pages provided by the endpi are extracted.

