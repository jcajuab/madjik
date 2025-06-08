import { useCallback, useEffect, useRef, useState } from "react";

import type { Patient } from "@/features/patient/types";
import { db } from "@/lib/db";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isLoadingRef = useRef(false);

  const fetchPatients = useCallback(async () => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    setError("");

    try {
      const result = await db.selectFrom("patients").selectAll().execute();
      setPatients(result);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong!",
      );
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return { patients, isLoading, error, refetch: fetchPatients };
}
