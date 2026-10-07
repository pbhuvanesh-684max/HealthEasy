import os
import base64
import json
import requests

GITHUB_USER = "Bhuvanesh84x"
REPO_NAME = "patient-management"
PROJECT_DIR = r"C:\Users\Bhuvanesh\OneDrive\Desktop\patient management"

print("==================================================================")
print(f"  GitHub Repository Publisher for {GITHUB_USER}/{REPO_NAME}")
print("==================================================================")

def upload_file_to_github(filepath, rel_path, token):
    url = f"https://api.github.com/repos/{GITHUB_USER}/{REPO_NAME}/contents/{rel_path}"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }

    with open(filepath, "rb") as f:
        content_bytes = f.read()

    b64_content = base64.b64encode(content_bytes).decode("utf-8")

    # Check if file exists to get SHA for update
    get_resp = requests.get(url, headers=headers)
    sha = get_resp.json().get("sha") if get_resp.status_code == 200 else None

    payload = {
        "message": f"Add/Update {rel_path} in patient-management repository",
        "content": b64_content
    }
    if sha:
        payload["sha"] = sha

    put_resp = requests.put(url, headers=headers, json=payload)
    if put_resp.status_code in [200, 201]:
        print(f"  ✓ Uploaded: {rel_path}")
    else:
        print(f"  ❌ Error uploading {rel_path}: {put_resp.status_code} - {put_resp.text}")

def main():
    token = os.environ.get("GITHUB_TOKEN", "")
    if not token:
        print("\n[!] GITHUB_TOKEN environment variable not found.")
        print(f"    Please provide a GitHub Personal Access Token to push directly to https://github.com/{GITHUB_USER}/{REPO_NAME}\n")
        return

    # Create Repo if not exists
    create_repo_url = "https://api.github.com/user/repos"
    headers = {"Authorization": f"token {token}", "Accept": "application/vnd.github.v3+json"}
    repo_payload = {"name": REPO_NAME, "description": "Patient Management Web Application with yellowish-white theme and automated WhatsApp delivery", "private": False}
    requests.post(create_repo_url, headers=headers, json=repo_payload)

    # Walk directory and upload files
    for root, dirs, files in os.walk(PROJECT_DIR):
        for file in files:
            if file.startswith(".") or file.endswith(".pyc") or file in ["github_uploader.py"]:
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, PROJECT_DIR).replace("\\", "/")
            upload_file_to_github(full_path, rel_path, token)

if __name__ == "__main__":
    main()
