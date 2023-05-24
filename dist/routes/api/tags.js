"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagsController_1 = require("../../controllers/tagsController");
const router = (0, express_1.Router)();
router.get("/", tagsController_1.getTags);
exports.default = router;
