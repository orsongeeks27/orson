const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "user.json");

let users = [];


const loadUsers = () => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        users = JSON.parse(data);
        console.log("Users loaded successfully.");
    } catch (err) {
        console.error("Error loading users:", err);
        users = []; 
    }
};


const saveUsers = () => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        console.log("Users saved successfully.");
    } catch (err) {
        console.error("Error saving users:", err);
    }
};

loadUsers();

const fetchUserDiscussions = (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user.discussions);
};

const getDiscussion = (req, res) => {
    const { id, discussionid } = req.params;
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const discussion = user.discussions.find((d) => d.discussionId === parseInt(discussionid));

    if (!discussion) {
        return res.status(404).json({ message: "No discussion" });
    }

    let mentionedContent = [];
    let mentions = discussion.mentions;

    while (mentions?.length) {
        for (const mention of mentions) {
            if (mention.postId) {
                const mentionedUser = users.find((u) => u.username === mention.username);
                if (mentionedUser) {
                    const post = mentionedUser.posts.find((p) => p.postId === parseInt(mention.postId));
                    if (post) {
                        mentionedContent.push(post);
                    }
                }
            } else if (mention.discussionId) {
                const mentionedUser = users.find((u) => u.username === mention.username);
                if (mentionedUser) {
                    const mentionedDiscussion = mentionedUser.discussions.find(
                        (d) => d.discussionId === parseInt(mention.discussionId)
                    );
                    if (mentionedDiscussion) {
                        mentionedContent.push(mentionedDiscussion);
                    }
                }
            }
        }
        break;
    }

    res.json({
        title: discussion.title,
        content: discussion.content,
        mentionedContent
    });
};

const createNewDiscussion = (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const { title, content, mentions } = req.body;
    
    const newDiscussionId = user.discussions.length
        ? Math.max(...user.discussions.map((d) => d.discussionId)) + 1
        : 1;

    let mentionedContent = [];

    if (mentions?.length) {
        for (const mention of mentions) {
            if (mention.postId) {
                const mentionedUser = users.find((u) => u.username === mention.username);
                if (mentionedUser) {
                    const post = mentionedUser.posts.find((p) => p.postId === parseInt(mention.postId));
                    if (post) {
                        mentionedContent.push(post);
                    }
                }
            } else if (mention.discussionId) {
                const mentionedUser = users.find((u) => u.username === mention.username);
                if (mentionedUser) {
                    const mentionedDiscussion = mentionedUser.discussions.find(
                        (d) => d.discussionId === parseInt(mention.discussionId)
                    );
                    if (mentionedDiscussion) {
                        mentionedContent.push(mentionedDiscussion);
                    }
                }
            }
        }
    }

    const newDiscussion = {
        discussionId: newDiscussionId,
        title,
        content,
        mentions: mentions || []
    };

    user.discussions.push(newDiscussion);
    saveUsers();

    res.status(201).json({
        message: "Discussion created successfully",
        discussion: newDiscussion,
        mentionedContent
    });
};

const deleteDiscussion = (req, res) => {
    const { id, discussionid } = req.params;
    const user = users.find((user) => user.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const discussionIndex = user.discussions.findIndex(
        (d) => d.discussionId === parseInt(discussionid)
    );

    if (discussionIndex === -1) {
        return res.status(404).json({ message: "Discussion not found" });
    }

    user.discussions.splice(discussionIndex, 1);
    saveUsers();

    res.json({ message: "Discussion deleted successfully" });
};

module.exports = { fetchUserDiscussions, getDiscussion, createNewDiscussion, deleteDiscussion };
