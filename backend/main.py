import os
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow CORS for local frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Example: Proxy to Azure DevOps Builds API
@app.get("/api/builds")
def get_builds(org: str = Query(...), project: str = Query(...), pipeline: int = Query(...)):
    pat_token = os.getenv("PAT_TOKEN")
    if not pat_token:
        return {"error": "PAT_TOKEN not set in .env"}
    url = f"https://dev.azure.com/{org}/{project}/_apis/build/builds?definitions={pipeline}&$top=50&resultFilter=succeeded&queryOrder=finishTimeDescending&api-version=7.1"
    headers = {
        "Authorization": f"Basic {os.getenv('AZURE_BASIC_AUTH', '') or _make_basic_auth(pat_token)}"
    }
    resp = requests.get(url, headers=headers)
    return resp.json()

def _make_basic_auth(pat_token):
    import base64
    return base64.b64encode(f':{pat_token}'.encode()).decode()

# Add more endpoints for other projects as needed
