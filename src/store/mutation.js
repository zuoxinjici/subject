export default {
  setChange(state, val) {
    state.canJump = val
    if (val == true) {
      localStorage.setItem('canJump', 1)
    } else {
      localStorage.setItem('canJump', 0)
    }
  },
  setIncludeComponent(state, val) {
    state.includeComponent = val
  }
}