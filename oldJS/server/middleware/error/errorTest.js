function testError(app, errorCode) {
    return () => {
        app.get(`/${errorCode}`, function (req, res, next) {
            next(new Error('keyboard cat!'));
        });
    };
}

module.exports = { testError };
