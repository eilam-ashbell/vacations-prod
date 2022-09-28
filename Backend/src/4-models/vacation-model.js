"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var VacationModel = /** @class */ (function () {
    function VacationModel(vacation) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
    }
    VacationModel.prototype.validate = function () {
        var _a;
        var result = VacationModel.validationSchema.validate(this);
        return (_a = result.error) === null || _a === void 0 ? void 0 : _a.message;
    };
    VacationModel.validationSchema = joi_1.default.object({
        vacationId: joi_1.default.number().optional().positive().integer(),
        destination: joi_1.default.string().required().min(2).max(50),
        description: joi_1.default.string().required().min(2).max(1000),
        image: joi_1.default.object().optional(),
        imageName: joi_1.default.string().optional().max(50),
        startDate: joi_1.default.string().required().min(8).max(100),
        endDate: joi_1.default.string().required().min(8).max(100),
        price: joi_1.default.number().required().positive()
    });
    return VacationModel;
}());
exports.default = VacationModel;
