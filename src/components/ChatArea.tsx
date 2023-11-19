import { Message } from "../App";

function ChatArea(props: { conversation: Array<Message> }) {
  return (
    <div>
      {props.conversation.map((e, key) => {
        return (<div key={key}>{e.content}</div>);
      })}
    </div>
  );
}

export default ChatArea;
