import { UploadedFile } from "express-fileupload";
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
}

export default VacationModel;
