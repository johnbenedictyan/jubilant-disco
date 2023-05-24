"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function userViewer(user, token) {
    const userView = {
        user: {
            email: user.email,
            token: token,
            username: user.username,
            bio: user.bio,
            image: user.image,
        },
    };
    return userView;
}
exports.default = userViewer;
