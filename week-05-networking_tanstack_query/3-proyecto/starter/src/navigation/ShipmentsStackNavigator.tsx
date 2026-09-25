import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShipmentsScreen } from '../screens/ShipmentsScreen';
import { ShipmentDetailScreen } from '../screens/ShipmentDetailScreen';
import { COLORS } from '../theme';
import type { ShipmentsStackParamList } from './types';

const Stack = createNativeStackNavigator<ShipmentsStackParamList>();

export function ShipmentsStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.text,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="ShipmentsList" component={ShipmentsScreen} options={{ title: 'Envíos activos' }} />
      <Stack.Screen name="ShipmentDetail" component={ShipmentDetailScreen} options={{ title: 'Detalle del envío' }} />
    </Stack.Navigator>
  );
}