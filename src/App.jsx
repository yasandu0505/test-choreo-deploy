import { useEffect } from "react";

function App() {

  useEffect(() => {
    // Safely access window.config *after* script is loaded
    const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

    const fetchMinistries = async () => {
      try {
        const response = await fetch(`${apiUrl}/books`);

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const activeMinistries = await response.json();
        console.log("Active ministries", activeMinistries);
      } catch (error) {
        console.log("Error happened", error);
      }
    };

    fetchMinistries();
  }, []);

  return <div></div>;
}

export default App;
