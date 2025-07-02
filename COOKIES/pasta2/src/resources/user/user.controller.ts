import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto, changePasswordDto } from './user.types';
import { changePasswordUser, createUser } from './user.service';

const index = async (req:Request, res: Response) => {}
const create  = async (req: Request, res: Response) => {
    const data: CreateUserDto = req.body;
    try {
        const user = await createUser(data);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
}
const update = async (req: Request, res: Response) => {}
const read = async (req: Request, res: Response) => {}
const remove = async (req: Request, res: Response) => {}
const changePassword = async (req: Request, res: Response) => {
    const { id } = req.params
    const {newPassword, oldPassword} = req.body as changePasswordDto;
    try {
        const ok = await changePasswordUser(id, oldPassword, newPassword);
        if (ok) {
            res.status(StatusCodes.OK).json({ message: 'Password changed successfully' });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid old password' });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to change password' });
    }
}

export default { index, create, update, read, remove , changePassword };