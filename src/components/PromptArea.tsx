import { invoke } from "@tauri-apps/api";
import { useState } from "react";

function PromptArea() {
  const [prompt, setPrompt] = useState("");

  function handleSubmit() {
    invoke("get_response", { prompt: prompt }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="w-full p-8">
      <form className="flex flex-row gap-4 w-full justify-center" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        setPrompt("");
      }}>
        <input type="text" name="prompt" id="prompt" placeholder="Enter your prompt: " onChange={(e) => setPrompt(e.target.value)} value={prompt} />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default PromptArea;
