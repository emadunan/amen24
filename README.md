# Amen24
Amen24 is a free non-profitable project to introduce bible content for all.

## Run bible database scripts
```bash
npx tsc createBibleDb.ts --resolveJsonModule --esModuleInterop # Compile the script to JS
node createBibleDb.js # Run the migration program
```

## Amen24 project structure
/backend # NestJS backend (API)
/frontend # Next.js frontend (website)
/mobile # React Native mobile app
/shared # Shared code (types, utilities, etc.)
/scripts # Scripts for deployment, build, etc.
/docker # Docker configuration files (if using Docker)
/README.md # Project overview and documentation
/package.json # Root-level package file (for shared tools or workspaces)
/tsconfig.json # Root-level TypeScript configuration (if using workspaces)
