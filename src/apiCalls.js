

let API;

const getAPI = async() => {
  API = await process.env.REACT_APP_API || process.env.API;
  return API;
};


const getAllItems = async () => {
    try {
      const response = await fetch(API + "/items");
      const jsonData = await response.json();
      console.log("data: ", jsonData);
      return jsonData;

    } catch(err) {
      console.error(err.message);
    }
};

const getFriends = async(mainId) => {
  try {
      console.log('fetching friends of ', mainId);
      const response = await fetch(API + "/" + mainId);
      const jsonData = await response.json();
      return jsonData;
    } catch(err) {
      console.error(err.message);
    }
};

const APICalls = {
  API: API || getAPI(),
  getAllItems: getAllItems,
  getFriends: getFriends
};

export default APICalls;

