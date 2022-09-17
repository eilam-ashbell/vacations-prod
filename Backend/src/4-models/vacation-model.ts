import { UploadedFile } from "express-fileupload";
import Joi from "joi";
class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public image: UploadedFile;
    public imageName: string;
    public startDate: string;
    public endDate: string;
    public price: number;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.image = vacation.image;
        this.imageName = vacation.imageName;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
    }

    private static validationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(2).max(1000),
        image: Joi.object().optional(),
        imageName: Joi.string().optional().max(50),
        startDate: Joi.string().required().min(8).max(100),
        endDate: Joi.string().required().min(8).max(100),
        price: Joi.number().required().positive()
    });

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default VacationModel;
