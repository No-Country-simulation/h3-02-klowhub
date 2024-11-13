import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
  Husky must run in the root where the ".git" is, if your project is not in the root you must move to the root for it to work (But the .husky will be created inside the project).
  Example:
  execSync('cd <root> && npx husky <project-path>/.husky', { stdio: 'inherit' });

  Also make sure that the hooks are executed inside the project and not outside. Before executing the hook command, move inside the project folder
  Example:
  cd <project-path>
  npx lint-staged
  */

try {
  // Initialize Husky
  execSync('cd .. && npx husky client/.husky', { stdio: 'inherit' });

  // Create .husky directory if it doesn't exist
  const huskyDir = path.join(__dirname, '.husky');
  if (!fs.existsSync(huskyDir)) {
    fs.mkdirSync(huskyDir);
  }

  // Create commit-msg hook for Commitlint
  const commitMsgPath = path.join(huskyDir, 'commit-msg');
  const commitMsgHook = `set +e
if [ ! -d "client" ]; then
  echo "Not found client skip commit-msg for client."
  exit 0
fi

if ! git diff --cached --name-only | grep -q '^client/'; then
  echo "No changes in client, skipping commit-msg for client."
  exit 0
fi

cd client

npx --no -- commitlint --edit || { echo -e "$(tput setaf 1)❌The commit message does not meet the requirements. Look at "commitlint.config.js" file.$(tput sgr0)"; exit 1; }`;
  fs.writeFileSync(commitMsgPath, commitMsgHook);

  // Create pre-commit hook
  const preCommitPath = path.join(huskyDir, 'pre-commit');
  const preCommitHook = `set +e
if [ ! -d "client" ]; then
  echo "Not found client skip pre-commit for client."
  exit 0
fi

if ! git diff --cached --name-only | grep -q '^client/'; then
  echo "No changes in client, skipping pre-commit for client."
  exit 0
fi

cd client

npx --no lint-staged || { echo -e "$(tput setaf 1)❌There is a bug in Eslint or Prettier, you cannot commit with these errors.$(tput sgr0)"; exit 1; }`;
  fs.writeFileSync(preCommitPath, preCommitHook);

  // Create pre-push hook
/*  const prePushPath = path.join(huskyDir, 'pre-push');
  const prePushHook = `set +e
npx tsc || { echo -e "$(tput setaf 1)❌Type checking failed. Push aborted.$(tput sgr0)"; exit 1; }
npx vitest run --passWithNoTests || { echo -e "$(tput setaf 1)❌Tests failed. Push aborted.$(tput sgr0)"; exit 1; }`;
  fs.writeFileSync(prePushPath, prePushHook);*/

  // Make hooks executable
  if (process.platform !== 'win32') {
    execSync(`chmod +x ${commitMsgPath}`, { stdio: 'inherit' });
    execSync(`chmod +x ${preCommitPath}`, { stdio: 'inherit' });
    //execSync(`chmod +x ${prePushPath}`, { stdio: 'inherit' });
  }

  console.log('Husky has been set up with a commit-msg, pre-commit and pre-push hook');
} catch (error) {
  console.error('Error setting up Husky:', error);
  process.exit(1);
}
