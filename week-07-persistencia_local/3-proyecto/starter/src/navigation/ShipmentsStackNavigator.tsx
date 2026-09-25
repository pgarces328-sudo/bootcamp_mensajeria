import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShipmentsScreen } from '../screens/ShipmentsScreen';
import { ShipmentDetailScreen } from '../screens/ShipmentDetailScreen';
import { CreateShipmentScreen } from '../screens/CreateShipmentScreen';
import { EditShipmentScreen } from '../screens/EditShipmentScreen';
import { COLORS } from '../theme';
import type { ShipmentsStackParamList } from './types';
const Stack = createNativeStackNavigator<ShipmentsStackParamList>();
export function ShipmentsStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: COLORS.surface }, headerTintColor: COLORS.text, contentStyle: { backgroundColor: COLORS.background } }}>
      <Stack.Screen name="ShipmentsList" component={ShipmentsScreen} options={{ title: 'Envíos activos' }} />
      <Stack.Screen name="ShipmentDetail" component={ShipmentDetailScreen} options={{ title: 'Detalle' }} />
      <Stack.Screen name="CreateShipment" component={CreateShipmentScreen} options={{ title: 'Nuevo envío' }} />
      <Stack.Screen name="EditShipment" component={EditShipmentScreen} options={{ title: 'Editar envío' }} />
    </Stack.Navigator>
  );
}