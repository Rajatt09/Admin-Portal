const handleSubmit = async () => {
    const formConfig = useFormStore.getState().formConfig;
  
    const formattedData = {
      id: Date.now().toString(), // Unique ID for the form
      FormInfo: formConfig,
    };
  
    // Send the form data as a JSON file in the repo
    await fetch("https://api.github.com/repos/Saarthak1234/Admin-Portal/tree/main/Client/src/pages/OpticaForms/new_form.json", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // Access the token from the environment variable
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Added new form",
        content: btoa(JSON.stringify(formattedData, null, 2)), // Convert to base64
        branch: "main",
      }),
    });
  
    alert("Form submitted!");
  };
  