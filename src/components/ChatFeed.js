import LoginForm from "./LoginForm";
import MessageForm from "./MessageForm";
import MyMessge from "./MyMessge";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, isMyMessage) => {
    return chat.people.map((person, index) => person.last_read === message.id && (
      person.last_read === message.id && (
        <div
          key={`read_${index}`}
          className="read-receipt"
          style={{
            float: isMyMessage ? "right" : "left",
            backgroundImage: `url(${message?.sender?.avatar})`,
          }}
        />
      )
    ));
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessge message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-reciepts"
            style={{
              marginLeft: isMyMessage ? "0px" : "68px",
              marginRight: isMyMessage ? "18px" : "0px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  const handleRemove = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('password')

    window.location.reload()

    return <LoginForm/>
  }

  if (!chat) return "Loading....";

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => `${person.person.username}. `)}
        </div>

        <button type="button" onClick={handleRemove}style={{backgroundColor: '#e74c3c', color: '#fff', padding: '5px 10px', border: 'none', borderRadius : '5px', marginTop: '5px', cursor: 'pointer'}}>Log Out</button>
      </div>
      {renderMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
