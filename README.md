# Madjik

## Generate Kysely Database Types

To generate and update Kysely database types, follow these steps:

### 1. Start the Application

Run the app once to trigger database creation and migrations:

```sh
pnpm tauri dev
```

This will generate the SQLite database file and apply necessary migrations. Once completed, you can close the app.

### 2. Set Up the Environment Variable

Create a `.env` file in the project root and define the `DATABASE_URL` using the appropriate path for your operating system."

```sh
# Linux
DATABASE_URL='/home/<USERNAME>/.config/com.madjik.app/madjik.db'

# macOS
DATABASE_URL='/Users/<USERNAME>/Library/Application Support/com.madjik.app/madjik.db'

# Windows
DATABASE_URL='C:\Users\<USERNAME>\AppData\Roaming\com.madjik.app\madjik.db'
```

> **Note:** Replace `<USERNAME>` with your actual system username.

### 3. Generate the Types

With the database and environment variable set, run:

```sh
pnpm db:typegen
```

This command will generate the type definitions used by Kysely.
