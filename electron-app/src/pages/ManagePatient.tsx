import React from 'react';
import { useState } from 'react';
import AddPatientFile from "../components/Forms/addPtientFile";
import Modal from "../components/Modal/Modal";
import PatientTable from "../components/Tabels/PatientTable";
interface ManagerDeliveriesProps {
    setIsOpen?: (val: boolean) => void;
    setIsError?: (val: boolean) => void;
}
const ManageDeliveries: React.FC<ManagerDeliveriesProps> = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={"w-[90%] mx-auto"}>
            <div className="flex justify-between items-center ">
                <h1 className="text-4xl font-black dark:text-white py-14">Manage Deliveries</h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Add Patient
                </button>
            </div>
            <PatientTable />
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} component={<AddPatientFile setIsOpen={setIsOpen} isOpen={isOpen} />} title={'Add Patient'} />
        </div>
    );
};

export default ManageDeliveries;