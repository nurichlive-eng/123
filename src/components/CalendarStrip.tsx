import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme';

const DAY_ABBREVS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

function getWeekDates(referenceDate: Date): Date[] {
  const dates: Date[] = [];
  const monday = new Date(referenceDate);
  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);
  for (let i = 0; i < 14; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }
  return dates;
}

interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  bookedDates?: Date[];
}

export function CalendarStrip({ selectedDate, onSelectDate, bookedDates = [] }: Props) {
  const today = new Date();
  const dates = getWeekDates(today);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const isBooked = (date: Date) => bookedDates.some((d) => isSameDay(d, date));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {dates.map((date, i) => {
        const isToday = isSameDay(date, today);
        const isSelected = isSameDay(date, selectedDate);
        const hasBooking = isBooked(date);

        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.dayCell,
              isSelected && styles.dayCellSelected,
              isToday && !isSelected && styles.dayCellToday,
            ]}
            onPress={() => onSelectDate(date)}
            activeOpacity={0.7}
          >
            <Text style={[styles.dayAbbrev, isSelected && styles.textSelected]}>
              {DAY_ABBREVS[date.getDay()]}
            </Text>
            <View style={[styles.dateCircle, isToday && styles.dateCircleToday]}>
              <Text style={[styles.dateNumber, isSelected && styles.textSelected, isToday && styles.textToday]}>
                {date.getDate()}
              </Text>
            </View>
            {hasBooking && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  dayCell: {
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    minWidth: 44,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayCellSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryMuted,
  },
  dayCellToday: {
    borderColor: colors.cardBorder,
  },
  dayAbbrev: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  dateCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCircleToday: {
    backgroundColor: colors.primary,
  },
  dateNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  textSelected: {
    color: colors.primary,
  },
  textToday: {
    color: colors.textPrimary,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 3,
  },
});
