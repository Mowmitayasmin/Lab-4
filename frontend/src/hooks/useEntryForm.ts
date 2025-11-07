import { useEffect, useState } from "react";
import * as OrganizationService from "../services/organizationService";

export interface Organizationdata {
  id: string | number;
  title: string;
  description: string;
}

export function useEntryForm(dependencies: unknown[]) {
  const [searchStr, setSearchstr] = useState("");
  const [organizationdata, setOrganizationData] = useState<Organizationdata[]>(
    []
  );

  const filteredData  = organizationdata.filter((item) =>
    item.title.toLowerCase().includes(searchStr.toLowerCase())
  );
  const [error, setError] = useState<string | null>();
  const fetchRoles = async () => {
    try {
      const result = await OrganizationService.fetchRoles();
      setOrganizationData([...result]);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [...dependencies]);
  return {
    error,
    organizationdata,
    filteredData,
    setSearchstr,
    searchStr,
    setOrganizationData,
    fetchRoles,
  };
}
