import {Request,Response} from 'express';
import {fetchMessages, getMessages} from "../services/messageService";


(() => {
    fetchMessages()
})();

export const getMessage = (req: Request, res: Response) => {
    res.status(200).json({
        status: 200,
        length: getMessages().length,
        data : getMessages()
    });
}