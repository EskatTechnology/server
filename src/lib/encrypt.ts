import bcrypt from 'bcryptjs';

class Encrypt {

    public encrypt = async (password:string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    };

    public validate = async function (password: string, newPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, newPassword);
    }; 
    
    public async encryptPassword(password: string){        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);        
        return hash;        
    }

    public async matchPassword(password: string, savedPassword: string){
        try {
            return await bcrypt.compare(password, savedPassword);
        } catch (e) {
            console.log(e)
        }
    }
}

const encrypt = new Encrypt();
export default encrypt;