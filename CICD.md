# CI/CD Pipeline Documentation

## Overview
This documentation outlines the configuration of a Continuous Integration and Continuous Deployment (CI/CD) pipeline using GitHub Actions. This pipeline is designed to ensure reliable code integration and deployment to a DigitalOcean Droplet, automating testing and deployment processes.

## Pipeline Configuration

### Trigger Events
The pipeline is triggered by:
- **Push events** on the `main` branch.
- **Manual triggers** via `workflow_dispatch`.

### Steps
1. **Checkout Code**:
   - Uses the `actions/checkout@v2` action to clone the repository.

2. **Set Up Python**:
   - Uses the `actions/setup-python@v2` action to configure Python `3.10.x`.

3. **Install Dependencies**:
   - Upgrades `pip` and installs the Python dependencies listed in `server/requirements.txt`.

4. **Run Tests**:
   - Executes `pytest` within the `server` directory to validate code quality and functionality.

5. **Set Up SSH**:
   - Utilizes the `webfactory/ssh-agent@v0.5.3` action to configure an SSH agent with the private key stored in GitHub secrets.

6. **Deploy to DigitalOcean Droplet**:
   - Performs the following tasks on the server via SSH:
     - Navigates to the project directory.
     - Ensures the latest code is pulled from the `main` branch.
     - Builds and starts updated Docker containers.

## Benefits of This Pipeline

### 1. **Automated Testing**
- Ensures code reliability by running `pytest` after every push to the `main` branch.
- Identifies bugs early in the development cycle.

### 2. **Efficient Deployment**
- Automates deployment to the production server, reducing manual effort and potential errors.

### 3. **Improved Security**
- Uses GitHub secrets to securely store sensitive credentials like the SSH private key, API keys, and server details.
- Restricts deployments to authorized personnel through branch protection.

### 4. **Consistency**
- Ensures that all deployments follow the same process, reducing variability and increasing reliability.

### 5. **Ease of Use**
- Supports manual deployment triggers through `workflow_dispatch`, providing flexibility for emergency patches or out-of-band updates.

## Best Practices
- Ensure all secrets are up-to-date and stored securely in GitHub Secrets.
- Regularly review and update dependencies in `requirements.txt`.
- Test pipeline changes in a staging environment before applying them to production.

## Troubleshooting
- **Pipeline Fails During Tests**:
  - Check the `pytest` logs for errors.
  - Ensure all necessary dependencies are listed in `requirements.txt`.

- **Deployment Fails**:
  - Verify the SSH private key and server details in GitHub Secrets.
  - Check server logs for errors during the `docker-compose` process.

