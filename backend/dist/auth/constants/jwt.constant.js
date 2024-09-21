"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConstants = void 0;
const config_1 = require("@nestjs/config");
config_1.ConfigModule.forRoot({
    envFilePath: 'src/config/jwtConstants.env',
});
exports.jwtConstants = {
    secret: process.env.SECRET
};
//# sourceMappingURL=jwt.constant.js.map