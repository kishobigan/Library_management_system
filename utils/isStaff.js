const isStaff = (user) => {
    return user.role === 'staff';
}

module.exports = isStaff