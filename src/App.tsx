import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import ChatArea from "./components/ChatArea";
import PromptArea from "./components/PromptArea";
import Database from "tauri-plugin-sql-api";

const db = await Database.load("sqlite:main.db");

export interface Message {
  content: string;
  isUser: boolean;
}

function App() {
  const [conversation, setConversation] = useState(new Array<Message>());

  async function getResponse(prompt: string) {
    const response: string = await invoke("get_response", { prompt: prompt });
    return response;
  };

  useEffect(() => {
    const handleUpdate = async () => {
      if (conversation.length > 0) {
        if (conversation[conversation.length - 1].isUser) {
          const response = await getResponse(conversation[conversation.length - 1].content);
          setConversation([...conversation, { content: response, isUser: false }]);
          await db.execute("INSERT INTO conversation (content, is_user) VALUES (?, ?)", [response, false]);
          console.log(await db.select("SELECT * FROM conversation"));
        }
      }
    }

    handleUpdate();
  }, [conversation]);

  return (
    <div className="flex flex-col bg-gray-800 w-screen h-screen">
      <ChatArea conversation={conversation} />
      <PromptArea conversation={conversation} setConversation={setConversation} />
    </div>
  );
}

export default App;
