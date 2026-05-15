---
name: git-commit
description: Git commit workflow using a commit message file. Use when the user needs to create a git commit, especially when the commit message must include both a summary and detailed body following conventional commit standards.
---

# Git Commit

Guide Kimi through creating standardized git commits by writing to `.git/COMMIT_EDITMSG` and committing with that file.

## Commit Message Format

The commit message file must follow this structure:

```
<type>(<scope>): <summary>

<body>
```

- **Summary**: Imperative mood, under 50 characters, no period.
- **Blank line**: Required between summary and body.
- **Body**: Detailed explanation of what and why, wrapped at 72 characters per line.

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

## Workflow

1. **Review changes** in the working directory. If there are multiple
   unrelated changes, stage and commit them separately rather than
   lumping everything into a single commit.
2. **Stage changes** if needed: `git add <files>`
3. **Draft message** in `.git/COMMIT_EDITMSG`:
   - Write the summary line.
   - Add a blank line.
   - Write the body paragraphs.
4. **Commit using the file**: `git commit -F .git/COMMIT_EDITMSG`
5. **Verify**: `git log -1 --format=fuller`

## Rules

- Never use `git commit -m` when a body is required.
- If the user did not specify a type, infer the best fit or ask.
- Ensure the file path is `.git/COMMIT_EDITMSG` so Git recognizes it as the standard edit message file.
- When the working directory contains unrelated changes, split them into
  separate commits. Each commit should represent a single logical change.
