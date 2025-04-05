import axios from "axios";

const updateForms = async (req, res) => {
  const formData = req.body;
  console.log(formData);

  const [[id, info]] = Object.entries(formData);

  const singleFormData = {
    sheetNo: info?.sheetNo,
    eventName: info?.headerInfo?.heading,
    eventDate: info?.deadline?.time,
    eventId: id,
  };

  console.log(singleFormData);

  try {
    const response = await axios.post(
      "https://api.github.com/repos/jiitopticachapter/JIIT-OPTICA-Forms/actions/workflows/update-forms.yml/dispatches",
      {
        ref: "main",
        inputs: {
          formData: JSON.stringify(formData),
        },
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    const response2 = await fetch(`${process.env.GOOGLE_APP_SCRIPT_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(singleFormData),
      mode: "no-cors",
    });

    if (response.status === 204) {
      res.status(200).json({
        message: "Workflow triggered successfully",
      });
    } else {
      console.log("Error triggering workflow.");
      res.status(response.status).json({
        message: "Error triggering workflow",
        details: response.data,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error while triggering workflow",
      error: error.message,
      details: error.response?.data || "No additional details",
    });
  }
};

const deleteForm = async (req, res) => {
  const { id, name } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Missing form id" });
  }

  try {
    const response = await axios.post(
      "https://api.github.com/repos/jiitopticachapter/JIIT-OPTICA-Forms/actions/workflows/delete-form.yml/dispatches",
      {
        ref: "main",
        inputs: {
          formId: id,
        },
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (response.status === 204) {
      res.status(200).json({
        message: "Delete workflow triggered successfully",
      });
    } else {
      console.log("Error triggering delete workflow.");
      res.status(response.status).json({
        message: "Error triggering delete workflow",
        details: response.data,
      });
    }
  } catch (error) {
    console.error("Error triggering delete workflow:", error);
    res.status(500).json({
      message: "Internal server error while triggering delete workflow",
      error: error.message,
      details: error.response?.data || "No additional details",
    });
  }
};

const getForms = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.GOOGLE_APP_SCRIPT_URL}`);
    console.log("response is: ", response.data);

    res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server while getting optica forms.",
      error: error.message,
      details: error.response?.data || "No additional details",
    });
  }
};

export default updateForms;
export { getForms, deleteForm };
