#  INDEVELOPMENT 

# SecureVault Pro – Password Strength Web App

A full-stack application for analyzing password strength, performing hash analysis, encoding/decoding, encryption/decryption, and providing security tips.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Local Development](#local-development)
- [GitHub Workflow](#github-workflow)
- [Netlify Deployment](#netlify-deployment)
- [Additional Notes](#additional-notes)

---

## Project Structure

```
password-strength-web/
│
├── backend/          # Python backend (API server)
│   └── ...           # Backend code and dependencies
│
├── frontend/         # React frontend
│   └── ...           # React components, assets, etc.
│
├── netlify.toml      # Netlify deployment config (optional)
├── README.md         # Project documentation
└── ...               # Other root-level files
```

---

## Backend Setup

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the backend server:**
   ```bash
   python app.py
   ```
   (Replace `app.py` with your main backend file if different.)

5. **API Endpoints:**
   - The backend should expose endpoints for password analysis, hash analysis, encoding/decoding, encryption/decryption, etc.
   - By default, it runs on `http://localhost:5000` (or as configured).

---

## Frontend Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   - By default, this runs at `http://localhost:3000`.

4. **Configuration:**
   - **API Base URL Configuration:** The frontend can be configured to connect to different backend environments using the `REACT_APP_API_BASE_URL` environment variable.
   
   - **For Development (Default):**
     The app defaults to `http://localhost:5000` if no environment variable is set.
   
   - **For Production or Custom Backend:**
     1. Copy the environment template:
        ```bash
        cp .env.example .env
        ```
     2. Edit `.env` and set your backend URL:
        ```
        REACT_APP_API_BASE_URL=https://your-backend-domain.com
        ```
     3. Restart the development server to apply changes:
        ```bash
        npm start
        ```
   
   - **Environment-Specific Configuration Examples:**
     ```bash
     # Development
     REACT_APP_API_BASE_URL=http://localhost:5000
     
     # Staging
     REACT_APP_API_BASE_URL=https://staging-api.yourdomain.com
     
     # Production  
     REACT_APP_API_BASE_URL=https://api.yourdomain.com
     ```

---

## API Base URL Configuration

The SecureVault Pro frontend is designed to work with different backend environments through centralized API configuration.

### Environment Variable Setup

The frontend uses the `REACT_APP_API_BASE_URL` environment variable to determine which backend to connect to:

1. **Create environment file:**
   ```bash
   cd frontend
   cp .env.example .env
   ```

2. **Configure your backend URL:**
   ```bash
   # .env file
   REACT_APP_API_BASE_URL=https://your-backend-url.com
   ```

3. **Restart development server:**
   ```bash
   npm start
   ```

### Default Behavior

- **No environment variable set:** Defaults to `http://localhost:5000`
- **Environment variable set:** Uses the specified URL

### Deployment Configuration

**For Netlify:**
1. Go to Site Settings > Environment Variables
2. Add `REACT_APP_API_BASE_URL` with your backend URL
3. Trigger a new deploy

**For Vercel:**
1. Go to Project Settings > Environment Variables  
2. Add `REACT_APP_API_BASE_URL` with your backend URL
3. Redeploy your project

**For other platforms:**
Set the `REACT_APP_API_BASE_URL` environment variable according to your platform's documentation.

### Important Notes

- Environment variables are embedded at **build time**, not runtime
- Always rebuild/redeploy after changing the API base URL
- The variable must start with `REACT_APP_` to be accessible in React

---

## Local Development

- **Start the backend first**, then the frontend.  
- The frontend will make requests to the backend API.
- If required, set up a proxy in `frontend/package.json`:
  ```json
  "proxy": "http://localhost:5000"
  ```

---

## GitHub Workflow

- **Clone the repository:**
  ```bash
  git clone https://github.com/Durgesh2202/password-strength-web.git
  ```

- **Branches:**  
  - Use feature branches (e.g., `feature/frontend-ui`, `feature/api-endpoints`) for new work.
  - Submit Pull Requests for code reviews and merges.

- **Issues:**  
  - Track bugs, enhancements, and tasks via GitHub Issues.

- **Commits:**  
  - Write clear, descriptive commit messages.

---

## Netlify Deployment

**Deploying the React frontend on Netlify:**

1. **Set build settings in Netlify:**
   - **Base directory:**  
     Leave empty (or set to `frontend` if you use `netlify.toml`)
   - **Build command:**  
     `cd frontend && npm run build`
   - **Publish directory:**  
     `frontend/build`

   _OR use a `netlify.toml` file:_
   ```toml
   [build]
   base = "frontend"
   command = "npm run build"
   publish = "build"
   ```

2. **Connect your GitHub repository to Netlify.**
3. **Trigger a deploy.**
4. **Your live site will be available at your Netlify URL.**

---

## Additional Notes

- **Backend Hosting:**  
  - To make the backend API accessible for production, deploy to a cloud provider (Heroku, AWS, Render, etc.).
  - Update the frontend API base URL for production by setting the `REACT_APP_API_BASE_URL` environment variable in your deployment platform.
  
- **API Base URL Configuration:**
  - **Development:** Uses `http://localhost:5000` by default
  - **Production:** Set `REACT_APP_API_BASE_URL` environment variable to your backend URL
  - **Build Time:** The API URL is embedded at build time, so rebuild after changing the environment variable
  - **Deployment Platforms:** 
    - **Netlify:** Set environment variable in Site Settings > Environment Variables
    - **Vercel:** Set environment variable in Project Settings > Environment Variables  
    - **GitHub Pages:** Use repository secrets for GitHub Actions builds

- **Environment Variables:**  
  - Store sensitive keys in `.env` files (never commit them to GitHub).

- **Security:**  
  - Always validate and sanitize user inputs.
  - Use HTTPS for production deployments.

- **Contributions:**  
  - Open to pull requests and issues!
  - Please follow the code style guides and review process.

---

## License

MIT (or specify your license here)

---

## Contact

For questions or support, open an issue or reach out via GitHub.
