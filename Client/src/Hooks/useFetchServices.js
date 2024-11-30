import { useState, useEffect } from "react";

const useFetchServices = (url) => {
  const [servicesOffer, setServicesOffer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();

        const transformedData = data.map((service) => ({
          id: service.Id,
          name: service.ServiceName,
          price: service.ServicePrice,
          duration: service.Duration,
        }));

        setServicesOffer(transformedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServices();
  }, [url]);

  return { servicesOffer, loading, error };
};

export default useFetchServices;
