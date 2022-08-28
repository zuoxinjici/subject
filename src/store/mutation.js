export const setChange = (state, val) => {
  state.canJump = val
  if (val == true) {
    localStorage.setItem('canJump', 1)
  } else {
    localStorage.setItem('canJump', 0)
  }
}

export const setIncludeComponent = (state, val) => {
  state.includeComponent = val
}

export const updateCheckboxs = (state, val) => {
  state.checkboxs = val
}