export const retryPromise = async (cb: () => Promise<boolean>, maxNumberOfRetries = 3) => {
  for (let i = 0; i < maxNumberOfRetries; i++) {
    if (await cb()) {
      return true;
    }
  }

  return false;
};
