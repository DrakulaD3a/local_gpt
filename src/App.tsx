import ChatArea from "./components/ChatArea";
import PromptArea from "./components/PromptArea";

function App() {
  return (
    <div className="flex flex-col bg-gray-800 w-screen h-screen">
      <ChatArea />
      <PromptArea />
    </div>
  );
}

export default App;
