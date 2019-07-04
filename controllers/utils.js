const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    handleError: (error, res) => {
        console.log(error)
        res.json({
            message: 'Request fail',
            error: isDev ? error.message : "Error",
            success: false
        })
    }
}