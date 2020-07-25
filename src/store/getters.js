export default {
  userInfo(state, getters) {
    return state.userInfo
  },
  userInfoMine(state, getters) {
    return state.userInfo.mine
  },
  userInfoFriend(state, getters) {
    return state.userInfo.friend
  },
}