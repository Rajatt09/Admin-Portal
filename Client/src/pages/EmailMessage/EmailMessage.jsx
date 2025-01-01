import { useState, useEffect, useRef } from "react";
import axios from "axios";
const EmailMessage = () => {
    const [excelFile, setExcelFile] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [mailMessage, setmailMessage] = useState({
        subject: "",
        message: "",
        person1: {
            name: "",
            phone: "",
        },
        person2: {
            name: "",
            phone: "",
        },
        fileData: "",
    });
    const [showError, setShowError] = useState({
        message: "",
        mail: {
            subject: "",
            message: "",
        },
        uploadfile: "",
        eventdetail: {
            eventname: "",
            eventdate: "",
        },
    });
    const [eventdetail, setEventDetail] = useState({
        name: "",
        date: "",
    });
    const handleMailFileChange = (e) => {
        const file = e.target.files[0];
        setmailMessage({ ...mailMessage, fileData: file });
    };

    const handlePersonChange = (person, field, value) => {
        setmailMessage({
            ...mailMessage,
            [person]: { ...mailMessage[person], [field]: value },
        });
    };
    const sendEmails = async () => {
        // setLoading(true);
        setShowError({
            message: "",
            mail: {
                subject: "",
                message: "",
            },
            uploadfile: "",
            eventdetail: {
                eventname: "",
                eventdate: "",
            },
        });

        if (eventdetail.name == "") {
            setShowError((prevData) => ({
                ...prevData,
                eventdetail: {
                    ...prevData.eventdetail,
                    eventname: "Please fill the event name.",
                },
            }));

            return;
        } else if (eventdetail.date == "") {
            setShowError((prevData) => ({
                ...prevData,
                eventdetail: {
                    ...prevData.eventdetail,
                    eventdate: "Please fill the event time.",
                },
            }));
            return;
        }

        if (mailMessage.subject == "") {
            setShowError((prevData) => ({
                ...prevData,
                mail: {
                    ...prevData.mail,
                    subject: "Please provide subject.",
                },
            }));

            return;
        } else if (mailMessage.message == "") {
            setShowError((prevData) => ({
                ...prevData,
                mail: {
                    ...prevData.mail,
                    message: "Please provide message.",
                },
            }));
            return;
        }
    }
    const handleFileChange = (e) => {
        console.log("Selected file: ", e.target.files[0]);
        setExcelFile(e.target.files[0]);
    };
    const uploadFile = async () => {
        console.log("file is: ", excelFile);
        setShowError({
            message: "",
            mail: "",
            uploadfile: "",
            eventdetail: {
                eventname: "",
                eventdate: "",
            },
        });
        const validExtensions = ["xlsx", "xls", "xlsm", "csv"];

        if (!excelFile) {
            setShowError((prevData) => ({
                ...prevData,
                uploadfile: "No file chosen.",
            }));

            return;
        }

        if (
            !validExtensions.includes(excelFile.name.split(".").pop().toLowerCase())
        ) {
            setShowError((prevData) => ({
                ...prevData,
                uploadfile: "Please upload a valid excel file.",
            }));

            // setExcelFile(null);
            return;
        } const formData = new FormData();

        formData.append("usersExcelFile", excelFile);

        console.log("formData is: ", formData);

        try {
            console.log("file is: ", formData);
            const response = await axios.post(
                "http://localhost:3000/api/v1/upload/excelFile", // URL
                formData, // FormData (body)
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Content-Type for file uploads
                    },
                } // Config object
            );

            if (response.status == 200) {
                alert("File uploaded successfully.");
            } else {
                alert("Failed to upload file.");
                console.error("Failed to upload file");
            }
        } catch (error) {
            alert("Failed to upload file.");
            console.error("Failed to upload file", error);
        }
    }
    return (
        <>
            {/* <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-1 mb-4 shadow">
                        <Card.Body>
                            <h3>
                                Event Details <span style={{ color: "red" }}>*</span>
                            </h3>
                            <p className="mt-0">
                                <strong>
                                    ( Event details required only while sending mail and
                                    messages )
                                </strong>
                            </p>
                            <br />
                            <Form>
                                <Form.Group controlId="eventName">
                                    <Form.Label>
                                        <strong>Event Name</strong>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter event name"
                                        value={eventdetail.name}
                                        onChange={(e) =>
                                            setEventDetail((prevData) => ({
                                                ...prevData,
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                </Form.Group>
                                {showError.eventdetail.eventname != "" && (
                                    <p className="text-danger mt-2 mb-0">
                                        {showError.eventdetail.eventname}
                                    </p>
                                )}
                                <Form.Group controlId="eventTime" className="mt-3">
                                    <Form.Label>
                                        <strong>Event Time</strong>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter event time"
                                        value={eventdetail.date}
                                        onChange={(e) =>
                                            setEventDetail((prevData) => ({
                                                ...prevData,
                                                date: e.target.value,
                                            }))
                                        }
                                    />
                                </Form.Group>
                                {showError.eventdetail.eventdate != "" && (
                                    <p className="text-danger mt-2 mb-0">
                                        {showError.eventdetail.eventdate}
                                    </p>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
            {/* <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-1 mb-4 shadow">
                        <Card.Body>
                            <h3>
                                Write Email Message{" "}
                                <span style={{ color: "red" }}>*</span>
                            </h3>
                            <p className="mt-0">
                                <strong>( Required only while sending mails )</strong>
                            </p>
                            <Form>
                                <Form.Group controlId="emailSubject">
                                    <Form.Label>
                                        <strong>Subject</strong> {""}
                                        <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Write email subject"
                                        value={mailMessage.subject}
                                        onChange={(e) =>
                                            setmailMessage({
                                                ...mailMessage,
                                                subject: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                                {showError.mail.subject != "" && (
                                    <p className="text-danger mt-2 mb-0">
                                        {showError.mail.subject}
                                    </p>
                                )}
                                <br />
                                <Form.Group controlId="emailMessage">
                                    <Form.Label>
                                        <strong>Email Message</strong> {""}
                                        <span style={{ color: "red" }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={10}
                                        placeholder="Write your email message"
                                        style={{ resize: "none" }}
                                        value={mailMessage.message}
                                        onChange={(e) =>
                                            setmailMessage({
                                                ...mailMessage,
                                                message: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                                {showError.mail.message != "" && (
                                    <p className="text-danger mt-2 mb-0">
                                        {showError.mail.message}
                                    </p>
                                )}
                                <br />
                                <Form.Group controlId="contact1">
                                    <Form.Label>
                                        <strong>Contact Person 1 (Optional)</strong>
                                    </Form.Label>
                                    <Row>
                                        <Col md={6} className="mb-2 mb-md-0">
                                            <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                value={mailMessage.person1.name}
                                                onChange={(e) =>
                                                    handlePersonChange(
                                                        "person1",
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Phone Number"
                                                value={mailMessage.person1.phone}
                                                onChange={(e) =>
                                                    handlePersonChange(
                                                        "person1",
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <br />
                                <Form.Group controlId="contact2">
                                    <Form.Label>
                                        <strong>Contact Person 2 (Optional)</strong>
                                    </Form.Label>
                                    <Row>
                                        <Col md={6} className="mb-2 mb-md-0">
                                            <Form.Control
                                                type="text"
                                                placeholder="Name"
                                                value={mailMessage.person2.name}
                                                onChange={(e) =>
                                                    handlePersonChange(
                                                        "person2",
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Phone Number"
                                                value={mailMessage.person2.phone}
                                                onChange={(e) =>
                                                    handlePersonChange(
                                                        "person2",
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <br />
                                <Form.Group controlId="fileUpload">
                                    <Form.Label>
                                        <strong>Upload File (Optional)</strong>
                                    </Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={handleMailFileChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
            {/* <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-1 mb-4 shadow">
                        <Card.Body>
                            <h3>
                                Upload Excel File <span style={{ color: "red" }}>*</span>
                            </h3>
                            <br />
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                                accept=".xlsx, .xls, .csv"
                            />
                            {showError.uploadfile != "" && (
                                <p className="text-danger mt-2 mb-0">
                                    {showError.uploadfile}
                                </p>
                                // add button for uploading file
                            )}

                            {
                                // button for uploading file
                                <Button
                                    variant="primary"
                                    className="mt-3"
                                    onClick={uploadFile}
                                >
                                    Upload File
                                </Button>
                            }

                            <p className="mt-3">
                                <strong>Note: Upload File only in excel format.</strong>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-3/4 md:w-2/4 bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Upload Excel File <span className="text-red-500">*</span>
                    </h3>
                    <div className="border-dashed border-2 border-blue-400 p-6 text-center rounded-lg bg-blue-50 relative">
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer text-blue-600 font-medium hover:underline"
                        >
                            <div className="flex flex-col items-center">
                                <img
                                    src="/upload-icon.svg" // Replace this with the actual SVG or icon file
                                    alt="Upload"
                                    className="h-16 mb-2"
                                />
                                <p>Drag your file(s) to start uploading</p>
                                <p className="text-sm text-gray-500 my-2">OR</p>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                    size="small">
                                        Browse files
                                </button>
                                    
                            </div>
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".xlsx, .xls, .csv"
                        />
                    </div>

                    {/* {error && <p className="text-red-500 mt-3">{error}</p>} */}

                    <button variant="primary"
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={uploadFile}>

                        Upload File
                    </button>


                    <p className="mt-4 text-gray-600 text-sm">
                        <strong>Note:</strong> Upload file only in Excel or CSV format.
                    </p>
                </div>
            </div>
        </>
    )
}

export default EmailMessage