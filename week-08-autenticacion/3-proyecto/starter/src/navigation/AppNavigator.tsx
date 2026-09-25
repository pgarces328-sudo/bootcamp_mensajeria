import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DriversScreen } from '../screens/DriversScreen';
import { RoutesScreen } from '../screens/RoutesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { TrackedScreen } from '../screens/TrackedScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { usePackageStore } from '../store/usePackageStore';
import { COLORS } from '../theme';
import { ShipmentsStackNavigator } from './ShipmentsStackNavigator';
import type { RootTabParamList } from './types';
const Tab = createBottomTabNavigator<RootTabParamList>();
export function AppNavigatorTabs(): React.JSX.Element {
  const trackedCount = usePackageStore((s) => s.trackedIds.length);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.white,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = 'cube-outline';
          if (route.name === 'ShipmentsTab') icon = focused ? 'cube' : 'cube-outline';
          else if (route.name === 'TrackedTab') icon = focused ? 'star' : 'star-outline';
          else if (route.name === 'DriversTab') icon = focused ? 'people' : 'people-outline';
          else if (route.name === 'SettingsTab') icon = focused ? 'settings' : 'settings-outline';
          else if (route.name === 'ProfileTab') icon = focused ? 'person' : 'person-outline';
          else icon = focused ? 'map' : 'map-outline';
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="ShipmentsTab" component={ShipmentsStackNavigator} options={{ title: 'Envíos', tabBarLabel: 'Envíos', headerShown: false }} />
      <Tab.Screen name="TrackedTab" component={TrackedScreen} options={{ title: 'Seguimiento', tabBarLabel: 'Seguimiento', tabBarBadge: trackedCount > 0 ? trackedCount : undefined }} />
      <Tab.Screen name="DriversTab" component={DriversScreen} options={{ title: 'Conductores' }} />
      <Tab.Screen name="RoutesTab" component={RoutesScreen} options={{ title: 'Rutas' }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Ajustes' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
}
export function AppNavigator(): React.JSX.Element {
  return <AppNavigatorTabs />;
}