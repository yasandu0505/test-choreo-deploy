import { useEffect } from "react";

function App() {

  useEffect(() => {
    const fetchMinistries = async () => {
      try {
        const response = await fetch("/books");

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const activeMinistries = await response.json();
        console.log("Active ministries", activeMinistries);

      } catch (error) {
        console.log("Error happened", error);
      }
    }

    fetchMinistries();
  }, []);

  return <div></div>;
}

export default App;
