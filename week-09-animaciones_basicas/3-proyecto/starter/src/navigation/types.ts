export type RootTabParamList = {
  ShipmentsTab: undefined;
  TrackedTab: undefined;
  DriversTab: undefined;
  RoutesTab: undefined;
  SettingsTab: undefined;
  ProfileTab: undefined;
};
export type ShipmentsStackParamList = {
  ShipmentsList: undefined;
  ShipmentDetail: { id: string };
  CreateShipment: undefined;
  EditShipment: { id: string };
};