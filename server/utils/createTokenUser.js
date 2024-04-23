const createTokenUser = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
}

module.exports = createTokenUser