export const keysAreIndices = (object) => {
    if(typeof(object) === 'object'){
       let keysAreIndex = true
      Object.keys(object).map((e) => {
        if(isNaN(Number(e)))
             keysAreIndex = false
    })
    return keysAreIndex
    }
    return false
}

export const adaptContent = (object) => {
  if(typeof(object) === 'object'){
    let newObject = {}
    let keys  = Object.keys(object)
    keys.sort()
    keys.map((e) => {
      newObject[e] = adaptContent(object[e])
    })
    if(keysAreIndices(newObject))
        return Object.values(newObject)
    
  }
    return object
}
