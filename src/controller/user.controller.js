const userService = require("../service/user.service");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.status(200).json({ users: users });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getUserMetaByToken = async (req, res) => {
  try {
    const { username } = req.decoded;

    const userMeta = await userService.getUserMeta(username);

    res.status(200).json(userMeta);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getUserMetaByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const userMeta = await userService.getUserMeta(username);

    res.status(200).json(userMeta);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.updateMeta = async (req, res) => {
  try {
    const { username } = req.decoded;

    const userMeta = await userService.updateUserMeta(username, req.body);

    res.status(200).json(userMeta);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getUsersMeta = async (req, res) => {
  try {
    const { usernames } = req.body;

    const usersMeta = await userService.getUsersMeta(usernames);

    res.status(200).json({ users: usersMeta });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.followUser = async (req, res) => {
  try {
    const { username } = req.params;

    const userToFollow = await userService.getUserMeta(username);
    if (userToFollow) {
      await userService.followUser(req.decoded.username, userToFollow.username);
      res.status(200).send();
    } else {
      res.status(400).send("User doesn't exists");
    }
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.unFollowUser = async (req, res) => {
  try {
    const { username } = req.params;

    await userService.unFollowUser(req.decoded.username, username);
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await userService.getUserByUsername(username);
    if (!user) {
      res.status(400).send("User doesn't exists");
    }
    const userMeta = await userService.getUserMeta(username);
    let data = {
      username: user.username,
      followers: user.followers,
      following: user.following,
      display_name: userMeta.display_name,
      tagline: userMeta.tagline,
      work: userMeta.work,
      image: userMeta.image,
    };
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const { username } = req.params;

    const followers = await userService.getFollowers(username);

    res.status(200).json({ users: followers });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const { username } = req.params;

    const following = await userService.getFollowing(username);

    res.status(200).json({ users: following });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};


exports.validators = {
  updateMeta: {
    work: { in: ["body"] },
    tagline: { in: ["body"] },
    image: { in: ["body"] },
  },
  getUsersMeta: {
    usernames: {
      in: ["body"],
      isArray: true,
    },
  },
  followUser: {
    username: { in: ["body"], errorMessage: "username is required" },
  },
};
