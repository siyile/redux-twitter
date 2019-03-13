const logger = store => next => action => {
  console.group(action.type);
  console.log('Action:', action);
  const res = next(action);
  console.log('The New State:', store.getState());
  console.groupEnd();
  return res
}

export default logger