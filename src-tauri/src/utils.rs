use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct WithId<T> {
    pub id: i64,
    #[serde(flatten)]
    pub inner: T,
}
