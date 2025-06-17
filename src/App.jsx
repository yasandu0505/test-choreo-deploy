import { useEffect } from "react";

function App() {
  // const baseURL = import.meta.env.VITE_API_PROXY_TARGET || "http://localhost:8080";

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const response = await fetch("/v1/entities/2153-12_min_1/relations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            relatedEntityId: "",
            startTime: "2019-12-10T00:00:00Z",
            endTime: "",
            id: "",
            name: "AS_DEPARTMENT",
          }),
        });

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
