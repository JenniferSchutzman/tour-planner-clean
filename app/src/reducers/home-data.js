function getAppState() {
  return {
    appName: 'Charleston Tour Planner',
    errorMsg: null
  }
}

export default (state = getAppState(), action) => {
  switch (action.type) {
    default:
      return state
  }
}
