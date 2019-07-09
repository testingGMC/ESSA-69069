import * as JsonDiffPatch from "jsondiffpatch"

export const differentiate = (left, right) => JSON.stringify(JsonDiffPatch.diff(left, right))
export const patch = (left, patch) => JSON.stringify(JsonDiffPatch.patch(left, JSON.parse(patch)))
export const unpatch = (right, patch) => JSON.stringify(JsonDiffPatch.unpatch(right, JSON.parse(patch)))

export const hasConflict = (patchA, patchB) => {
    if (Object.keys(patchA).length == 0 || Object.keys(patchB).length == 0) 
        return true

    let conflict = false
    Object.keys(patchA).map(e => {
        Object.keys(patchB).filter(b => b == e).map(k => {
              if (hasConflict(patchA[k], patchB[k], k))
                conflict = true
        })

    })
    return conflict
}
