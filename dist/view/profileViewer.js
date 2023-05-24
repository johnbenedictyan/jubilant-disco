"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function profileViewer(user, currentUser) {
    const follows = currentUser
        ? Boolean(user.followedBy.find((value) => value.username == currentUser.username))
        : false;
    const userView = {
        username: user.username,
        bio: user.bio,
        image: user.image,
        following: follows,
    };
    return userView;
}
exports.default = profileViewer;
