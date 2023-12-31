// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use ollama_rs::generation::completion::request::GenerationRequest;
use ollama_rs::Ollama;
use tauri_plugin_sql::{Migration, MigrationKind};

#[tauri::command]
async fn get_response(prompt: String) -> Result<String, String> {
    let ollama = Ollama::default();
    let model = "llama2".to_string();
    let res = ollama.generate(GenerationRequest::new(model, prompt)).await;

    if let Ok(response) = res {
        Ok(response.response)
    } else {
        Err(res.unwrap_err().to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:main.db",
                    vec![Migration {
                        version: 1,
                        description: "First migration",
                        sql: include_str!("../migrations/v1.sql"),
                        kind: MigrationKind::Up,
                    }],
                )
                .build(),
        )
        .invoke_handler(tauri::generate_handler![get_response])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
