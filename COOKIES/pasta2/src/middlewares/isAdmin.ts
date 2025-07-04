import { NextFunction } from "express";


function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.session.uid.userTypeId && req.session.uid.userTypeId.ADMIN) {}
}