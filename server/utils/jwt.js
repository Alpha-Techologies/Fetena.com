const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: false,
    expires: new Date(Date.now() + oneDay),
    secure: false,
    signed: true,
    sameSite: "lax",
  });
  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: false,
    secure: false,
    signed: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 15,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
