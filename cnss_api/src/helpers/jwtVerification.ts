import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
//@ts-ignore
export const comparePassword = async (password, Agent, res) => {

    bcrypt.compare(password, Agent.password).then(isCorrect => {
        if (isCorrect) {
            const payload = {
                id: Agent._id,
                email: Agent.email,

            }
            jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '2h' }, (err, token) => {
                if (err) return res.json({ message: err.message })
                return res.status(200).json({
                    token: token,
                    email: Agent.email,
                })
            })
        } else {
            res.status(404).json({ message: "Invalid Username or password" })
        }
    })

}
//@ts-ignore
export const verifyToken = (req, res, next, user) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (token) {
        //@ts-ignore
        jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (err, decoded) => {
            if (err) return res.status(401).json({ message: "Failed To Authenticate" })


            if (decoded.role === `${user}`) {
                next()
            } else {

                res.status(400).json({ message: `You need to be ${user} to access` })
            }
        })
    } else {
        res.status(401).json({ message: "Unauthorized" })
    }
}

