# Tab-Manager

## Overview

**Tab-Manager** is a Chrome extension aimed at reducing tab clutter for developers and digital workers. It allows users to manage duplicate and unused tabs and close them based on user-defined time limits. This extension is currently under development as part of a collaborative project.

## Features

- Automatically detect and close duplicate or unused tabs.
- Customizable time limit to determine when to close inactive tabs.
- Set important tabs as immune from closure.
- Notify users before closing tabs.

## File Structure

```plaintext
Tab-Manager/
│
├── icons/                          # Folder for custom icons
│
├── popup/                          # Popup displayed when the extension icon is clicked (Home page)
│
├── scripts/                        # Folder for JavaScript logic
│
├── styles/                         # Folder for shared styles
│   └── common.css                  # Common styles across popup and options page
│
├── manifest.json                   # Chrome extension manifest file
├── README.md                       # Project README file
└── .gitignore                      # Gitignore file to exclude unnecessary files (e.g., node_modules)
```

## Development Guidelines

### Branching Strategy

- Each team member should create a branch named after their GitHub username (e.g., `joseph`).
- Work on individual features or fixes on your branch and submit a pull request to the `dev` branch.
- All pull requests to `dev` must be reviewed and approved by every team member before being merged.

### Pull Request Process

1. Create a pull request from your branch to the `dev` branch.
2. Ensure you explain your changes thoroughly in the pull request description.
3. All team members must review, approve, and test the changes before the merge.
4. After merging into `dev`, the team will run a final test before merging into the `main` branch.

### Testing

- Everyone must test any changes merged into the `dev` and `main` branches.
- Report any issues found either through GitHub comments or in the team’s WhatsApp group.
- If issues are found, create a new issue on GitHub and assign it to the appropriate person.

## Getting Started

To get started with this project:

1. **Clone the Repository**  
   Run the following command in your terminal:
   ```bash
   git clone https://github.com/your-username/repo-name.git
