const changeArrayItemByIndex = (arr, index, setter) => {
  return [
    ...arr.slice(0, index),
    setter(arr[index]),
    ...arr.slice(index + 1)
  ]
}

const generateRandomID = n => {
  return Array(n).fill().map(() => Math.random().toString(36)[2][0]).join("")
}

const last = arr => {
  if (arr.length === 0) {
    return null
  }
  return arr[arr.length - 1]
}

export const generateIssue = (value, parents) => {
  return {
    children: [],
    issuetag: value,
    _id: generateRandomID(24),
    is_issue: true,
    parent: last(parents),
    ...(parents.length > 1 && { all_parents: parents})
  }
}

export const removeIssueByPath = (path, issues = []) => {
  const isLast = path.length === 1
  if (isLast) {
    return issues.filter(child => path[0] !== child._id)
  } else {
    const index = issues.findIndex(child => child._id === path[0])
    return changeArrayItemByIndex(issues, index, item => ({
      ...item,
      children: removeIssueByPath(path.slice(1), item.children)
    }))
  }
}


export const setIssueTagByPath = (value, path, issues = []) => {
  const isLast = path.length === 1
  const index = issues.findIndex(child => child._id === path[0])
  if (isLast) {
    return changeArrayItemByIndex(issues, index, item => ({
      ...item,
      issuetag: value
    }))
  } else {
    return changeArrayItemByIndex(issues, index, item => ({
      ...item,
      children: setIssueTagByPath(value, path.slice(1), item.children)
    }))
  }
}

export const addIssueTagByPath = (value, path, issues = [], parents) => {
  const isLast = path.length === 1
  const index = issues.findIndex(child => child._id === path[0])
  if (isLast) {
    return changeArrayItemByIndex(issues, index, item => ({
      ...item,
      children: [
        generateIssue(value, parents),
        ...item.children
      ]
    }))
  } else {
    return changeArrayItemByIndex(issues, index, item => ({
      ...item,
      children: addIssueTagByPath(value, path.slice(1), item.children, parents)
    }))
  }
}



