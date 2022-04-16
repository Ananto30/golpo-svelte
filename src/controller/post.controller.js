const { tags, adultURLs } = require("../constants");
const postService = require("../service/post.service");

exports.getAll = async (req, res) => {
  const tags = req.query.tags;
  const tokenUser = req.decoded.username;

  try {
    let posts;
    // Filter by tags if provided
    if (!!tags && tags.length > 0) {
      posts = await postService.getAllPostsByTags(tags.split(","), tokenUser);
    } else {
      posts = await postService.getAllPosts(tokenUser);
    }
    res.status(200).json({ posts: posts });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tokenUser = req.decoded.username;

    const post = await postService.getPostById(id);

    post.isLovedByMe = false;
    post.loves.forEach(function (love) {
      if (love.author === tokenUser) return (post.isLovedByMe = true);
    });

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.createPost = async (req, res) => {
  try {
    const { url } = req.body;
    const { username } = req.decoded;
    const { tags } = req.body;

    adultURLs.forEach((a) => {
      if (url.includes(a)) {
        res.status(400).json({ errors: "Adult content not allowed ⛔" });
        return;
      }
    });

    const post = await postService.createPost(username, url, tags);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { username } = req.decoded;
    const { postId } = req.params;

    const post = await postService.createComment(username, text, postId);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.reactLove = async (req, res) => {
  try {
    const { username } = req.decoded;
    const { postId } = req.params;

    const post = await postService.reactLove(username, postId);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getPostsByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const tokenUser = req.decoded.username;

    const posts = await postService.getPostsByUsername(username, tokenUser);

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getPostsByToken = async (req, res) => {
  try {
    const { username } = req.decoded;
    const posts = await postService.getPostsByUsername(username, username);

    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getAllTags = (req, res) => {
  res.status(200).json({ tags });
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.decoded;

    const deleted = await postService.deletePost(id, username);

    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.bookmarkPost = async (req, res) => {
  try {
    const { username } = req.decoded;
    const { postId } = req.params;

    const checkIfPreviouslyBookmarked = await postService.checkIfBookmarked(
      postId,
      username
    );

    if (checkIfPreviouslyBookmarked) {
      res.status(404).json({ errors: "post already bookmarked" });
      return;
    }

    const verifyPost = await postService.getPostById(postId);
    if (!verifyPost) res.status(404).json({ errors: "post not found" });

    const bookmarkedpost = await postService.bookmarkPost(postId, username);

    res.status(200).json({ bookmarkedpost });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.bookmarks = async (req, res) => {
  try {
    const { username } = req.decoded;
    const bookmarks = await postService.bookmarks(username);
    res.status(200).json({ bookmarks });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { username } = req.decoded;
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const post = await postService.deleteComment(username, postId, commentId);

    res.status(200).json({ post });
  } catch (err) {
    if (err.message === "not authorized") {
      res.status(400).json({ errors: err.message });
      return;
    }
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getUserFeedPosts = async (req, res) => {
  try {
    const feedPosts = await postService.getUserFeedPosts(req.decoded.username);
    res.status(200).json({ feedPosts });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.validators = {
  validateComment: {
    text: {
      isLength: {
        errorMessage: "test should be between 1 and 100 characters",
        options: { min: 1, max: 100 },
      },
    },
  },

  validateUrl: {
    url: {
      isUrl: {
        errorMessage: "Must be a Valid URL",
        options: {
          protocols: ["http", "https", "ftp"],
          require_tld: true,
          require_protocol: true,
        },
      },
    },
  },
};
