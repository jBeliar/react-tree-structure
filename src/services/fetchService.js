import json from '../mocks/tree.json';

const delaytime = 1000

export const fetchTreeIssues = () => {
  return new Promise(resolve => 
    setTimeout(() => resolve(json), delaytime)
  )
}