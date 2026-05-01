function setUserData(userData) {
    const userInfo = { 
    email: userData.email,
    id: userData._id || userData.id,
    accessToken: userData.accessToken
}

    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
}

function getUserData() {
    const userInfo = sessionStorage.getItem("userInfo");

    return userInfo && JSON.parse(userInfo)
}

function getUserId() {
    return getUserData()?.id;
}

function getAccessToken() {
    return getUserData()?.accessToken;
}

function clear() {
    sessionStorage.removeItem("userInfo");
}

function hasUser() {
    return !!getUserData();
}

function isOwner(itemOwnerId) {
    return itemOwnerId === getUserId();
}

export const userHelper = {
    setUserData,
    getUserId,
    getAccessToken,
    clear,
    hasUser,
    isOwner
}