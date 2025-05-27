mod models;
pub mod repository;

pub use models::*;
pub use repository::Repository;

use anyhow::Result;
use sqlx::{sqlite::SqlitePoolOptions, SqlitePool};
use std::path::Path;
use tauri::async_trait;

const DB_URL: &str = "sqlite:data.db";

#[derive(Debug, thiserror::Error)]
pub enum DbError {
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),
    #[error("Migration error: {0}")]
    Migration(#[from] sqlx::migrate::MigrateError),
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

pub type DbResult<T> = Result<T, DbError>;

#[async_trait]
pub trait Database: Send + Sync + 'static {
    async fn get_pool(&self) -> &SqlitePool;
}

#[derive(Clone)]
pub struct DatabaseImpl {
    pool: SqlitePool,
}

impl DatabaseImpl {
    pub async fn new() -> DbResult<Self> {
        let db_path = Path::new("data");
        if !db_path.exists() {
            std::fs::create_dir_all(db_path)?;
        }

        let pool = SqlitePoolOptions::new()
            .max_connections(5)
            .connect_with(
                sqlx::sqlite::SqliteConnectOptions::new()
                    .filename("data/madjik.db")
                    .create_if_missing(true)
                    .foreign_keys(true)
                    .journal_mode(sqlx::sqlite::SqliteJournalMode::Wal)
                    .synchronous(sqlx::sqlite::SqliteSynchronous::Normal),
            )
            .await?;

        // Run migrations
        sqlx::migrate!("./migrations")
            .run(&pool)
            .await?;

        Ok(Self { pool })
    }
}

#[async_trait]
impl Database for DatabaseImpl {
    async fn get_pool(&self) -> &SqlitePool {
        &self.pool
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::SqlitePool;
    use std::fs;

    async fn create_test_db() -> SqlitePool {
        let pool = SqlitePool::connect("sqlite::memory:")
            .await
            .expect("Failed to create test database");

        sqlx::migrate!("./migrations")
            .run(&pool)
            .await
            .expect("Failed to run migrations");

        pool
    }

    #[tokio::test]
    async fn test_database_connection() {
        let pool = create_test_db().await;

        let result: (i64,) = sqlx::query_as("SELECT 1")
            .fetch_one(&pool)
            .await
            .expect("Failed to execute query");

        assert_eq!(result.0, 1);
    }
}
