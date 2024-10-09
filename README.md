# quizard
An AI driven flash card Progressive Web App that helps users consolidate information.

# how to run in localhost
## prerequisites 
1. python3
2. node
3. inside `client` folder, place your `.env` file
4. inside `server` folder, place your `.env` file
## steps
1. go to `client` folder (`cd client`)
2. run `npm run install` if you haven't recently
3. run `npm run dev`
   This will run both client and server in localhost. Both services are accessible via port 3000.
   Any requests that begins with /api/py will be redirected to the backend service.
## how this works
- `npm run dev` actually runs 2 commands concurrntly: `npm run frontend` and `npm run backend`
- `npm run frontend` is simply an alias for `next dev`command
- `npm run backend` runs `backend/setup_backend.sh` that does the following:
  - create python virtual env inside `/backend` folder
  - activate the virtual env
  - install python packages from requirements.txt
  - run fastapi

# what's in .env
- frontend .env contains the following
  - NEXT_PUBLIC_HOST
    - a url of where this application is hosted. Used when making api calls. ie) http://localhost:3000 for localhost env
- backend .env contains the following
  - SESSION_SECRET_KEY
    - a key used to validate session
  - GOOGLE_CLIENT_ID
  - GOOGLE_CLIENT_SECRET
  - HOST
    - a url of where this application is hosted. Used when redirecting requests. should be same as frontend NEXT_PUBLIC_HOST. ie) http://localhost:3000 for localhost
