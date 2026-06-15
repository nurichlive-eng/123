import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme';

interface Props {
  options: string[];
  selected: number;
  onChange: (index: number) => void;
}

export function SegmentedControl({ options, selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={[styles.option, selected === index && styles.optionActive]}
          onPress={() => onChange(index)}
          activeOpacity={0.8}
        >
          <Text style={[styles.label, selected === index && styles.labelActive]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.segmentBg,
    borderRadius: radius.full,
    padding: 3,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.full,
  },
  optionActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.textPrimary,
  },
});
