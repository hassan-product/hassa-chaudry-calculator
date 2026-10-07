# Calculator

[![CI](https://github.com/hassan-product/hassa-chaudry-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/hassan-product/hassa-chaudry-calculator/actions/workflows/ci.yml)

A four-function calculator you can trust with money. It is exact where possible, marks a number with ≈ where it is not, and keeps a tape that shows the working.

**Status:** built and running, with automated tests passing. Every story in `docs/user-stories.md` is still marked Not implemented: the VoiceOver check has not been done yet, and a story is marked Implemented only after it.

## Tape and memory

The tape is the record of every finished calculation, so you can see where a number came from and bring any result back. Memory holds one running total you are building, such as the totals of three invoices added with M+ and read back with MR. Every memory change is also written on the tape, so nothing is hidden.

## Run it

Requires Node 20.19 or later, or 22.12 or later (`.nvmrc` pins 20).

The quickest way is to double-click `start.command` on a Mac or `start.bat` on Windows. Each checks for Node, installs dependencies on the first run, starts the app and opens it in your browser.

Or from a terminal:

```sh
npm install
npm run dev    # then open the address it prints, usually http://localhost:5173/
npm test       # the automated tests, fitness functions included; CI runs these and the build
```
