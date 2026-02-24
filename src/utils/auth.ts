import bcrypt from 'bcrypt'

export const hashPassword = async(password: string) =>{
    // gen salt = unique value when the user type a password
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}