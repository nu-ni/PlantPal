import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'menu' : 'menu-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collectionDetails/[id]"
        options={{
          title: '',
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('@/assets/images/seedling-solid.png')}
              style={{
                width: size,
                height: size,
                tintColor: focused ? 'orange' : 'grey'
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="export"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'share' : 'share-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
