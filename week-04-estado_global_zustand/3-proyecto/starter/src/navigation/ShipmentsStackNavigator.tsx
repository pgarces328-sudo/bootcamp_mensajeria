import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ShipmentDetailScreen } from '../screens/ShipmentDetailScreen';
import { ShipmentsScreen } from '../screens/ShipmentsScreen';
import { COLORS, TYPOGRAPHY } from '../theme';
import type { ShipmentsStackParamList } from './types';

const Stack = createNativeStackNavigator<ShipmentsStackParamList>();

export function ShipmentsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: TYPOGRAPHY.weightExtraBold,
        },
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name="ShipmentsList"
        component={ShipmentsScreen}
        options={{
          title: 'Envíos',
        }}
      />

      <Stack.Screen
        name="ShipmentDetail"
        component={ShipmentDetailScreen}
        options={{
          title: 'Detalle del envío',
        }}
      />
    </Stack.Navigator>
  );
}