export const getFilteredProjects = (projects, searchValue) => {
    const value = searchValue.toLowerCase()
    return projects.filter(
        m =>
            m.name.toLowerCase().includes(value).toLowerCase().includes(value),
    )
}
