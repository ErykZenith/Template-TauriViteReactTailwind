use tauri::command;

#[command]
pub fn hi_rust() -> String  {
    println!("Hi JS");
    "Rust says hi".to_string()
}