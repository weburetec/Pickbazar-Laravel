import { CoreApi } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useQuery } from "react-query";
import { SettingsType } from "@ts-types/custom.types";

const SettingsService = new CoreApi(API_ENDPOINTS.SETTINGS);

export const fetchSettings = async () => {
  const { data } = await SettingsService.findAll();
  return { settings: data };
};
type SettingsResponse = {
  settings: SettingsType;
};
export const useSettingsQuery = () => {
  return useQuery<SettingsResponse, Error>(
    API_ENDPOINTS.SETTINGS,
    fetchSettings
  );
};
