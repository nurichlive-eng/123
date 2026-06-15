import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainScreen } from './src/screens/MainScreen';
import { colors, spacing } from './src/theme';

function MyGamesScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Мои игры</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Профиль</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarLabelStyle: styles.tabBarLabel,
          }}
        >
          <Tab.Screen
            name="Главная"
            component={MainScreen}
            options={{
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>⚽</Text>,
            }}
          />
          <Tab.Screen
            name="Мои игры"
            component={MyGamesScreen}
            options={{
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📅</Text>,
            }}
          />
          <Tab.Screen
            name="Профиль"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>👤</Text>,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBar,
    borderTopColor: colors.cardBorder,
    borderTopWidth: 1,
    paddingBottom: spacing.xs,
    paddingTop: spacing.xs,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  placeholder: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
