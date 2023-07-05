import bcrypt from 'bcrypt';
const saltRounds = 10;

const passwordHash = async (data) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(data, salt);
        return hash;
    } catch (error) {
        return false;
    }
};

const passwordCompare = async(data, hash) => {
    const matchedPassword = await bcrypt.compare(data, hash);
    return matchedPassword;
};

export default {passwordCompare,passwordHash};