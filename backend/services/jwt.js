import jwt from "jsonwebtoken";

 export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};


export const getUser = (token) => {
    if(!token) return null; 

    const user = jwt.verify(token,process.env.JWT_SECRET);

    if(!user) return null;

    return user;

}
