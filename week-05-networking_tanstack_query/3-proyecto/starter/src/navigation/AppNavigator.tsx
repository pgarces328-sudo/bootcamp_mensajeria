import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DriversScreen } from '../screens/DriversScreen';
import { RoutesScreen } from '../screens/RoutesScreen';
import { TrackedScreen } from '../screens/TrackedScreen';
import { usePackageStore } from '../store/usePackageStore';
import { COLORS } from '../theme';
import { ShipmentsStackNavigator } from './ShipmentsStackNavigator';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

function MainTabs(): React.JSX.Element {
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
          else icon = focused ? 'map' : 'map-outline';
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="ShipmentsTab" component={ShipmentsStackNavigator} options={{ title: 'Envíos', tabBarLabel: 'Envíos', headerShown: false }} />
      <Tab.Screen name="TrackedTab" component={TrackedScreen} options={{ title: 'Seguimiento', tabBarLabel: 'Seguimiento', tabBarBadge: trackedCount > 0 ? trackedCount : undefined }} />
      <Tab.Screen name="DriversTab" component={DriversScreen} options={{ title: 'Conductores', tabBarLabel: 'Drivers' }} />
      <Tab.Screen name="RoutesTab" component={RoutesScreen} options={{ title: 'Rutas', tabBarLabel: 'Rutas' }} />
    </Tab.Navigator>
  );
}

export function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}