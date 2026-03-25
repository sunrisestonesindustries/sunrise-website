# AWS Elastic Beanstalk Deployment

This project is prepared to deploy as a single Python application on AWS Elastic Beanstalk.

## What this setup does

- Runs Flask with `gunicorn`
- Serves the React production build from Flask
- Keeps frontend routes and `/api/*` routes on the same domain

## Before packaging

1. Build the frontend:

```bash
cd frontend
npm install
npm run build
```

2. Keep production secrets in Elastic Beanstalk environment properties:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `QUOTE_TO_EMAIL`

## Files used by Elastic Beanstalk

- `application.py`
- `requirements.txt`
- `Procfile`

## Deploy outline

1. In AWS, create a new Elastic Beanstalk application.
2. Choose the Python platform.
3. Zip the repository contents after building the frontend.
4. Upload the zip as the application source bundle.
5. In the Elastic Beanstalk environment, add the SMTP environment variables.

## Important

- Do not rely on `backend/.env` in production. Use Elastic Beanstalk environment properties instead.
- Rebuild the frontend each time you deploy frontend changes.
