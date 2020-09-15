
import DatePicker from "react-datepicker";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

const PortfolioForm = ({ buttonText='Create',initalData={}, onSubmit}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { register, handleSubmit, setValue } = useForm({defaultValues:initalData});

    useEffect(() => {
        register({name: 'startDate'});
        register({name: 'endDate'});
    }, [register])
    useEffect(()=>{
        const {startDate,endDate} = initalData;
        if(startDate){setStartDate(new Date(startDate))}
        if(endDate){setEndDate(new Date(endDate))}
    },[initalData]);

    const handleDateChange = (dateType, setDate) => date => {
        setValue(dateType, date);
        setDate(date);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    ref={register}
                    name="title"
                    type="text"
                    className="form-control"
                    id="title"/>
            </div>

            <div className="form-group">
                <label htmlFor="city">Company</label>
                <input
                    ref={register}
                    name="company"
                    type="text"
                    className="form-control"
                    id="company"/>
            </div>

            <div className="form-group">
                <label htmlFor="city">Company Website</label>
                <input
                    ref={register}
                    name="companyWebsite"
                    type="text"
                    className="form-control"
                    id="companyWebsite"/>
            </div>

            <div className="form-group">
                <label htmlFor="street">Location</label>
                <input
                    ref={register}
                    name="location"
                    type="text"
                    className="form-control"
                    id="location"/>
            </div>

            <div className="form-group">
                <label htmlFor="street">Job Title</label>
                <input
                    ref={register}
                    name="jobTitle"
                    type="text"
                    className="form-control"
                    id="jobTitle"/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    ref={register}
                    name="description"
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description">
        </textarea>
            </div>

            <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <div>
                    <DatePicker
                        showYearDropdown
                        selected={startDate}
                        onChange={handleDateChange('startDate', setStartDate)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <div>
                    <DatePicker
                        disabled={!endDate}
                        showYearDropdown
                        selected={endDate}
                        onChange={handleDateChange('endDate', setEndDate)}
                    />
                </div>
                    <div className="form-group">
                        {
                            endDate &&
                            <button type="button" className='btn btn-danger mt-3' onClick={() => handleDateChange('endDate', setEndDate)(null)}>
                                No End Date
                            </button>
                        }
                        {
                            !endDate &&
                            <button type="button" className='btn btn-primary mt-3'
                                    onClick={() => handleDateChange('endDate', setEndDate)(new Date(new Date().setHours(0,0,0,0)))}>
                                Set End Date
                            </button>
                        }
                    </div>
            </div>
            <button
                type="submit"
                className="btn btn-primary">{buttonText}
            </button>
        </form>
    )
}

export default PortfolioForm;