import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedControl } from '../components/SegmentedControl';
import { CalendarStrip } from '../components/CalendarStrip';
import { FieldCard, Field } from '../components/FieldCard';
import { MatchCard, Match } from '../components/MatchCard';
import { FilterChips } from '../components/FilterChips';
import { colors, spacing, radius } from '../theme';

const FIELDS: Field[] = [
  {
    id: '1',
    name: 'Арена Чемпион',
    address: 'ул. Аль-Фараби, 17',
    distanceKm: 1.2,
    rating: 4.9,
    pricePerHour: 8000,
    gradientColors: ['#1B4332', '#2D6A4F'],
  },
  {
    id: '2',
    name: 'Футбольный центр Pro',
    address: 'пр. Достык, 89',
    distanceKm: 3.4,
    rating: 4.7,
    pricePerHour: 12000,
    gradientColors: ['#1A3A5C', '#2E6DA4'],
  },
  {
    id: '3',
    name: 'Спорткомплекс Олимп',
    address: 'ул. Тимирязева, 42',
    distanceKm: 5.1,
    rating: 4.5,
    pricePerHour: 6500,
    gradientColors: ['#3D1A1A', '#8B3A3A'],
  },
];

const MATCHES: Match[] = [
  {
    id: '1',
    organizerName: 'Алишер М.',
    organizerInitials: 'АМ',
    organizerColor: '#1565C0',
    fieldName: 'Арена Чемпион',
    address: 'ул. Аль-Фараби, 17',
    time: '18:00',
    duration: '1.5 ч',
    playersJoined: 7,
    playersTotal: 10,
    pricePerPlayer: 1500,
  },
  {
    id: '2',
    organizerName: 'Денис К.',
    organizerInitials: 'ДК',
    organizerColor: '#6A1572',
    fieldName: 'Футбольный центр Pro',
    address: 'пр. Достык, 89',
    time: '20:00',
    duration: '2 ч',
    playersJoined: 4,
    playersTotal: 8,
    pricePerPlayer: 2000,
  },
];

const BOOKED_DATES = [
  new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
];

const FIELD_FILTERS = ['Газон', 'Крытое', '5×5', 'Душ', 'Парковка'];
const MATCH_FILTERS = ['Утро', 'Вечер', 'Новички', 'Любители', 'Профи'];

export function MainScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <View style={styles.topBar}>
        <Text style={styles.logo}>oino</Text>
        <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <SegmentedControl
        options={['Поля', 'Матчи']}
        selected={selectedTab}
        onChange={setSelectedTab}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <View style={styles.calendarWrapper}>
          <CalendarStrip
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            bookedDates={BOOKED_DATES}
          />
        </View>

        {selectedTab === 0 ? (
          <View>
            <FilterChips options={FIELD_FILTERS} />
            {FIELDS.map((field) => (
              <FieldCard key={field.id} field={field} onPress={() => {}} />
            ))}
            <View style={styles.bottomPadding} />
          </View>
        ) : (
          <View>
            <FilterChips options={MATCH_FILTERS} />
            {MATCHES.map((match) => (
              <MatchCard key={match.id} match={match} onPress={() => {}} />
            ))}
            <View style={styles.bottomPadding} />
          </View>
        )}
      </ScrollView>

      {selectedTab === 1 && (
        <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
          <Text style={styles.fabIcon}>＋</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  bellButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  bellIcon: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  calendarWrapper: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  bottomPadding: {
    height: spacing.xl + spacing.lg,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 26,
    color: colors.textPrimary,
    lineHeight: 30,
  },
});
