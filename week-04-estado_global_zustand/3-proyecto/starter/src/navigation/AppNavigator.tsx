import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DriversScreen } from '../screens/DriversScreen';
import { RoutesScreen } from '../screens/RoutesScreen';
import { TrackedScreen } from '../screens/TrackedScreen';
import { usePackageStore } from '../store/usePackageStore';
import { COLORS, TYPOGRAPHY } from '../theme';
import { ShipmentsStackNavigator } from './ShipmentsStackNavigator';
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

function MainTabs() {
  const trackedCount = usePackageStore((state) => state.trackedIds.length);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: TYPOGRAPHY.weightExtraBold,
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'ShipmentsTab') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'TrackedTab') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'DriversTab') {
            iconName = focused ? 'people' : 'people-outline';
          } else {
            iconName = focused ? 'map' : 'map-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="ShipmentsTab"
        component={ShipmentsStackNavigator}
        options={{
          title: 'Envíos',
          tabBarLabel: 'Envíos',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="TrackedTab"
        component={TrackedScreen}
        options={{
          title: 'Seguimiento',
          tabBarLabel: 'Seguimiento',
          tabBarBadge: trackedCount > 0 ? trackedCount : undefined,
        }}
      />

      <Tab.Screen
        name="DriversTab"
        component={DriversScreen}
        options={{
          title: 'Conductores',
          tabBarLabel: 'Drivers',
        }}
      />

      <Tab.Screen
        name="RoutesTab"
        component={RoutesScreen}
        options={{
          title: 'Rutas',
          tabBarLabel: 'Rutas',
        }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}