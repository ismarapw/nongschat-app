function selectChatList (userId) {
    // if you are using postgresql use "createdAt" becasue postgresql auto convert column names to lowercase if you dont use double quotes
    // if you are using mysql you don't need to do that, instead you will get syntax error.
    return (
        `SELECT 
        m.sender_id, 
        m.receiver_id, 
        m.content, 
        latest_msgs.latest_time, 
        latest_msgs.total_unread, 
        users.id as other_user_id, 
        users.username,
        users.image
        FROM messages m
        JOIN (
        SELECT 
            CASE 
                WHEN sender_id = ${userId} THEN receiver_id
                ELSE sender_id
            END AS other_id,
            MAX(id) AS latest_message_id,
            MAX(createdAt) AS latest_time,
            COUNT(IF(read_status = 'no', 1, NULL)) as total_unread
        FROM messages
        WHERE sender_id = ${userId} OR receiver_id = ${userId}
        GROUP BY other_id
        ) latest_msgs
        ON (m.sender_id = latest_msgs.other_id OR m.receiver_id = latest_msgs.other_id)
        AND m.createdAt = latest_msgs.latest_time AND m.id = latest_msgs.latest_message_id
        JOIN users
        ON users.id = latest_msgs.other_id 
        ORDER BY latest_msgs.latest_time DESC;`
    )
}

module.exports = selectChatList;