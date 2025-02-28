import instance from "axios";

// eslint-disable-next-line no-unused-vars
const prod = "https://sportsdashboard.onrender.com/api";
const local = "http://localhost:8080/api";
const axios = instance.create({
  baseURL: local,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token, userId) => {
  if (token) {
    // Apply token and userId to headers
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["UserId"] = userId;
  } else {
    // Delete token and userId from headers
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["UserId"];
  }
};

axios.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token && user?.userId) {
      // Set token and userId from local storage to headers
      config.headers.Authorization = `Bearer ${user.token}`;
      config.headers.UserId = user.userId;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ***************************************** USER APIS ******************************************************//

export const signupUser = async (form) => {
  try {
    const res = await axios.post(`/signup`, form);
    return res;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`/login`, user);
    return res;
  } catch (error) {
    return error;
  }
};

// ***************************************** MATCHES APIS ******************************************************//

export const createMatch = async (formData) => {
  try {
    const res = await axios.post(`/live/create-match`, formData);
    return res;
  } catch (error) {
    return error;
  }
};

export const fetchAllMatches = async (currentPage, searchQuery, perPage) => {
  try {
    const res = await axios.get(
      `/live/all-matches?page=${currentPage}&search=${searchQuery}&perPage=${perPage}`
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteMatch = async (id) => {
  try {
    const res = await axios.delete(`/live/delete-match/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const getMatch = async (id) => {
  try {
    const res = await axios.get(`/live/get-single-match/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const duplicateMatch = async (id) => {
  try {
    const res = await axios.post(`/live/duplicate/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateMatch = async (id, formData) => {
  try {
    const res = await axios.put(`/live/update-match/${id}`, formData);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateMatchOrder = async (order) => {
  try {
    const res = await axios.post("/live/reorder", { numbers: order });
    return res.data;
  } catch (error) {
    console.error("Error updating match order", error);
    throw error;
  }
};

export const getOrder = async () => {
  try {
    const res = await axios.get("/live/get-order");
    return res.data.data.numbers;
  } catch (err) {
    console.log("Internal server error", err);
    throw err;
  }
};

export const getThumbnail = async (data) => {
  try {
    const res = await axios.post("/live/gen-thumbnail", data);
    return res.data.thumbnail;
  } catch (err) {
    console.log("Internal server error", err);
    return false;
  }
};

// ***************************************** NEWS APIS ******************************************************//

export const createNews = async (data) => {
  try {
    const res = await axios.post(`/create/news`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const editNews = async (id, data) => {
  try {
    const res = await axios.put(`/news/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const getAllNews = async (currentPage, searchQuery, perPage) => {
  try {
    const res = await axios.get(
      `/all/news?page=${currentPage}&search=${searchQuery}&perPage=${perPage}`
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteSingleNews = async (id) => {
  try {
    const res = await axios.delete(`/delete-news/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const getSingleNews = async (id) => {
  try {
    const res = await axios.get(`/news/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

// ************************************* MANAGE APP APIS ************************************************//

// *********** APP INFORMATION SECTION ************ //
export const createUpdateAppInformation = async (data) => {
  try {
    const res = await axios.post(
      `/manage-app/app-information/set-app-information`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getAppInformation = async () => {
  try {
    const res = await axios.get(
      `/manage-app/app-information/get-app-information`
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// *********** ANDROID SECTION ************ //
export const androidCreateUpdateSettings = async (data) => {
  try {
    const res = await axios.post(
      `/manage-app/android/set-android-setting`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getAndroidSettings = async () => {
  try {
    const settings = await axios.get("/manage-app/android/get-android-setting");
    return settings;
  } catch (err) {
    return err;
  }
};

// *********** BLOCK COUNTRIES SECTION ************ //
export const getBlockedCountries = async () => {
  try {
    const blockedCountries = await axios.get(
      "/manage-app/block/get-block-countries"
    );
    return blockedCountries.data;
  } catch (err) {
    return err;
  }
};

export const CreateAndUpdateBlockedCountry = async (countries) => {
  try {
    const res = await axios.post(
      `/manage-app/block/block-countries`,
      countries
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteCountry = async (country) => {
  try {
    const del = await axios.delete(
      `/manage-app/block/unblock-country/${country}`
    );
    return del;
  } catch (err) {
    return err;
  }
};

// *********** ADS SECTION ************ //
export const createUpdateAdSettings = async (settings) => {
  try {
    const res = await axios.post(
      `/manage-app/ads/google-ads-settings`,
      settings
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getAdsSettings = async () => {
  try {
    const settings = await axios.get("/manage-app/ads/get-ads-settings");
    return settings.data;
  } catch (err) {
    return err;
  }
};

// ***************************************** MOBILE VIEW APIS ******************************************************//

export const handleView = async (data) => {
  try {
    const res = await axios.post("/live/mobile-view", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const fetchMobileView = async () => {
  try {
    const res = await axios.get("/live/get-view");
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// ***************************************** NOTIFICATION APIS ******************************************************//
export const createNotification = async (notification) => {
  try {
    const res = await axios.post(
      `/notifications/create-notification`,
      notification
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getAllNotifications = async () => {
  try {
    const notifications = await axios.get(
      "/notifications/get-all-notifications"
    );
    return notifications.data;
  } catch (err) {
    return err;
  }
};

export const deleteNotification = async (id) => {
  try {
    const del = await axios.delete(`/notifications/delete-notification/${id}`);
    return del;
  } catch (err) {
    return err;
  }
};

export const sendNotification = async (id) => {
  try {
    const notify = await axios.post(`/notifications/send-notification/${id}`);
    return notify;
  } catch (err) {
    return err;
  }
};

// ***************************************** ADMIN SETTINGS APIS ******************************************************//
export const createAdminSettings = async (admin) => {
  try {
    const res = await axios.post(`/admin/set-admin-settings`, admin);
    return res;
  } catch (error) {
    return error;
  }
};

export const getAdminSettings = async () => {
  try {
    const settings = await axios.get("/admin/get-admin-settings");
    return settings.data;
  } catch (err) {
    return err;
  }
};

// ***************************************** FIXTURES & LEAGUES ******************************************************//
export const searchLeagues = async (country) => {
  if (country) {
    try {
      const res = await axios.get(`/fixture/get-leagues-rapid/${country}`);
      return res.data;
    } catch (err) {
      console.error(`Something went wrong: ${err.message}`);
    }
  }
};

export const getLeagues = async () => {
  try {
    const res = await axios.get(`/fixture/get-leagues`);
    return res.data.data;
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
};

export const saveLeagues = async (data) => {
  try {
    const res = await axios.post(`/fixture/set-leagues`, data);
    return res;
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
};

export const deleteLeague = async (id) => {
  try {
    const res = await axios.delete(`/fixture/delete-league/${id}`);
    return res;
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
};

export const getFixtures = async (date) => {
  try {
    const res = await axios.post(`/fixture/get-fixture-rapid`, date);
    return res.data;
  } catch (err) {
    console.error(`Something went wrong: ${err.message}`);
  }
};
