export const get = (obj, key, fallback, notfound, index, undef) => {
  if (!obj) {
    throw new Error('No object provided.')
  }

  if (!key) {
    throw new Error('No key provided.')
  }

  const keyArray = key.split ? key.split('.') : key
  let currentObj = obj

  for (index = 0; index < keyArray.length; index++) {
    if (currentObj && currentObj.hasOwnProperty(keyArray[index])) {
      currentObj = currentObj[keyArray[index]]
      continue
    }

    if (notfound) {
      notfound({
        message: `No property '${
          keyArray[index]
        }' found on object at ${keyArray.slice(0, index).join('.')}.`,
        obj,
        key,
        keyArray,
      })
    }

    currentObj = undef
  }

  return currentObj === undef
    ? fallback
      ? fallback({ obj, key, keyArray })
      : undef
    : currentObj
}
