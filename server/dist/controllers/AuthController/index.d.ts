declare const _default: {
    register: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
    login: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<any>;
    logout: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
    getCurrentUser: (req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => void;
};
export default _default;
