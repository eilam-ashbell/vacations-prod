import React, { EventHandler, SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/vacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import formUtils from "../../../Utils/formUtils";
import "./EditVacation.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>()
    const navigate = useNavigate()
    const [image, setImage] = useState<string>()
    const params = useParams()

    useEffect(() => {
        // Get vacation ID from URL
        const vacationId = +params.vacationId

        // Get vacations data for that vacation ID
        vacationsService.getVacation(vacationId).then(vacation => {
            setValue("vacationId", vacation.vacationId)
            setValue("destination", vacation.destination);
            setValue("description", vacation.description);
            setValue("startDate", formUtils.formatDate(vacation.startDate));
            setValue("endDate", formUtils.formatDate(vacation.endDate));
            setValue("price", vacation.price);
            setValue("imageName", vacation.imageName)
            setImage(config.serverStaticsImages + vacation.imageName)
        })

        return () => {
            // when component unbind delete the objectURL that created for the image 
            URL.revokeObjectURL(image)
        }
    }, [])

    async function send(vacation: VacationModel) {
        try {
            console.log(vacation);

            // Send updated data
            await vacationsService.updateVacation(vacation)

            // notify message
            notifyService.success("Vacation has been updated")

            // Redirect to home page
            navigate("/home")

        } catch (err: any) {

            // notify message
            notifyService.success(err)
        }
    }

    function onImageChange(e: React.FormEvent<HTMLInputElement>) {
        const files = e.currentTarget.files
        const file = files[0]
        console.log(file);
        setImage(URL.createObjectURL(file))
    }

    return (
        <div className="EditVacation">
            <div className="action-nav">
                <button onClick={() => navigate('/home')}>
                    <ChevronLeftIcon sx={{ color: "inherent", fontSize: 16, marginRight: "8px" }} />
                    Back
                </button>
            </div>
            <form onSubmit={handleSubmit(send)}>
                <h2>Edit Vacation</h2>

                <input type="hidden" {...register("vacationId", {
                    required: { value: true, message: "vacationId not found" }
                })} />

                <div className="input-label-wrapper">
                    <label htmlFor="destination">destination</label>
                    <input type="text" id="destination" {...register("destination", {
                        required: { value: true, message: "Destination is required" },
                        minLength: { value: 2, message: "Destination is too short" },
                        maxLength: { value: 50, message: "Destination is too long" }
                    })} />
                    <span className="hint">{formState.errors.destination?.message}</span>
                </div>

                <div className="input-label-wrapper">
                    <label htmlFor="description">description</label>
                    <textarea id="description" {...register("description", {
                        required: { value: true, message: "Description is required" },
                        minLength: { value: 2, message: "Description is too short" },
                        maxLength: { value: 1000, message: "Description is too long" }
                    })} />
                    <span className="hint">{formState.errors.description?.message}</span>
                </div>

                <div className="input-label-wrapper">
                    <label htmlFor="startDate">start on</label>
                    <input type="date" id="startDate" {...register("startDate", {
                        required: { value: true, message: "Start date is required" },
                        minLength: { value: 8, message: "Start date is too short" },
                        maxLength: { value: 100, message: "Start date is too long" }
                    })} />
                    <span className="hint">{formState.errors.startDate?.message}</span>
                </div>

                <div className="input-label-wrapper">
                    <label htmlFor="endDate">end on</label>
                    <input type="date" id="endDate" {...register("endDate", {
                        required: { value: true, message: "Start date is required" },
                        minLength: { value: 8, message: "Start date is too short" },
                        maxLength: { value: 100, message: "Start date is too long" },
                    })} />
                    <span className="hint">{formState.errors.endDate?.message}</span>
                </div>

                <div className="input-label-wrapper">
                    <label htmlFor="price">price</label>
                    <input type="number" id="price" step="0.01"{...register("price", {
                        required: { value: true, message: "Price is required" },
                        min: { value: 0, message: "Username is too short" },
                    })} />
                    <span className="hint">{formState.errors.price?.message}</span>
                </div>

                <div className="input-label-wrapper">
                    <label htmlFor="image" id="imgLabel">
                        cover image
                        <div
                            className="image-change"
                            style={{ backgroundImage: `url(${image})` }}
                        >
                            <span>Change Image</span>
                        </div>
                    </label>
                    <input type="file" id="image" accept="image/*" {...register("image")} onChange={onImageChange} />
                    <span className="hint">{formState.errors.image?.message}</span>
                </div>

                <button>Update</button>

                <button
                    className="secondary"
                    onClick={() => navigate("/home")}
                >
                    Cancel
                </button>
            </form>

        </div>
    );
}

export default EditVacation;