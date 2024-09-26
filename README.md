# quizard
An AI driven flash card Progressive Web App that helps users consolidate information.



# backend
backend uses FastAPI framework and authlib library for authentication. 

## how to run backend
1. cd into 'server' folder
2. obtain '.env' file from Reo and place inside server folder
3. run flollowing commands to install packages: 'python3 -m venv .virtual', 'source .virtual/bin/activate', 'pip3 install -r requirements.txt'
4. finally, run 'fastapi dev' to run the backend server

## how to install new packages
1. make sure you are in server folder
2. run 'source .virtual/bin/activate' to enter virtual env
3. 'pip3 install <package-name>' to install
4. 'pip3 freeze > requirements.txt' to export so that other devs can install them as well

## plan for deployment
Initially, I was thinking to deploy onto vercel because they claim that they support python runtime. 
However, usability was limited for complex full backend like ours are going to be.

What we need is an ability to serve backend and frontend under the same domain while keeping them separate application. 
So, I started to look up on docker. My plan is this:
1. run frontend on, let's say, port 3000
2. run backend on, let's say, port 8000
3. run nginx on port 80.
4. nginx will map /api/* to port 8000. anything else goes to port 3000

So that's what I did. If you run 'docker-compose up --build' on root project directory, it will start the nginx server.
We still need to do the frontend side of it.


Also, if you want to just run the backend container, you can run the following:
    cd server
    docker build -t backend_image .
    docker run -d --name backend_container backend_image

