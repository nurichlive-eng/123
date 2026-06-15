import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface Props {
  options: string[];
}

export function FilterChips({ options }: Props) {
  const [active, setActive] = useState<string[]>([]);

  const toggle = (opt: string) => {
    setActive((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((opt) => {
        const isActive = active.includes(opt);
        return (
          <TouchableOpacity
            key={opt}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => toggle(opt)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>{opt}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.full,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  chipActive: {
    backgroundColor: colors.primaryMuted,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  chipLabelActive: {
    color: colors.primary,
  },
});
