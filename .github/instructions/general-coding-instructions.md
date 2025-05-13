---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Implement proper error boundaries in React components
- Always log errors with contextual information

## Package Management
- Always use pnpm instead of npm or yarn
- Run `pnpm install` for package installation
- Use `pnpm` for all script commands

## Testing Frameworks
- Use Vitest and Playwright as the standard testing frameworks
- Do NOT use Jest (Jestの利用は禁止)
- テスト記述・実行はVitest/Playwrightに統一すること
- **ただし、React Nativeテンプレート（mobile-copilot等）に限りJestの利用を許容する**
