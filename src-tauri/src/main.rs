// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use ollama_rs::generation::completion::request::GenerationRequest;
use ollama_rs::Ollama;

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
        .invoke_handler(tauri::generate_handler![get_response])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
