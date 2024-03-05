export default class UserInfo {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  getUserInfo() {
    profileTitle.textContent = profileModalInput.value;
    profileDescription.textContent = profileModalInputDescription.value;
  }

  setUserInfo() {}
}
