const jwt = require("jsonwebtoken");

exports.authToken = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "you must send token 11111" })
    }
    try {
        let decodeToken = jwt.verify(token, "MONKEYSSECRET");
        req.tokenData = decodeToken;
        next();
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({ msg: "token invalid or expired 444" })
    }
}