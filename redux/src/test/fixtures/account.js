//see https://dev.twitter.com/rest/reference/get/account/verify_credentials

export const primaryAccount = {
  created_at: "Sat May 09 17:58:22 +0000 2009",
  followers_count: 10625,
  friends_count: 1181,
  id_str: "38895958",
  name: "Sean Cook",
  profile_image_url: "http://a0.twimg.com/profile_images/1751506047/dead_sexy_normal.JPG",
  protected: false,
  screen_name: "theSeanCook",
  statuses_count: 2609,
  is_initial_state: false,
  is_primary: true,
  credential: {
    accessToken: "accessToken of primaryAccount fixture",
    accessTokenSecret: "accessTokenSecret of primaryAccount fixture"
  }
};

export const subAccount = {
  created_at: "Sat May 10 17:58:22 +0000 2009",
  followers_count: 20,
  friends_count: 181,
  id_str: "48895958",
  name: "Sean Cook sub",
  profile_image_url: "http://a0.twimg.com/profile_images/1751506047/dead_sexy_normal.JPG",
  protected: false,
  screen_name: "theSeanCook2",
  statuses_count: 222,
  is_initial_state: false,
  is_primary: false,
  credential: {
    accessToken: "accessToken of subAccount fixture",
    accessTokenSecret: "accessTokenSecret of subAccount fixture"
  }
};

export const subAccount2 = {
  created_at: "Sat May 11 17:58:22 +0000 2009",
  followers_count: 21,
  friends_count: 182,
  id_str: "58895958",
  name: "Sean Cook sub2",
  profile_image_url: "http://2a0.twimg.com/profile_images/1751506047/dead_sexy_normal.JPG",
  protected: false,
  screen_name: "theSeanCookSub2",
  statuses_count: 2222,
  is_initial_state: false,
  is_primary: false,
  credential: {
    accessToken: "accessToken of subAccount2 fixture",
    accessTokenSecret: "accessTokenSecret of subAccount2 fixture"
  }
};

export const dummyAccount = {
  created_at: null,
  credential: null,
  followers_count: null,
  friends_count: null,
  id_str: null,
  name: null,
  profile_image_url: null,
  protected: null,
  screen_name: null,
  statuses_count: null,
  is_initial_state: true,
  is_primary: true
};
