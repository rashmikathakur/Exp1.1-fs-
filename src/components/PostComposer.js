import React, { useState } from "react";
import "./PostComposer.css";

const platforms = {
  Twitter: {
    limit: 280,
    rule: "Maximum 280 characters. Keep posts concise."
  },
  Instagram: {
    limit: 2200,
    rule: "Supports hashtags and emojis."
  },
  LinkedIn: {
    limit: 3000,
    rule: "Professional content with longer descriptions."
  }
};

function PostComposer() {
  const [platform, setPlatform] = useState("Twitter");
  const [post, setPost] = useState("");

  const [connected, setConnected] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const maxChars = platforms[platform].limit;
  const count = post.length;
  const remaining = maxChars - count;

  const exceeded = remaining < 0;
  const warning = remaining <= 20 && remaining >= 0;

  const connectAccount = () => {
  setConnected(true);
};

const publishPost = () => {

  if (post.trim() === "") {
    alert("Please write a post first.");
    return;
  }

  if (!connected) {
    alert("Please connect your account first.");
    return;
  }

  setPublishing(true);
  setPublished(false);

  setTimeout(() => {

    setPublishing(false);
    setPublished(true);

  }, 2500);

};

  return (
    <div className="container">

      <h1>✨ Multi Platform Post Composer</h1>

      <p className="subtitle">
        Compose your content for multiple social media platforms.
      </p>

      <div className="platforms">

        {Object.keys(platforms).map((item) => (
          <button
            key={item}
            className={
              platform === item ? "platform active" : "platform"
            }
            onClick={() => setPlatform(item)}
          >
            {item}
          </button>
        ))}

      </div>

      <div className="rules">

        <h3>{platform} Rules</h3>

        <p>{platforms[platform].rule}</p>

      </div>

      <textarea
        placeholder="What's on your mind today?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div className="buttons">

  <button
    className="connectBtn"
    onClick={connectAccount}
    disabled={connected}
  >
    {connected
      ? "✅ Account Connected"
      : "🔗 Connect Account"}
  </button>

  <button
    className="publishBtn"
    onClick={publishPost}
  >
    🚀 Publish
  </button>

</div> 

      <div className="bottom">

        <span>
          {count}/{maxChars} Characters
        </span>

        <span>
          Remaining : {remaining}
        </span>

      </div>

      {publishing &&

<div className="publishing">

<div className="loader"></div>

Publishing to {platform}...

</div>

}

{published &&

<div className="published">

🎉 Successfully Published to {platform}

</div>

}

      {warning && (
        <div className="warning">
          ⚠️ You're close to the character limit.
        </div>
      )}

      {exceeded && (
        <div className="error">
          ❌ Character limit exceeded!
        </div>
      )}

      {!warning && !exceeded && (
        <div className="success">
          ✅ Ready to Publish
        </div>
      )}

    </div>
  );
}

export default PostComposer;