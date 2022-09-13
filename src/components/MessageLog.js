const MessageLog = ({ selectedPost }) => {
    if (selectedPost.messages.length === 0) {
        return <></>
    }
    return (
        <div className="MessageLog">
            <h3>Message Log</h3>
            {selectedPost.messages.map((inbox) => {
                return (
                    <div key={inbox._id}>
                        <p>{inbox.content}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageLog;