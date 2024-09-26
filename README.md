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
Initially, I was thinking to deploy onto vercel because they claim that they support python runtime. However, usability was limited.
I started to loop up on docker since we need to orchestrate backend and frontend and serve under the same domain in order for authentication to work.
I created dockerfile for backend. To run it individually, execute the following commands:
    cd server
    docker build -t backend_image .
    docker run -d --name backend_container backend_image

Additionally, I created dockerfile for nginx. This will map /api route to our backend.
While you are in the root project folder, run the following command to launch both backend and nginx
    docker-compose up --build

We still need to write dockerfile for frontend, and serve it through nginx

