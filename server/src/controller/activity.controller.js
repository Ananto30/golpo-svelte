const activityService = require("../service/activity.service");

exports.getAllActivities = async (req, res) => {
  try {
    // TODO: Make new method?
    // activities = await activityService.getAll();
    const activities = await activityService.getLatest(20);

    res.status(200).json({ activities: activities });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};

exports.getActivitiesByToken = async (req, res) => {
  try {
    const { username } = req.decoded;

    const activities = await activityService.getByUsername(username);

    res.status(200).json({ activities: activities });
  } catch (err) {
    res.status(500).json({ errors: err.message });
    console.log(err);
    return;
  }
};
