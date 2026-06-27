flowchart TD
A["Start"] --> B["Load dotenv/config"]
B --> C["Import defineConfig from prisma/config"]
C --> D["Read process.env['DATABASE_URL']"]
D --> E{"DATABASE_URL defined?"}
E -->|Yes| F["Use DATABASE_URL as datasource.url"]
E -->|No| G["Set datasource.url to undefined"]
F --> H["Build Prisma config object"]
G --> H["Build Prisma config object"]
H --> I["Set schema: prisma/schema.prisma"]
H --> J["Set migrations.path: prisma/migrations"]
H --> K["Set migrations.seed: tsx prisma/seed.ts"]
H --> L["Export default defineConfig(...)"]
