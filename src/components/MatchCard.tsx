import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '../theme';

export interface Match {
  id: string;
  organizerName: string;
  organizerInitials: string;
  organizerColor: string;
  fieldName: string;
  address: string;
  time: string;
  duration: string;
  playersJoined: number;
  playersTotal: number;
  pricePerPlayer: number;
}

interface Props {
  match: Match;
  onPress: () => void;
}

export function MatchCard({ match, onPress }: Props) {
  const progress = match.playersJoined / match.playersTotal;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: match.organizerColor }]}>
          <Text style={styles.avatarText}>{match.organizerInitials}</Text>
        </View>
        <View style={styles.organizerInfo}>
          <Text style={styles.organizerName}>{match.organizerName}</Text>
          <Text style={styles.organiserLabel}>Организатор</Text>
        </View>
        <Text style={styles.price}>{match.pricePerPlayer.toLocaleString('ru-RU')} ₸</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <Text style={styles.fieldName}>{match.fieldName}</Text>
        <Text style={styles.address} numberOfLines={1}>{match.address}</Text>
        <Text style={styles.timeText}>{match.time} · {match.duration}</Text>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Собрано игроков</Text>
          <Text style={styles.progressCount}>
            <Text style={styles.progressCurrent}>{match.playersJoined}</Text>
            /{match.playersTotal}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
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
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  organiserLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: spacing.sm,
  },
  details: {
    marginBottom: spacing.sm,
  },
  fieldName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressSection: {},
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressCurrent: {
    color: colors.primary,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.cardBorder,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
});
