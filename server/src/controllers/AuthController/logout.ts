import {NextFunction, Request, Response} from 'express';
import {catchAsync} from '../../middlewares/errorHandler';
import {StatusRequestSuccess} from '../../utils/variables';

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('connect.sid');
      req.logout(errorLogout => {
        if (errorLogout) {
          next(errorLogout);
        }
        req.session.destroy(errorDestroySession => {
          if (errorDestroySession) {
            next(errorDestroySession);
          }
          res.status(204).json({
            status: StatusRequestSuccess,
            message: 'User logged out successfully',
          });
        });
      });
    } catch (err) {
      next(err);
    }
  },
);
