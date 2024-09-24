# quizard
An AI driven flash card Progressive Web App that helps users consolidate information.



# backend
backend uses FastAPI framework and authlib library for authentication. 

## how to run backend
1. cd into server folder
2. obtain '.env' file from Reo and place inside server folder
3. run flollowin commands to install packages: 'pipenv install', 'pipenv shell', 'pipenv install -r requirements.txt'
4. run 'uvicorn main:app --reload' to run the backend server

## how to install new packages
1. make sure you are in server folder
2. 'pipenv shell' to activate virual env
3. 'pipenv install <package-name>' to install
4. 'pipenv requirements > requirements.txt' to export so that other devs can install them as well
