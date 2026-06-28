export default {
  "apps/web/**/*.{js,jsx,ts,tsx}": ["eslint --fix"],
  "apps/web/**/*.{ts,tsx}": () => "pnpm --filter web run typecheck",
};
