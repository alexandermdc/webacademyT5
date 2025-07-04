import { Request, Response } from 'express';
import { LoginDto, SignupDto } from './auth.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserTypes } from '../userTypes/userType.constants';
import checkCredentials from './auth.service';
import { createUser, getUserByEmail } from '../user/user.service';

// Extend express-session types to include 'uid'
declare module 'express-session' {
    interface SessionData {
        uid?: string | number;
    }
}

const signup = async (req: Request, res: Response)=>{
    const data = req.body as SignupDto;
    try {
        if (req.session.uid) {
            return res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
        }
        if (await getUserByEmail(data.email)) {
            return res.status(StatusCodes.BAD_REQUEST).send({ message: ReasonPhrases.BAD_REQUEST });
        }else {
            const user = await createUser(...data, UserTypeId = UserTypes.CLIENT);
            res.status(StatusCodes.CREATED).send({ message: ReasonPhrases.CREATED, user });
        }
    }catch (error) {
        userError(res, err);
    }
};
const logout= async (req: Request, res: Response)=>{
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.send(StatusCodes.OK).json(ReasonPhrases.OK);
    });
};

const login= async (req: Request, res: Response)=>{
    const data = req.body as LoginDto;
    try {
        const  user = checkCredentials(data);
        if (user) {
            req.session.uid = user.userTypeId;
            res.status(StatusCodes.OK).json(ReasonPhrases.OK);
        }else {
            res.status(StatusCodes.UNAUTHORIZED).json(ReasonPhrases.UNAUTHORIZED);
        }
    }catch (error) {
        userError(res, err);
    }
};

export default {
    signup,
    logout,
    login
};