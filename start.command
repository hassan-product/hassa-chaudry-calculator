#!/bin/bash
# Double-click to run the calculator on a Mac.
# It checks for Node, installs this project's dependencies on the first run, then starts the app
# and opens it in your browser. It signs in to nothing and sends nothing anywhere.

cd "$(dirname "$0")" || exit 1

fail() {
  echo
  echo "$1"
  echo
  read -r -p "Press Return to close this window." _
  exit 1
}

if ! command -v node >/dev/null 2>&1; then
  fail "Node.js is not installed. Install Node 20.19 or later from https://nodejs.org, then double-click start.command again."
fi

# The same range as "engines" in package.json: 20.19 or later in 20, or 22.12 and up.
if ! node -e 'const [a, b] = process.versions.node.split(".").map(Number); process.exit((a === 20 && b >= 19) || (a === 22 && b >= 12) || a > 22 ? 0 : 1)'; then
  fail "This needs Node 20.19 or later (or 22.12 or later). This Mac has Node $(node --version). Install a newer one from https://nodejs.org, then try again."
fi

if [ ! -d node_modules ]; then
  echo "First run: installing dependencies. This takes a minute and only happens once."
  npm install || fail "Installing dependencies failed. Check the messages above."
fi

echo "Starting the calculator. It opens in your browser; close this window to stop it."
exec npm run dev -- --open
