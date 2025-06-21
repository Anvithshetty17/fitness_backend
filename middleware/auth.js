const jwt = require("jsonwebtoken");

function auth(req, res, next) {
const authHeader = req.header("Authorization");

if (!authHeader) {
return res.status(401).json({ msg: "No token provided" });
}

const token = authHeader.split(" ")[1]; 
if (!token) {
return res.status(401).json({ msg: "Invalid token format" });
}

try {
const decoded = jwt.verify(token, "secret"); 
req.user = decoded;
next();
} catch (err) {
return res.status(401).json({ msg: "Invalid token" });
}
}

module.exports = auth;