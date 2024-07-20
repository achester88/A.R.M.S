// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use std::fs;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
          let splashscreen_window = app.get_window("splashscreen").unwrap();
          let main_window = app.get_window("main").unwrap();
          // we perform the initialization code on a new task so the app doesn't freeze
          let dir = app.path_resolver().app_data_dir().expect("couldn't resolve app data dir");
          tauri::async_runtime::spawn(async move {
            // initialize your app here instead of sleeping :)
            println!("Initializing...");
            std::thread::sleep(std::time::Duration::from_secs(2));
            println!("{:?}", dir);
            match fs::read_to_string(dir.join("/config.json")) {
                Ok(val) => {
                   println!("config: {:?}", val);
                },
                Err(_) => {
                    match fs::write(dir.join("/config.json"), b"Lorem ipsum") {
                        Err(mes) => println!("ERROR: {:?}", mes),
                        _ => {}
                        }
                }
            }
            println!("Done initializing.");

            // After it's done, close the splashscreen and display the main window
            splashscreen_window.close().unwrap();
            main_window.show().unwrap();
          });
          Ok(())
     })
    .plugin(tauri_plugin_sql::Builder::default().build())
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
