import { useState } from "react";
import { Message } from "../App";

function PromptArea(props: {
  conversation: Array<Message>;
  setConversation: Function;
}) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="w-full p-8">
      <form
        className="flex flex-row gap-4 w-full justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          props.setConversation([
            ...props.conversation,
            { content: prompt, isUser: true },
          ]);
          setPrompt("");
        }}
      >
        <input
          type="text"
          name="prompt"
          id="prompt"
          placeholder="Enter your prompt: "
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default PromptArea;
