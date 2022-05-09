import {Field, Form, Formik} from 'formik';
import React, {useState} from 'react';

import {useNavigate} from 'react-router-dom';
import CustomSelect from './CustomSelect';
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from "../../lib/firebase";
// @ts-ignore
import {FilePond, File, registerPlugin} from "react-filepond";
import "filepond/dist/filepond.min.css";
import {FetchData, MutateData} from "../../Hooks/query";
const AddPatientFile = ({setIsOpen , isOpen }) => {
    let navigate = useNavigate();
    const [progress, setProgress] = useState<number>(0);
    const [files, setFiles] = useState<File[]>([]);
    const { query } = FetchData("cnam")
    const {addMutation} = MutateData("patient", setIsOpen , isOpen )
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                password: "",
                phone: '',
                address: '',
                city: '',
                medicine: [],
                email: '',
                file: '',
            }}
            onSubmit={(values: any) => {
                // @ts-ignore
                const storageRef = ref(storage, `/file/${files[0].file.name}`)
                const uploadTask = uploadBytesResumable(storageRef, files[0].file)

                uploadTask.on("state_changed", (snapshot) => {
                    const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100)
                    setProgress(prog)
                }, (err) => console.log(err), () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        values.file = url

                        addMutation.mutate(values)
// mutate data
                    })
                })
            }}
        >
            {({errors, touched, setFieldValue, values}: any) => (
                <Form>
                    {/* {error && (
                        <div className="py-2 px-3 bg-red-500 w-full text-white rounded-md flex justify-between">
                            {error} <button onClick={() => setError('')}>X</button>
                        </div>
                    )} */}



                    <div className="mt-4">
                        <label htmlFor="firstName"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            FirstName
                        </label>
                        <Field
                            type="text"
                            id="firstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="firstName"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="lastName"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            LastName
                        </label>
                        <Field
                            type="text"
                            id="lastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="lastName"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Email
                        </label>
                        <Field
                            type="text"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="email"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Phone
                        </label>
                        <Field
                            type="text"
                            id="phone"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="phone"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            medicine
                        </label>
                        {query &&

                        <Field
                            className="custom-select"
                            name="medicine"
                            options={query.data}
                            component={CustomSelect}
                            placeholder="Select Medicine"
                            isMulti={true}
                        />
                        }
                    </div>
                    <div className="mt-4">
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            city
                        </label>
                        <Field
                            type="text"
                            id="city"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="city"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="file"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Upload patient file
                        </label>
                        <FilePond
                            // @ts-ignore
                            files={files}
                            onupdatefiles={setFiles}
                            // allowMultiple={true}
                            // maxFiles={3}
                            name="productImage"
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />
                    </div>
                        <div className={`h-2 ${progress == 0 ? "w-0" : `w-[${progress}%]`} bg-blue-300 rounded-md`}></div>

                    <div className="mt-8 flex justify-between">
                        <button
                            type="submit"
                            className="w-[12em] text-green-900 bg-white border border-green-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-500 dark:text-white dark:border-green-600 dark:hover:bg-green-700 dark:hover:border-gray-700 dark:focus:ring-green-800"
                        >
                            <span className="font-medium">{progress == 0 || progress == 100 ? 'Add Patient File' : 'Submitting ...' }</span>
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export default AddPatientFile;
