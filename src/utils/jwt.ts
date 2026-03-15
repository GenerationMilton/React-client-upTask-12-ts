import jwt from 'jsonwebtoken'

export const generateJWT = () =>{

    const data = {
        name: 'Juan',
        credit_card: '123456543434',
        password: 'password'
    }

    const token = jwt.sign(data, process.env.JWT_SECRET,{
        expiresIn: '6m'
    })
    return token
}