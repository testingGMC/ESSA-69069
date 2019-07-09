export const getFilteredMembers = (members, searchValue) => {
  const value = searchValue.toLowerCase()
  return members.filter(m =>
    !m.fullName ? true : m.fullName.toLowerCase().includes(value),
  )
}
