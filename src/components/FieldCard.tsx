import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, spacing } from '../theme';

export interface Field {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  rating: number;
  pricePerHour: number;
  gradientColors: [string, string];
}

interface Props {
  field: Field;
  onPress: () => void;
}

export function FieldCard({ field, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <LinearGradient
        colors={field.gradientColors}
        style={styles.photo}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>★ {field.rating.toFixed(1)}</Text>
        </View>
      </LinearGradient>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{field.name}</Text>
          <Text style={styles.price}>от {field.pricePerHour.toLocaleString('ru-RU')} ₸/ч</Text>
        </View>
        <Text style={styles.address} numberOfLines={1}>
          {field.address} · {field.distanceKm} км
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  photo: {
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: spacing.sm,
  },
  ratingBadge: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '700',
  },
  info: {
    padding: spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
  },
  address: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
